
-- =============================================
-- SCHÉMA COMPLET CRM AGRICAPITAL
-- =============================================

-- 1. TABLES GÉOGRAPHIQUES (ajout sous-préfectures et villages)
CREATE TABLE IF NOT EXISTS public.sous_prefectures (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  code TEXT,
  departement_id UUID REFERENCES public.departements(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.villages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  sous_prefecture_id UUID REFERENCES public.sous_prefectures(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 2. DEPARTEMENTS ENTREPRISE
CREATE TABLE IF NOT EXISTS public.departements_entreprise (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.departements_entreprise (nom) VALUES 
  ('Direction Générale'),
  ('Direction Commerciale'),
  ('Direction Technique'),
  ('Direction Financière'),
  ('Ressources Humaines'),
  ('Service Client'),
  ('Opérations Terrain')
ON CONFLICT DO NOTHING;

-- 3. PROMOTIONS
CREATE TABLE IF NOT EXISTS public.promotions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nom_promotion TEXT NOT NULL,
  description TEXT,
  montant_normal_ha NUMERIC DEFAULT 30000,
  montant_reduit_ha NUMERIC NOT NULL,
  reduction_pct NUMERIC GENERATED ALWAYS AS (CASE WHEN montant_normal_ha > 0 THEN ROUND(((montant_normal_ha - montant_reduit_ha) / montant_normal_ha * 100)::numeric, 2) ELSE 0 END) STORED,
  date_debut DATE NOT NULL,
  date_fin DATE NOT NULL,
  est_active BOOLEAN DEFAULT true,
  conditions TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 4. SOUSCRIPTEURS (PLANTEURS)
CREATE TYPE public.civilite_type AS ENUM ('m', 'mme', 'mlle');
CREATE TYPE public.type_piece_type AS ENUM ('cni', 'passeport', 'attestation', 'autre');
CREATE TYPE public.statut_marital_type AS ENUM ('celibataire', 'marie', 'divorce', 'veuf');
CREATE TYPE public.statut_souscripteur AS ENUM ('actif', 'inactif', 'suspendu', 'radie');

CREATE TABLE IF NOT EXISTS public.souscripteurs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_unique TEXT UNIQUE NOT NULL,
  civilite public.civilite_type DEFAULT 'm',
  nom_complet TEXT NOT NULL,
  prenoms TEXT,
  date_naissance DATE,
  lieu_naissance TEXT,
  type_piece public.type_piece_type DEFAULT 'cni',
  numero_piece TEXT,
  date_delivrance_piece DATE,
  fichier_piece_url TEXT,
  photo_profil_url TEXT,
  statut_marital public.statut_marital_type DEFAULT 'celibataire',
  conjoint_nom_prenoms TEXT,
  conjoint_type_piece public.type_piece_type,
  conjoint_numero_piece TEXT,
  conjoint_date_delivrance DATE,
  conjoint_telephone TEXT,
  conjoint_whatsapp TEXT,
  conjoint_photo_identite_url TEXT,
  conjoint_photo_url TEXT,
  domicile_residence TEXT,
  telephone TEXT NOT NULL,
  whatsapp TEXT,
  email TEXT,
  type_compte TEXT,
  numero_compte TEXT,
  nom_beneficiaire TEXT,
  banque_operateur TEXT,
  region_id UUID REFERENCES public.regions(id),
  departement_id UUID REFERENCES public.departements(id),
  district_id UUID REFERENCES public.districts(id),
  sous_prefecture_id UUID REFERENCES public.sous_prefectures(id),
  village_id UUID REFERENCES public.villages(id),
  nombre_plantations INT DEFAULT 0,
  total_hectares NUMERIC DEFAULT 0,
  total_da_verse NUMERIC DEFAULT 0,
  total_contributions_versees NUMERIC DEFAULT 0,
  statut_global public.statut_souscripteur DEFAULT 'inactif',
  created_by UUID REFERENCES public.profiles(id),
  technico_commercial_id UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. PLANTATIONS
CREATE TYPE public.statut_plantation AS ENUM ('en_attente_da', 'da_valide', 'en_cours', 'en_production', 'suspendu', 'archive');

CREATE TABLE IF NOT EXISTS public.plantations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  id_unique TEXT UNIQUE NOT NULL,
  souscripteur_id UUID NOT NULL REFERENCES public.souscripteurs(id) ON DELETE CASCADE,
  nom_plantation TEXT,
  superficie_ha NUMERIC NOT NULL DEFAULT 1,
  superficie_activee NUMERIC DEFAULT 0,
  latitude NUMERIC,
  longitude NUMERIC,
  region_id UUID REFERENCES public.regions(id),
  departement_id UUID REFERENCES public.departements(id),
  district_id UUID REFERENCES public.districts(id),
  sous_prefecture_id UUID REFERENCES public.sous_prefectures(id),
  village_id UUID REFERENCES public.villages(id),
  localisation_detail TEXT,
  type_culture TEXT DEFAULT 'Hévéa',
  date_signature_contrat DATE,
  fichier_contrat_url TEXT,
  numero_certificat_foncier TEXT,
  fichier_certificat_url TEXT,
  statut_global public.statut_plantation DEFAULT 'en_attente_da',
  date_activation DATE,
  date_mise_production DATE,
  alerte_non_paiement BOOLEAN DEFAULT false,
  alerte_visite_retard BOOLEAN DEFAULT false,
  montant_da_paye NUMERIC DEFAULT 0,
  montant_contributions NUMERIC DEFAULT 0,
  dernier_paiement_date TIMESTAMPTZ,
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 6. PAIEMENTS
CREATE TYPE public.statut_paiement AS ENUM ('en_attente', 'valide', 'rejete', 'annule');

CREATE TABLE IF NOT EXISTS public.paiements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plantation_id UUID REFERENCES public.plantations(id) ON DELETE CASCADE,
  souscripteur_id UUID REFERENCES public.souscripteurs(id),
  type_paiement TEXT NOT NULL,
  montant_theorique NUMERIC NOT NULL DEFAULT 0,
  montant_paye NUMERIC DEFAULT 0,
  nombre_mois NUMERIC,
  date_paiement TIMESTAMPTZ,
  date_upload_preuve TIMESTAMPTZ,
  mode_paiement TEXT DEFAULT 'especes',
  id_transaction TEXT,
  fichier_preuve_url TEXT,
  type_preuve TEXT,
  statut public.statut_paiement DEFAULT 'en_attente',
  motif_rejet TEXT,
  valide_par UUID REFERENCES public.profiles(id),
  date_validation TIMESTAMPTZ,
  annee INT,
  trimestre INT,
  promotion_id UUID REFERENCES public.promotions(id),
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. PAIEMENTS WAVE
CREATE TABLE IF NOT EXISTS public.paiements_wave (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  transaction_wave_id TEXT UNIQUE NOT NULL,
  telephone TEXT NOT NULL,
  souscripteur_id UUID REFERENCES public.souscripteurs(id),
  montant_paye NUMERIC NOT NULL,
  type_paiement TEXT DEFAULT 'droit_acces',
  date_paiement TIMESTAMPTZ DEFAULT now(),
  statut TEXT DEFAULT 'valide',
  donnees_wave JSONB,
  reconcilie BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. INTERVENTIONS TECHNIQUES
CREATE TABLE IF NOT EXISTS public.interventions_techniques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plantation_id UUID REFERENCES public.plantations(id) ON DELETE CASCADE,
  technicien_id UUID REFERENCES public.profiles(id),
  type_intervention TEXT NOT NULL,
  date_intervention DATE NOT NULL,
  observations TEXT,
  recommandations TEXT,
  photos_urls TEXT[],
  latitude NUMERIC,
  longitude NUMERIC,
  duree_minutes INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 9. PHOTOS PLANTATION
CREATE TABLE IF NOT EXISTS public.photos_plantation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plantation_id UUID REFERENCES public.plantations(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  description TEXT,
  type_photo TEXT DEFAULT 'general',
  date_prise TIMESTAMPTZ DEFAULT now(),
  latitude NUMERIC,
  longitude NUMERIC,
  uploaded_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 10. BROUILLONS SOUSCRIPTION
CREATE TABLE IF NOT EXISTS public.souscriptions_brouillon (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  etape_actuelle INT DEFAULT 1,
  donnees JSONB DEFAULT '{}',
  created_by UUID REFERENCES public.profiles(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. TICKETS SUPPORT
CREATE TABLE IF NOT EXISTS public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  numero TEXT UNIQUE,
  titre TEXT NOT NULL,
  description TEXT,
  type_ticket TEXT DEFAULT 'technique',
  priorite TEXT DEFAULT 'normale',
  statut TEXT DEFAULT 'ouvert',
  plantation_id UUID REFERENCES public.plantations(id),
  souscripteur_id UUID REFERENCES public.souscripteurs(id),
  assigne_a UUID REFERENCES public.profiles(id),
  cree_par UUID REFERENCES public.profiles(id),
  date_resolution TIMESTAMPTZ,
  solution TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 12. COMMISSIONS
CREATE TABLE IF NOT EXISTS public.commissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id),
  plantation_id UUID REFERENCES public.plantations(id),
  souscripteur_id UUID REFERENCES public.souscripteurs(id),
  type_commission TEXT NOT NULL,
  montant NUMERIC NOT NULL DEFAULT 0,
  taux_applique NUMERIC,
  superficie_ha NUMERIC,
  statut TEXT DEFAULT 'en_attente',
  date_validation TIMESTAMPTZ,
  valide_par UUID REFERENCES public.profiles(id),
  mois INT,
  annee INT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 13. STATUTS CONFIGURABLES
CREATE TABLE IF NOT EXISTS public.statuts_configurables (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  entite TEXT NOT NULL,
  code TEXT NOT NULL,
  libelle TEXT NOT NULL,
  couleur TEXT DEFAULT '#666666',
  ordre INT DEFAULT 0,
  est_actif BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(entite, code)
);

INSERT INTO public.statuts_configurables (entite, code, libelle, couleur, ordre) VALUES
  ('souscripteur', 'actif', 'Actif', '#22c55e', 1),
  ('souscripteur', 'inactif', 'Inactif', '#6b7280', 2),
  ('souscripteur', 'suspendu', 'Suspendu', '#f97316', 3),
  ('souscripteur', 'radie', 'Radié', '#ef4444', 4),
  ('plantation', 'en_attente_da', 'En attente DA', '#eab308', 1),
  ('plantation', 'da_valide', 'DA Validé', '#3b82f6', 2),
  ('plantation', 'en_cours', 'En cours', '#8b5cf6', 3),
  ('plantation', 'en_production', 'En production', '#22c55e', 4),
  ('paiement', 'en_attente', 'En attente', '#eab308', 1),
  ('paiement', 'valide', 'Validé', '#22c55e', 2),
  ('paiement', 'rejete', 'Rejeté', '#ef4444', 3)
ON CONFLICT DO NOTHING;

-- 14. CONFIGURATIONS SYSTEME
CREATE TABLE IF NOT EXISTS public.configurations_systeme (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cle TEXT UNIQUE NOT NULL,
  valeur TEXT,
  description TEXT,
  type_valeur TEXT DEFAULT 'text',
  categorie TEXT DEFAULT 'general',
  modifiable BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

INSERT INTO public.configurations_systeme (cle, valeur, description, categorie) VALUES
  ('montant_da_par_hectare', '30000', 'Montant du Droit d''Accès par hectare (FCFA)', 'paiements'),
  ('taux_contribution_journalier', '65', 'Taux journalier de contribution (FCFA)', 'paiements'),
  ('taux_contribution_mensuel', '1900', 'Taux mensuel de contribution (FCFA)', 'paiements'),
  ('taux_contribution_trimestriel', '5500', 'Taux trimestriel de contribution (FCFA)', 'paiements'),
  ('taux_contribution_annuel', '20000', 'Taux annuel de contribution (FCFA)', 'paiements'),
  ('delai_alerte_non_paiement', '30', 'Jours avant alerte non-paiement', 'alertes'),
  ('email_admin', 'admin@agricapital.ci', 'Email administrateur', 'notifications'),
  ('whatsapp_admin', '+2250759566087', 'WhatsApp administrateur', 'notifications'),
  ('nom_entreprise', 'AgriCapital', 'Nom de l''entreprise', 'general')
ON CONFLICT DO NOTHING;

-- FONCTION DE GÉNÉRATION ID SOUSCRIPTEUR
CREATE OR REPLACE FUNCTION public.generate_souscripteur_id()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  year_suffix TEXT;
  seq_num INT;
BEGIN
  year_suffix := to_char(now(), 'YY');
  SELECT COALESCE(MAX(CAST(SUBSTRING(id_unique FROM 4 FOR 6) AS INT)), 0) + 1
  INTO seq_num
  FROM souscripteurs
  WHERE id_unique LIKE 'AC' || year_suffix || '%';
  new_id := 'AC' || year_suffix || LPAD(seq_num::TEXT, 6, '0');
  RETURN new_id;
END;
$$;

-- FONCTION DE GÉNÉRATION ID PLANTATION
CREATE OR REPLACE FUNCTION public.generate_plantation_id()
RETURNS TEXT
LANGUAGE plpgsql
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  year_suffix TEXT;
  seq_num INT;
BEGIN
  year_suffix := to_char(now(), 'YY');
  SELECT COALESCE(MAX(CAST(SUBSTRING(id_unique FROM 4 FOR 6) AS INT)), 0) + 1
  INTO seq_num
  FROM plantations
  WHERE id_unique LIKE 'PL' || year_suffix || '%';
  new_id := 'PL' || year_suffix || LPAD(seq_num::TEXT, 6, '0');
  RETURN new_id;
END;
$$;

-- RLS POLICIES
ALTER TABLE public.sous_prefectures ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.villages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.departements_entreprise ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.souscripteurs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.plantations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.paiements_wave ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interventions_techniques ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos_plantation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.souscriptions_brouillon ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statuts_configurables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.configurations_systeme ENABLE ROW LEVEL SECURITY;

-- Policies pour lecture (tous les utilisateurs authentifiés)
CREATE POLICY "Authenticated can read sous_prefectures" ON public.sous_prefectures FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read villages" ON public.villages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read departements_entreprise" ON public.departements_entreprise FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read promotions" ON public.promotions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read souscripteurs" ON public.souscripteurs FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read plantations" ON public.plantations FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read paiements" ON public.paiements FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read paiements_wave" ON public.paiements_wave FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read interventions" ON public.interventions_techniques FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read photos" ON public.photos_plantation FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read tickets" ON public.tickets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read commissions" ON public.commissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read statuts" ON public.statuts_configurables FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated can read configs" ON public.configurations_systeme FOR SELECT TO authenticated USING (true);

-- Policies pour écriture (utilisateurs authentifiés)
CREATE POLICY "Authenticated can insert souscripteurs" ON public.souscripteurs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update souscripteurs" ON public.souscripteurs FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can insert plantations" ON public.plantations FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update plantations" ON public.plantations FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can insert paiements" ON public.paiements FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update paiements" ON public.paiements FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Authenticated can insert interventions" ON public.interventions_techniques FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can insert photos" ON public.photos_plantation FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can insert tickets" ON public.tickets FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Authenticated can update tickets" ON public.tickets FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Service can insert paiements_wave" ON public.paiements_wave FOR INSERT WITH CHECK (true);
CREATE POLICY "Service can update paiements_wave" ON public.paiements_wave FOR UPDATE USING (true);

-- Policies brouillons (propre à l'utilisateur)
CREATE POLICY "Users can manage own brouillons" ON public.souscriptions_brouillon FOR ALL TO authenticated USING (auth.uid() = created_by) WITH CHECK (auth.uid() = created_by);

-- Policies admin
CREATE POLICY "Admins can manage promotions" ON public.promotions FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage sous_prefectures" ON public.sous_prefectures FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage villages" ON public.villages FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage configs" ON public.configurations_systeme FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage statuts" ON public.statuts_configurables FOR ALL USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete souscripteurs" ON public.souscripteurs FOR DELETE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can delete plantations" ON public.plantations FOR DELETE USING (is_admin(auth.uid()));
CREATE POLICY "Admins can manage commissions" ON public.commissions FOR ALL USING (is_admin(auth.uid()));

-- DONNÉES INITIALES DÉPARTEMENTS ET RÉGIONS
INSERT INTO public.sous_prefectures (nom, departement_id) 
SELECT 'Sous-préfecture ' || d.nom, d.id 
FROM public.departements d
ON CONFLICT DO NOTHING;

-- Realtime pour les tables principales
ALTER PUBLICATION supabase_realtime ADD TABLE public.souscripteurs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.plantations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.paiements;
ALTER PUBLICATION supabase_realtime ADD TABLE public.paiements_wave;
ALTER PUBLICATION supabase_realtime ADD TABLE public.promotions;
ALTER PUBLICATION supabase_realtime ADD TABLE public.tickets;
