import { supabase } from "$lib/supabaseClient";

export async function load() {
  const { data } = await supabase.from("youtube_stats").select();
  return {
    stats: data ?? [],
  };
}