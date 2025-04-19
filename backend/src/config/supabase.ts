import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const supaURL = process.env.supabaseURL || "";
const supaKey = process.env.supabaseKey || "";

const supabase = createClient(supaURL, supaKey);

export default supabase;