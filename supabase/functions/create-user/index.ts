// Import required Supabase functions
import { serve } from "https://deno.land/std@0.131.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.0.3";

// Initialize Supabase client with environment variables for URL and API key
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

// Supabase client (using the Service Role key for backend operations)
const supabase = createClient(supabaseUrl, supabaseKey);

serve(async (req) => {
  try {
    // Check if the method is POST (since Clerk will send POST requests)
    if (req.method !== "POST") {
      return new Response(JSON.stringify({ error: "Only POST requests are allowed" }), { status: 405 });
    }

    const { id, email_addresses, first_name, image_url } = (await req.json()).data;
    const email = email_addresses[0].email_address;

    const { data, error } = await supabase.from("users").insert({
      id: id,
      first_name: first_name,
      email: email,
      avatar_url: image_url,
    });

    if (error) {
      console.error("Error inserting user:", error);
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ message: "User inserted successfully", data }), { status: 200 });
  } catch (error) {
    console.error("Unexpected error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), { status: 500 });
  }
});
