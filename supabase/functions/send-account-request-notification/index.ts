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
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );

    const { requestData } = await req.json();

    // Get all super admins
    const { data: superAdmins, error: adminsError } = await supabaseAdmin
      .from('user_roles')
      .select('user_id')
      .eq('role', 'super_admin');

    if (adminsError) throw adminsError;

    // Get admin profiles
    const adminIds = superAdmins?.map(a => a.user_id) || [];
    const { data: adminProfiles, error: profilesError } = await supabaseAdmin
      .from('profiles')
      .select('id, email, nom_complet, telephone')
      .in('id', adminIds);

    if (profilesError) throw profilesError;

    // Send notification to each super admin
    for (const adminProfile of adminProfiles || []) {
      // Create in-app notification
      await supabaseAdmin.from('notifications').insert({
        user_id: adminProfile.id,
        type: 'account_request',
        title: 'Nouvelle demande de compte',
        message: `${requestData.nom_complet} demande un accès avec le rôle ${requestData.role_souhaite}`,
        data: requestData
      });

      // Send email notification (if RESEND_API_KEY is configured)
      const resendKey = Deno.env.get('RESEND_API_KEY');
      if (resendKey && adminProfile.email) {
        try {
          const emailResponse = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${resendKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              from: 'AgriCapital <noreply@agricapital.ci>',
              to: [adminProfile.email],
              subject: 'Nouvelle demande de création de compte',
              html: `
                <h2>Nouvelle demande de compte</h2>
                <p><strong>Nom:</strong> ${requestData.nom_complet}</p>
                <p><strong>Email:</strong> ${requestData.email}</p>
                <p><strong>Téléphone:</strong> ${requestData.telephone}</p>
                <p><strong>Poste:</strong> ${requestData.poste_souhaite}</p>
                <p><strong>Rôle:</strong> ${requestData.role_souhaite}</p>
                <p><strong>Justification:</strong> ${requestData.justification}</p>
                <p>Connectez-vous à la plateforme pour traiter cette demande.</p>
              `
            })
          });

          if (!emailResponse.ok) {
            console.error('Email send failed:', await emailResponse.text());
          }
        } catch (emailError) {
          console.error('Email error:', emailError);
        }
      }

      // Send WhatsApp notification (if WHATSAPP_TOKEN is configured)
      const whatsappToken = Deno.env.get('WHATSAPP_TOKEN');
      if (whatsappToken && adminProfile.telephone) {
        try {
          const whatsappResponse = await fetch('https://graph.facebook.com/v17.0/YOUR_PHONE_NUMBER_ID/messages', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${whatsappToken}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              messaging_product: 'whatsapp',
              to: adminProfile.telephone,
              type: 'template',
              template: {
                name: 'account_request_notification',
                language: { code: 'fr' },
                components: [
                  {
                    type: 'body',
                    parameters: [
                      { type: 'text', text: requestData.nom_complet },
                      { type: 'text', text: requestData.role_souhaite }
                    ]
                  }
                ]
              }
            })
          });

          if (!whatsappResponse.ok) {
            console.error('WhatsApp send failed:', await whatsappResponse.text());
          }
        } catch (whatsappError) {
          console.error('WhatsApp error:', whatsappError);
        }
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: 'Notifications sent' }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: any) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
