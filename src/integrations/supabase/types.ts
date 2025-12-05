export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      account_requests: {
        Row: {
          created_at: string | null
          cv_url: string | null
          departement: string | null
          district: string | null
          email: string
          id: string
          message: string | null
          motif_rejet: string | null
          nom_complet: string
          photo_url: string | null
          poste: string | null
          region: string | null
          status: string | null
          telephone: string
          traite_par: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          cv_url?: string | null
          departement?: string | null
          district?: string | null
          email: string
          id?: string
          message?: string | null
          motif_rejet?: string | null
          nom_complet: string
          photo_url?: string | null
          poste?: string | null
          region?: string | null
          status?: string | null
          telephone: string
          traite_par?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          cv_url?: string | null
          departement?: string | null
          district?: string | null
          email?: string
          id?: string
          message?: string | null
          motif_rejet?: string | null
          nom_complet?: string
          photo_url?: string | null
          poste?: string | null
          region?: string | null
          status?: string | null
          telephone?: string
          traite_par?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          action: string
          created_at: string | null
          details: Json | null
          entity_id: string | null
          entity_type: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string | null
          details?: Json | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: []
      }
      commissions: {
        Row: {
          annee: number | null
          created_at: string | null
          date_validation: string | null
          id: string
          mois: number | null
          montant: number
          plantation_id: string | null
          souscripteur_id: string | null
          statut: string | null
          superficie_ha: number | null
          taux_applique: number | null
          type_commission: string
          user_id: string
          valide_par: string | null
        }
        Insert: {
          annee?: number | null
          created_at?: string | null
          date_validation?: string | null
          id?: string
          mois?: number | null
          montant?: number
          plantation_id?: string | null
          souscripteur_id?: string | null
          statut?: string | null
          superficie_ha?: number | null
          taux_applique?: number | null
          type_commission: string
          user_id: string
          valide_par?: string | null
        }
        Update: {
          annee?: number | null
          created_at?: string | null
          date_validation?: string | null
          id?: string
          mois?: number | null
          montant?: number
          plantation_id?: string | null
          souscripteur_id?: string | null
          statut?: string | null
          superficie_ha?: number | null
          taux_applique?: number | null
          type_commission?: string
          user_id?: string
          valide_par?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "commissions_plantation_id_fkey"
            columns: ["plantation_id"]
            isOneToOne: false
            referencedRelation: "plantations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_souscripteur_id_fkey"
            columns: ["souscripteur_id"]
            isOneToOne: false
            referencedRelation: "souscripteurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "commissions_valide_par_fkey"
            columns: ["valide_par"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      configurations_systeme: {
        Row: {
          categorie: string | null
          cle: string
          description: string | null
          id: string
          modifiable: boolean | null
          type_valeur: string | null
          updated_at: string | null
          valeur: string | null
        }
        Insert: {
          categorie?: string | null
          cle: string
          description?: string | null
          id?: string
          modifiable?: boolean | null
          type_valeur?: string | null
          updated_at?: string | null
          valeur?: string | null
        }
        Update: {
          categorie?: string | null
          cle?: string
          description?: string | null
          id?: string
          modifiable?: boolean | null
          type_valeur?: string | null
          updated_at?: string | null
          valeur?: string | null
        }
        Relationships: []
      }
      departements: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          nom: string
          region_id: string | null
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          nom: string
          region_id?: string | null
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          nom?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departements_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      departements_entreprise: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          nom: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          nom: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      districts: {
        Row: {
          code: string | null
          created_at: string | null
          departement_id: string | null
          id: string
          nom: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          departement_id?: string | null
          id?: string
          nom: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          departement_id?: string | null
          id?: string
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "districts_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
        ]
      }
      equipe_membres: {
        Row: {
          date_ajout: string | null
          equipe_id: string | null
          id: string
          user_id: string | null
        }
        Insert: {
          date_ajout?: string | null
          equipe_id?: string | null
          id?: string
          user_id?: string | null
        }
        Update: {
          date_ajout?: string | null
          equipe_id?: string | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipe_membres_equipe_id_fkey"
            columns: ["equipe_id"]
            isOneToOne: false
            referencedRelation: "equipes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipe_membres_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      equipes: {
        Row: {
          chef_equipe_id: string | null
          created_at: string | null
          description: string | null
          est_actif: boolean | null
          id: string
          nom: string
          region_id: string | null
        }
        Insert: {
          chef_equipe_id?: string | null
          created_at?: string | null
          description?: string | null
          est_actif?: boolean | null
          id?: string
          nom: string
          region_id?: string | null
        }
        Update: {
          chef_equipe_id?: string | null
          created_at?: string | null
          description?: string | null
          est_actif?: boolean | null
          id?: string
          nom?: string
          region_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "equipes_chef_equipe_id_fkey"
            columns: ["chef_equipe_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "equipes_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      interventions_techniques: {
        Row: {
          created_at: string | null
          date_intervention: string
          duree_minutes: number | null
          id: string
          latitude: number | null
          longitude: number | null
          observations: string | null
          photos_urls: string[] | null
          plantation_id: string | null
          recommandations: string | null
          technicien_id: string | null
          type_intervention: string
        }
        Insert: {
          created_at?: string | null
          date_intervention: string
          duree_minutes?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          observations?: string | null
          photos_urls?: string[] | null
          plantation_id?: string | null
          recommandations?: string | null
          technicien_id?: string | null
          type_intervention: string
        }
        Update: {
          created_at?: string | null
          date_intervention?: string
          duree_minutes?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          observations?: string | null
          photos_urls?: string[] | null
          plantation_id?: string | null
          recommandations?: string | null
          technicien_id?: string | null
          type_intervention?: string
        }
        Relationships: [
          {
            foreignKeyName: "interventions_techniques_plantation_id_fkey"
            columns: ["plantation_id"]
            isOneToOne: false
            referencedRelation: "plantations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interventions_techniques_technicien_id_fkey"
            columns: ["technicien_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          lien: string | null
          lu: boolean | null
          message: string
          titre: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          lien?: string | null
          lu?: boolean | null
          message: string
          titre: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          lien?: string | null
          lu?: boolean | null
          message?: string
          titre?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      paiements: {
        Row: {
          annee: number | null
          created_at: string | null
          created_by: string | null
          date_paiement: string | null
          date_upload_preuve: string | null
          date_validation: string | null
          fichier_preuve_url: string | null
          id: string
          id_transaction: string | null
          mode_paiement: string | null
          montant_paye: number | null
          montant_theorique: number
          motif_rejet: string | null
          nombre_mois: number | null
          plantation_id: string | null
          promotion_id: string | null
          souscripteur_id: string | null
          statut: Database["public"]["Enums"]["statut_paiement"] | null
          trimestre: number | null
          type_paiement: string
          type_preuve: string | null
          valide_par: string | null
        }
        Insert: {
          annee?: number | null
          created_at?: string | null
          created_by?: string | null
          date_paiement?: string | null
          date_upload_preuve?: string | null
          date_validation?: string | null
          fichier_preuve_url?: string | null
          id?: string
          id_transaction?: string | null
          mode_paiement?: string | null
          montant_paye?: number | null
          montant_theorique?: number
          motif_rejet?: string | null
          nombre_mois?: number | null
          plantation_id?: string | null
          promotion_id?: string | null
          souscripteur_id?: string | null
          statut?: Database["public"]["Enums"]["statut_paiement"] | null
          trimestre?: number | null
          type_paiement: string
          type_preuve?: string | null
          valide_par?: string | null
        }
        Update: {
          annee?: number | null
          created_at?: string | null
          created_by?: string | null
          date_paiement?: string | null
          date_upload_preuve?: string | null
          date_validation?: string | null
          fichier_preuve_url?: string | null
          id?: string
          id_transaction?: string | null
          mode_paiement?: string | null
          montant_paye?: number | null
          montant_theorique?: number
          motif_rejet?: string | null
          nombre_mois?: number | null
          plantation_id?: string | null
          promotion_id?: string | null
          souscripteur_id?: string | null
          statut?: Database["public"]["Enums"]["statut_paiement"] | null
          trimestre?: number | null
          type_paiement?: string
          type_preuve?: string | null
          valide_par?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paiements_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paiements_plantation_id_fkey"
            columns: ["plantation_id"]
            isOneToOne: false
            referencedRelation: "plantations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paiements_promotion_id_fkey"
            columns: ["promotion_id"]
            isOneToOne: false
            referencedRelation: "promotions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paiements_souscripteur_id_fkey"
            columns: ["souscripteur_id"]
            isOneToOne: false
            referencedRelation: "souscripteurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "paiements_valide_par_fkey"
            columns: ["valide_par"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      paiements_wave: {
        Row: {
          created_at: string | null
          date_paiement: string | null
          donnees_wave: Json | null
          id: string
          montant_paye: number
          reconcilie: boolean | null
          souscripteur_id: string | null
          statut: string | null
          telephone: string
          transaction_wave_id: string
          type_paiement: string | null
        }
        Insert: {
          created_at?: string | null
          date_paiement?: string | null
          donnees_wave?: Json | null
          id?: string
          montant_paye: number
          reconcilie?: boolean | null
          souscripteur_id?: string | null
          statut?: string | null
          telephone: string
          transaction_wave_id: string
          type_paiement?: string | null
        }
        Update: {
          created_at?: string | null
          date_paiement?: string | null
          donnees_wave?: Json | null
          id?: string
          montant_paye?: number
          reconcilie?: boolean | null
          souscripteur_id?: string | null
          statut?: string | null
          telephone?: string
          transaction_wave_id?: string
          type_paiement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "paiements_wave_souscripteur_id_fkey"
            columns: ["souscripteur_id"]
            isOneToOne: false
            referencedRelation: "souscripteurs"
            referencedColumns: ["id"]
          },
        ]
      }
      photos_plantation: {
        Row: {
          created_at: string | null
          date_prise: string | null
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          plantation_id: string | null
          type_photo: string | null
          uploaded_by: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          date_prise?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          plantation_id?: string | null
          type_photo?: string | null
          uploaded_by?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          date_prise?: string | null
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          plantation_id?: string | null
          type_photo?: string | null
          uploaded_by?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "photos_plantation_plantation_id_fkey"
            columns: ["plantation_id"]
            isOneToOne: false
            referencedRelation: "plantations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "photos_plantation_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      plantations: {
        Row: {
          alerte_non_paiement: boolean | null
          alerte_visite_retard: boolean | null
          created_at: string | null
          created_by: string | null
          date_activation: string | null
          date_mise_production: string | null
          date_signature_contrat: string | null
          departement_id: string | null
          dernier_paiement_date: string | null
          district_id: string | null
          fichier_certificat_url: string | null
          fichier_contrat_url: string | null
          id: string
          id_unique: string
          latitude: number | null
          localisation_detail: string | null
          longitude: number | null
          montant_contributions: number | null
          montant_da_paye: number | null
          nom_plantation: string | null
          numero_certificat_foncier: string | null
          region_id: string | null
          sous_prefecture_id: string | null
          souscripteur_id: string
          statut_global: Database["public"]["Enums"]["statut_plantation"] | null
          superficie_activee: number | null
          superficie_ha: number
          type_culture: string | null
          updated_at: string | null
          village_id: string | null
        }
        Insert: {
          alerte_non_paiement?: boolean | null
          alerte_visite_retard?: boolean | null
          created_at?: string | null
          created_by?: string | null
          date_activation?: string | null
          date_mise_production?: string | null
          date_signature_contrat?: string | null
          departement_id?: string | null
          dernier_paiement_date?: string | null
          district_id?: string | null
          fichier_certificat_url?: string | null
          fichier_contrat_url?: string | null
          id?: string
          id_unique: string
          latitude?: number | null
          localisation_detail?: string | null
          longitude?: number | null
          montant_contributions?: number | null
          montant_da_paye?: number | null
          nom_plantation?: string | null
          numero_certificat_foncier?: string | null
          region_id?: string | null
          sous_prefecture_id?: string | null
          souscripteur_id: string
          statut_global?:
            | Database["public"]["Enums"]["statut_plantation"]
            | null
          superficie_activee?: number | null
          superficie_ha?: number
          type_culture?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Update: {
          alerte_non_paiement?: boolean | null
          alerte_visite_retard?: boolean | null
          created_at?: string | null
          created_by?: string | null
          date_activation?: string | null
          date_mise_production?: string | null
          date_signature_contrat?: string | null
          departement_id?: string | null
          dernier_paiement_date?: string | null
          district_id?: string | null
          fichier_certificat_url?: string | null
          fichier_contrat_url?: string | null
          id?: string
          id_unique?: string
          latitude?: number | null
          localisation_detail?: string | null
          longitude?: number | null
          montant_contributions?: number | null
          montant_da_paye?: number | null
          nom_plantation?: string | null
          numero_certificat_foncier?: string | null
          region_id?: string | null
          sous_prefecture_id?: string | null
          souscripteur_id?: string
          statut_global?:
            | Database["public"]["Enums"]["statut_plantation"]
            | null
          superficie_activee?: number | null
          superficie_ha?: number
          type_culture?: string | null
          updated_at?: string | null
          village_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "plantations_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantations_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantations_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantations_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantations_sous_prefecture_id_fkey"
            columns: ["sous_prefecture_id"]
            isOneToOne: false
            referencedRelation: "sous_prefectures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantations_souscripteur_id_fkey"
            columns: ["souscripteur_id"]
            isOneToOne: false
            referencedRelation: "souscripteurs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "plantations_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          created_at: string | null
          departement_id: string | null
          district_id: string | null
          email: string
          est_actif: boolean | null
          id: string
          nom_complet: string
          photo_url: string | null
          poste: string | null
          region_id: string | null
          telephone: string | null
          updated_at: string | null
          username: string
        }
        Insert: {
          created_at?: string | null
          departement_id?: string | null
          district_id?: string | null
          email: string
          est_actif?: boolean | null
          id: string
          nom_complet: string
          photo_url?: string | null
          poste?: string | null
          region_id?: string | null
          telephone?: string | null
          updated_at?: string | null
          username: string
        }
        Update: {
          created_at?: string | null
          departement_id?: string | null
          district_id?: string | null
          email?: string
          est_actif?: boolean | null
          id?: string
          nom_complet?: string
          photo_url?: string | null
          poste?: string | null
          region_id?: string | null
          telephone?: string | null
          updated_at?: string | null
          username?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
        ]
      }
      promotions: {
        Row: {
          conditions: string | null
          created_at: string | null
          created_by: string | null
          date_debut: string
          date_fin: string
          description: string | null
          est_active: boolean | null
          id: string
          montant_normal_ha: number | null
          montant_reduit_ha: number
          nom_promotion: string
          reduction_pct: number | null
        }
        Insert: {
          conditions?: string | null
          created_at?: string | null
          created_by?: string | null
          date_debut: string
          date_fin: string
          description?: string | null
          est_active?: boolean | null
          id?: string
          montant_normal_ha?: number | null
          montant_reduit_ha: number
          nom_promotion: string
          reduction_pct?: number | null
        }
        Update: {
          conditions?: string | null
          created_at?: string | null
          created_by?: string | null
          date_debut?: string
          date_fin?: string
          description?: string | null
          est_active?: boolean | null
          id?: string
          montant_normal_ha?: number | null
          montant_reduit_ha?: number
          nom_promotion?: string
          reduction_pct?: number | null
        }
        Relationships: []
      }
      regions: {
        Row: {
          code: string | null
          created_at: string | null
          id: string
          nom: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          id?: string
          nom: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          id?: string
          nom?: string
        }
        Relationships: []
      }
      sous_prefectures: {
        Row: {
          code: string | null
          created_at: string | null
          departement_id: string | null
          id: string
          nom: string
        }
        Insert: {
          code?: string | null
          created_at?: string | null
          departement_id?: string | null
          id?: string
          nom: string
        }
        Update: {
          code?: string | null
          created_at?: string | null
          departement_id?: string | null
          id?: string
          nom?: string
        }
        Relationships: [
          {
            foreignKeyName: "sous_prefectures_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
        ]
      }
      souscripteurs: {
        Row: {
          banque_operateur: string | null
          civilite: Database["public"]["Enums"]["civilite_type"] | null
          conjoint_date_delivrance: string | null
          conjoint_nom_prenoms: string | null
          conjoint_numero_piece: string | null
          conjoint_photo_identite_url: string | null
          conjoint_photo_url: string | null
          conjoint_telephone: string | null
          conjoint_type_piece:
            | Database["public"]["Enums"]["type_piece_type"]
            | null
          conjoint_whatsapp: string | null
          created_at: string | null
          created_by: string | null
          date_delivrance_piece: string | null
          date_naissance: string | null
          departement_id: string | null
          district_id: string | null
          domicile_residence: string | null
          email: string | null
          fichier_piece_url: string | null
          id: string
          id_unique: string
          lieu_naissance: string | null
          nom_beneficiaire: string | null
          nom_complet: string
          nombre_plantations: number | null
          numero_compte: string | null
          numero_piece: string | null
          photo_profil_url: string | null
          prenoms: string | null
          region_id: string | null
          sous_prefecture_id: string | null
          statut_global:
            | Database["public"]["Enums"]["statut_souscripteur"]
            | null
          statut_marital:
            | Database["public"]["Enums"]["statut_marital_type"]
            | null
          technico_commercial_id: string | null
          telephone: string
          total_contributions_versees: number | null
          total_da_verse: number | null
          total_hectares: number | null
          type_compte: string | null
          type_piece: Database["public"]["Enums"]["type_piece_type"] | null
          updated_at: string | null
          village_id: string | null
          whatsapp: string | null
        }
        Insert: {
          banque_operateur?: string | null
          civilite?: Database["public"]["Enums"]["civilite_type"] | null
          conjoint_date_delivrance?: string | null
          conjoint_nom_prenoms?: string | null
          conjoint_numero_piece?: string | null
          conjoint_photo_identite_url?: string | null
          conjoint_photo_url?: string | null
          conjoint_telephone?: string | null
          conjoint_type_piece?:
            | Database["public"]["Enums"]["type_piece_type"]
            | null
          conjoint_whatsapp?: string | null
          created_at?: string | null
          created_by?: string | null
          date_delivrance_piece?: string | null
          date_naissance?: string | null
          departement_id?: string | null
          district_id?: string | null
          domicile_residence?: string | null
          email?: string | null
          fichier_piece_url?: string | null
          id?: string
          id_unique: string
          lieu_naissance?: string | null
          nom_beneficiaire?: string | null
          nom_complet: string
          nombre_plantations?: number | null
          numero_compte?: string | null
          numero_piece?: string | null
          photo_profil_url?: string | null
          prenoms?: string | null
          region_id?: string | null
          sous_prefecture_id?: string | null
          statut_global?:
            | Database["public"]["Enums"]["statut_souscripteur"]
            | null
          statut_marital?:
            | Database["public"]["Enums"]["statut_marital_type"]
            | null
          technico_commercial_id?: string | null
          telephone: string
          total_contributions_versees?: number | null
          total_da_verse?: number | null
          total_hectares?: number | null
          type_compte?: string | null
          type_piece?: Database["public"]["Enums"]["type_piece_type"] | null
          updated_at?: string | null
          village_id?: string | null
          whatsapp?: string | null
        }
        Update: {
          banque_operateur?: string | null
          civilite?: Database["public"]["Enums"]["civilite_type"] | null
          conjoint_date_delivrance?: string | null
          conjoint_nom_prenoms?: string | null
          conjoint_numero_piece?: string | null
          conjoint_photo_identite_url?: string | null
          conjoint_photo_url?: string | null
          conjoint_telephone?: string | null
          conjoint_type_piece?:
            | Database["public"]["Enums"]["type_piece_type"]
            | null
          conjoint_whatsapp?: string | null
          created_at?: string | null
          created_by?: string | null
          date_delivrance_piece?: string | null
          date_naissance?: string | null
          departement_id?: string | null
          district_id?: string | null
          domicile_residence?: string | null
          email?: string | null
          fichier_piece_url?: string | null
          id?: string
          id_unique?: string
          lieu_naissance?: string | null
          nom_beneficiaire?: string | null
          nom_complet?: string
          nombre_plantations?: number | null
          numero_compte?: string | null
          numero_piece?: string | null
          photo_profil_url?: string | null
          prenoms?: string | null
          region_id?: string | null
          sous_prefecture_id?: string | null
          statut_global?:
            | Database["public"]["Enums"]["statut_souscripteur"]
            | null
          statut_marital?:
            | Database["public"]["Enums"]["statut_marital_type"]
            | null
          technico_commercial_id?: string | null
          telephone?: string
          total_contributions_versees?: number | null
          total_da_verse?: number | null
          total_hectares?: number | null
          type_compte?: string | null
          type_piece?: Database["public"]["Enums"]["type_piece_type"] | null
          updated_at?: string | null
          village_id?: string | null
          whatsapp?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "souscripteurs_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "souscripteurs_departement_id_fkey"
            columns: ["departement_id"]
            isOneToOne: false
            referencedRelation: "departements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "souscripteurs_district_id_fkey"
            columns: ["district_id"]
            isOneToOne: false
            referencedRelation: "districts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "souscripteurs_region_id_fkey"
            columns: ["region_id"]
            isOneToOne: false
            referencedRelation: "regions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "souscripteurs_sous_prefecture_id_fkey"
            columns: ["sous_prefecture_id"]
            isOneToOne: false
            referencedRelation: "sous_prefectures"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "souscripteurs_technico_commercial_id_fkey"
            columns: ["technico_commercial_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "souscripteurs_village_id_fkey"
            columns: ["village_id"]
            isOneToOne: false
            referencedRelation: "villages"
            referencedColumns: ["id"]
          },
        ]
      }
      souscriptions_brouillon: {
        Row: {
          created_at: string | null
          created_by: string | null
          donnees: Json | null
          etape_actuelle: number | null
          id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          donnees?: Json | null
          etape_actuelle?: number | null
          id?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          donnees?: Json | null
          etape_actuelle?: number | null
          id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "souscriptions_brouillon_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      statuts_configurables: {
        Row: {
          code: string
          couleur: string | null
          created_at: string | null
          entite: string
          est_actif: boolean | null
          id: string
          libelle: string
          ordre: number | null
        }
        Insert: {
          code: string
          couleur?: string | null
          created_at?: string | null
          entite: string
          est_actif?: boolean | null
          id?: string
          libelle: string
          ordre?: number | null
        }
        Update: {
          code?: string
          couleur?: string | null
          created_at?: string | null
          entite?: string
          est_actif?: boolean | null
          id?: string
          libelle?: string
          ordre?: number | null
        }
        Relationships: []
      }
      tickets: {
        Row: {
          assigne_a: string | null
          created_at: string | null
          cree_par: string | null
          date_resolution: string | null
          description: string | null
          id: string
          numero: string | null
          plantation_id: string | null
          priorite: string | null
          solution: string | null
          souscripteur_id: string | null
          statut: string | null
          titre: string
          type_ticket: string | null
          updated_at: string | null
        }
        Insert: {
          assigne_a?: string | null
          created_at?: string | null
          cree_par?: string | null
          date_resolution?: string | null
          description?: string | null
          id?: string
          numero?: string | null
          plantation_id?: string | null
          priorite?: string | null
          solution?: string | null
          souscripteur_id?: string | null
          statut?: string | null
          titre: string
          type_ticket?: string | null
          updated_at?: string | null
        }
        Update: {
          assigne_a?: string | null
          created_at?: string | null
          cree_par?: string | null
          date_resolution?: string | null
          description?: string | null
          id?: string
          numero?: string | null
          plantation_id?: string | null
          priorite?: string | null
          solution?: string | null
          souscripteur_id?: string | null
          statut?: string | null
          titre?: string
          type_ticket?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tickets_assigne_a_fkey"
            columns: ["assigne_a"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_cree_par_fkey"
            columns: ["cree_par"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_plantation_id_fkey"
            columns: ["plantation_id"]
            isOneToOne: false
            referencedRelation: "plantations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tickets_souscripteur_id_fkey"
            columns: ["souscripteur_id"]
            isOneToOne: false
            referencedRelation: "souscripteurs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      villages: {
        Row: {
          created_at: string | null
          id: string
          nom: string
          sous_prefecture_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          nom: string
          sous_prefecture_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          nom?: string
          sous_prefecture_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "villages_sous_prefecture_id_fkey"
            columns: ["sous_prefecture_id"]
            isOneToOne: false
            referencedRelation: "sous_prefectures"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_plantation_id: { Args: never; Returns: string }
      generate_souscripteur_id: { Args: never; Returns: string }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: { _user_id: string }; Returns: boolean }
    }
    Enums: {
      app_role:
        | "super_admin"
        | "directeur_tc"
        | "responsable_zone"
        | "chef_equipe"
        | "technico_commercial"
        | "agent_terrain"
        | "comptable"
        | "support"
      civilite_type: "m" | "mme" | "mlle"
      statut_marital_type: "celibataire" | "marie" | "divorce" | "veuf"
      statut_paiement: "en_attente" | "valide" | "rejete" | "annule"
      statut_plantation:
        | "en_attente_da"
        | "da_valide"
        | "en_cours"
        | "en_production"
        | "suspendu"
        | "archive"
      statut_souscripteur: "actif" | "inactif" | "suspendu" | "radie"
      type_piece_type: "cni" | "passeport" | "attestation" | "autre"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "super_admin",
        "directeur_tc",
        "responsable_zone",
        "chef_equipe",
        "technico_commercial",
        "agent_terrain",
        "comptable",
        "support",
      ],
      civilite_type: ["m", "mme", "mlle"],
      statut_marital_type: ["celibataire", "marie", "divorce", "veuf"],
      statut_paiement: ["en_attente", "valide", "rejete", "annule"],
      statut_plantation: [
        "en_attente_da",
        "da_valide",
        "en_cours",
        "en_production",
        "suspendu",
        "archive",
      ],
      statut_souscripteur: ["actif", "inactif", "suspendu", "radie"],
      type_piece_type: ["cni", "passeport", "attestation", "autre"],
    },
  },
} as const
