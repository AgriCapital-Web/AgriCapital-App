import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import logoGreen from "@/assets/logo-green.png";
import { 
  Search, 
  User, 
  MapPin, 
  Phone, 
  Calendar, 
  Sprout, 
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2
} from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const ClientPortal = () => {
  const { toast } = useToast();
  const [telephone, setTelephone] = useState("");
  const [loading, setLoading] = useState(false);
  const [souscripteur, setSouscripteur] = useState<any>(null);
  const [plantations, setPlantations] = useState<any[]>([]);
  const [paiements, setPaiements] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    if (!telephone || telephone.length < 10) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Veuillez saisir un numéro de téléphone valide (10 chiffres)"
      });
      return;
    }

    setLoading(true);
    try {
      // Rechercher le souscripteur
      const { data: sousData, error: sousError } = await (supabase as any)
        .from("souscripteurs")
        .select(`
          *,
          regions (nom),
          departements (nom),
          districts (nom),
          technico_commercial:profiles!souscripteurs_technico_commercial_id_fkey (nom_complet, telephone)
        `)
        .eq("telephone", telephone)
        .maybeSingle();

      if (sousError) throw sousError;

      if (!sousData) {
        toast({
          variant: "destructive",
          title: "Non trouvé",
          description: "Aucun compte trouvé avec ce numéro de téléphone"
        });
        setShowResults(false);
        setSouscripteur(null);
        return;
      }

      setSouscripteur(sousData);

      // Récupérer les plantations
      const { data: plantData } = await (supabase as any)
        .from("plantations")
        .select(`
          *,
          regions (nom),
          departements (nom)
        `)
        .eq("souscripteur_id", sousData.id)
        .order("created_at", { ascending: false });

      setPlantations(plantData || []);

      // Récupérer les paiements
      if (plantData && plantData.length > 0) {
        const plantationIds = plantData.map((p: any) => p.id);
        const { data: paiementsData } = await (supabase as any)
          .from("paiements")
          .select("*")
          .in("plantation_id", plantationIds)
          .order("created_at", { ascending: false })
          .limit(20);

        setPaiements(paiementsData || []);
      }

      setShowResults(true);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Erreur",
        description: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const formatMontant = (m: number) => {
    return new Intl.NumberFormat("fr-FR").format(m) + " F";
  };

  const getStatutBadge = (statut: string) => {
    const config: any = {
      'en_attente_da': { color: 'bg-yellow-500', label: 'En attente DA' },
      'da_valide': { color: 'bg-blue-500', label: 'DA Validé' },
      'en_cours': { color: 'bg-purple-500', label: 'En cours' },
      'en_production': { color: 'bg-green-500', label: 'En production' },
      'actif': { color: 'bg-green-500', label: 'Actif' },
      'inactif': { color: 'bg-gray-500', label: 'Inactif' },
      'valide': { color: 'bg-green-500', label: 'Validé' },
      'en_attente': { color: 'bg-yellow-500', label: 'En attente' },
      'rejete': { color: 'bg-red-500', label: 'Rejeté' }
    };
    const cfg = config[statut] || { color: 'bg-gray-500', label: statut };
    return <Badge className={cfg.color}>{cfg.label}</Badge>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 shadow-lg">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src={logoGreen} alt="AgriCapital" className="h-10 sm:h-12 bg-white rounded-lg p-1" />
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Espace Client</h1>
              <p className="text-xs sm:text-sm opacity-90">AgriCapital</p>
            </div>
          </div>
          <a href="tel:+2250759566087" className="text-xs sm:text-sm flex items-center gap-1">
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Support</span>
          </a>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Search Card */}
        <Card className="max-w-lg mx-auto">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-xl sm:text-2xl">Consulter votre compte</CardTitle>
            <CardDescription>
              Saisissez votre numéro de téléphone pour accéder à vos informations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="tel"
                  placeholder="Ex: 0759566087"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="pl-10 text-lg"
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch} disabled={loading} className="px-6">
                {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        {showResults && souscripteur && (
          <div className="space-y-6 animate-fade-in">
            {/* Welcome Message */}
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full bg-white/20 flex items-center justify-center">
                    <User className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Bienvenue,</p>
                    <h2 className="text-xl sm:text-2xl font-bold">{souscripteur.nom_complet}</h2>
                    <p className="text-sm opacity-90">ID: {souscripteur.id_unique}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Info Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-xs text-muted-foreground">Localisation</span>
                  </div>
                  <p className="text-sm font-medium truncate">
                    {souscripteur.regions?.nom || souscripteur.departements?.nom || 'N/A'}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sprout className="h-4 w-4 text-green-600" />
                    <span className="text-xs text-muted-foreground">Plantations</span>
                  </div>
                  <p className="text-lg sm:text-xl font-bold">{plantations.length}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4 text-blue-600" />
                    <span className="text-xs text-muted-foreground">DA Versé</span>
                  </div>
                  <p className="text-sm sm:text-lg font-bold">{formatMontant(souscripteur.total_da_verse || 0)}</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="h-4 w-4 text-orange-600" />
                    <span className="text-xs text-muted-foreground">Membre depuis</span>
                  </div>
                  <p className="text-sm font-medium">
                    {souscripteur.created_at 
                      ? format(new Date(souscripteur.created_at), "MMM yyyy", { locale: fr })
                      : 'N/A'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Technico-Commercial */}
            {souscripteur.technico_commercial && (
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Votre Technico-Commercial</p>
                      <p className="font-medium">{souscripteur.technico_commercial.nom_complet}</p>
                      {souscripteur.technico_commercial.telephone && (
                        <a href={`tel:${souscripteur.technico_commercial.telephone}`} className="text-sm text-primary hover:underline">
                          {souscripteur.technico_commercial.telephone}
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Plantations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Sprout className="h-5 w-5 text-green-600" />
                  Mes Plantations
                </CardTitle>
              </CardHeader>
              <CardContent>
                {plantations.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4">Aucune plantation enregistrée</p>
                ) : (
                  <div className="space-y-3">
                    {plantations.map((plantation) => (
                      <div key={plantation.id} className="border rounded-lg p-3 sm:p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <p className="font-medium">{plantation.nom_plantation || plantation.id_unique}</p>
                            <p className="text-xs text-muted-foreground">{plantation.id_unique}</p>
                          </div>
                          {getStatutBadge(plantation.statut_global)}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Superficie:</span>
                            <span className="ml-1 font-medium">{plantation.superficie_ha} ha</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Région:</span>
                            <span className="ml-1">{plantation.regions?.nom || 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Paiements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Historique des Paiements
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0 sm:p-6">
                {paiements.length === 0 ? (
                  <p className="text-center text-muted-foreground py-4 px-4">Aucun paiement enregistré</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Type</TableHead>
                          <TableHead className="text-right">Montant</TableHead>
                          <TableHead>Statut</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {paiements.map((paiement) => (
                          <TableRow key={paiement.id}>
                            <TableCell className="text-xs sm:text-sm">
                              {format(new Date(paiement.created_at), "dd/MM/yy", { locale: fr })}
                            </TableCell>
                            <TableCell className="text-xs sm:text-sm">{paiement.type_paiement}</TableCell>
                            <TableCell className="text-right font-medium text-xs sm:text-sm">
                              {formatMontant(paiement.montant_paye || paiement.montant_theorique)}
                            </TableCell>
                            <TableCell>{getStatutBadge(paiement.statut)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-accent/50">
              <CardContent className="p-4 text-center">
                <p className="text-sm text-muted-foreground mb-2">Besoin d'aide ?</p>
                <a 
                  href="tel:+2250759566087" 
                  className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                >
                  <Phone className="h-4 w-4" />
                  +225 07 59 56 60 87
                </a>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-background py-4 mt-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs text-muted-foreground">
            © 2025 AgriCapital - Tous droits réservés
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ClientPortal;
