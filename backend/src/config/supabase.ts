import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

let supabaseClient: ReturnType<typeof createClient> | undefined;

export default function getSupabaseClient() {
    if (!supabaseClient) {
        const supaURL = process.env.supabaseURL;
        const supaKey = process.env.supabaseKey;

        if (!supaURL || !supaKey) {
            throw new Error("supabaseURL and supabaseKey are required when QR_STORAGE_PROVIDER=supabase.");
        }

        supabaseClient = createClient(supaURL, supaKey);
    }

    return supabaseClient;
}
