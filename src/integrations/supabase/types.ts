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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
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
    },
  },
} as const
