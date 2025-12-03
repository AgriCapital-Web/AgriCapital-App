import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const { username, email, password, nom_complet, telephone } = await req.json();
    console.log('Creating super admin:', { username, email, nom_complet });

    // Create auth user
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });

    let userId = authData?.user?.id;

    if (authError) {
      if (authError.message?.includes('already') || authError.status === 422) {
        const { data: listData } = await supabaseAdmin.auth.admin.listUsers({ page: 1, perPage: 1000 });
        const found = listData?.users?.find((u: any) => u.email?.toLowerCase() === email.toLowerCase());
        if (found) userId = found.id;
      }
      if (!userId) {
        return new Response(JSON.stringify({ error: authError.message }), 
          { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
      }
    }

    // Upsert profile
    await supabaseAdmin.from('profiles').upsert({
      id: userId,
      username,
      nom_complet,
      email,
      telephone: telephone || null,
      est_actif: true,
    }, { onConflict: 'id' });

    // Upsert role
    await supabaseAdmin.from('user_roles').upsert(
      { user_id: userId, role: 'super_admin' }, 
      { onConflict: 'user_id,role' }
    );

    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Super admin créé avec succès',
      user_id: userId,
      username,
      email
    }), { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(JSON.stringify({ error: error?.message || 'Erreur' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});