import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import logoGreen from "@/assets/logo-green.png";

const ROLES = [
  { value: "technico_commercial", label: "Technico-commercial" },
  { value: "chef_equipe", label: "Chef d'équipe" },
  { value: "responsable_zone", label: "Responsable de zone" },
  { value: "responsable_operations", label: "Responsable des opérations" },
  { value: "responsable_service_client", label: "Responsable service client" },
  { value: "agent_service_client", label: "Agent service client" },
  { value: "responsable_financier", label: "Responsable financier" },
  { value: "comptable", label: "Comptable" }
];

const AccountRequest = () => {
  const [formData, setFormData] = useState({
    nom_complet: "",
    email: "",
    telephone: "",
    poste_souhaite: "",
    role_souhaite: "",
    departement: "",
    justification: ""
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoUrl = null;
      let cvUrl = null;

      // Upload photo if provided
      if (photoFile) {
        const photoPath = `account-requests/${Date.now()}-${photoFile.name}`;
        const { error: photoError } = await supabase.storage
          .from('documents')
          .upload(photoPath, photoFile);

        if (photoError) throw photoError;

        const { data: photoData } = supabase.storage
          .from('documents')
          .getPublicUrl(photoPath);
        photoUrl = photoData.publicUrl;
      }

      // Upload CV if provided
      if (cvFile) {
        const cvPath = `account-requests/${Date.now()}-${cvFile.name}`;
        const { error: cvError } = await supabase.storage
          .from('documents')
          .upload(cvPath, cvFile);

        if (cvError) throw cvError;

        const { data: cvData } = supabase.storage
          .from('documents')
          .getPublicUrl(cvPath);
        cvUrl = cvData.publicUrl;
      }

      // Create account request
      const { error } = await (supabase as any)
        .from('account_requests')
        .insert({
          ...formData,
          photo_url: photoUrl,
          cv_url: cvUrl
        });

      if (error) throw error;

      // Send notification to admin
      await supabase.functions.invoke('send-account-request-notification', {
        body: { requestData: formData }
      });

      toast({
        title: "Demande envoyée",
        description: "Votre demande de création de compte a été envoyée avec succès. Vous recevrez une réponse par email.",
      });

      navigate('/login');
    } catch (error: any) {
      console.error('Error submitting request:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message || "Impossible d'envoyer la demande",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary-hover p-4">
      <Card className="w-full max-w-2xl shadow-strong">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <img src={logoGreen} alt="AgriCapital Logo" className="h-24 w-auto" />
          </div>
          <CardTitle className="text-2xl">Demande de Création de Compte</CardTitle>
          <CardDescription>
            Remplissez ce formulaire pour demander un accès à la plateforme AgriCapital
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom_complet">Nom complet *</Label>
                <Input
                  id="nom_complet"
                  required
                  value={formData.nom_complet}
                  onChange={(e) => setFormData({...formData, nom_complet: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telephone">Téléphone *</Label>
                <Input
                  id="telephone"
                  type="tel"
                  required
                  value={formData.telephone}
                  onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="poste_souhaite">Poste souhaité *</Label>
                <Input
                  id="poste_souhaite"
                  required
                  value={formData.poste_souhaite}
                  onChange={(e) => setFormData({...formData, poste_souhaite: e.target.value})}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role_souhaite">Rôle souhaité *</Label>
                <Select
                  value={formData.role_souhaite}
                  onValueChange={(value) => setFormData({...formData, role_souhaite: value})}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionner un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    {ROLES.map(role => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="departement">Département</Label>
                <Input
                  id="departement"
                  value={formData.departement}
                  onChange={(e) => setFormData({...formData, departement: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justification">Justification de la demande *</Label>
              <Textarea
                id="justification"
                required
                rows={4}
                value={formData.justification}
                onChange={(e) => setFormData({...formData, justification: e.target.value})}
                placeholder="Expliquez pourquoi vous souhaitez accéder à la plateforme..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Photo de profil *</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                required
                onChange={handlePhotoChange}
              />
              {photoPreview && (
                <div className="mt-2">
                  <img
                    src={photoPreview}
                    alt="Aperçu"
                    className="w-32 h-32 object-cover rounded-full border-4 border-primary"
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="cv">CV (optionnel)</Label>
              <Input
                id="cv"
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={(e) => setCvFile(e.target.files?.[0] || null)}
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate('/login')}
                className="flex-1"
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? "Envoi..." : "Envoyer la demande"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccountRequest;
