import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface QuizResult {
  id?: string;
  player_name: string;
  presentation_version: string;
  score: number;
  total_xp: number;
  correct_count: number;
  total_questions: number;
  created_at?: string;
}

export async function saveQuizResult(result: Omit<QuizResult, 'id' | 'created_at'>) {
  const { data, error } = await supabase
    .from('quiz_results')
    .insert([result])
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function getLeaderboard(limit = 20) {
  const { data, error } = await supabase
    .from('quiz_results')
    .select('*')
    .order('total_xp', { ascending: false })
    .limit(limit);
  if (error) throw error;
  return data as QuizResult[];
}

export function subscribeToLeaderboard(callback: (results: QuizResult[]) => void) {
  const channel = supabase
    .channel('leaderboard-realtime')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'quiz_results' },
      async () => {
        const results = await getLeaderboard();
        callback(results);
      }
    )
    .subscribe();
  return () => {
    supabase.removeChannel(channel);
  };
}

// Liderboard'u komple sıfırla — sadece öğretmen/admin için
// Not: RLS delete policy'si yoksa başarısız olur. Schema'da policy açık.
export async function resetLeaderboard() {
  const { error } = await supabase
    .from('quiz_results')
    .delete()
    .neq('id', '00000000-0000-0000-0000-000000000000');   // tüm satırları sil
  if (error) throw error;
}
