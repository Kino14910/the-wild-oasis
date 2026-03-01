import { createClient } from '@supabase/supabase-js'
import { Database } from './types'
export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY
export const supabase = createClient<Database>(supabaseUrl, supabaseKey)

// usage: const [profile, setProfile] = useState<Tables<'profiles'>>()
export type Tables<T extends keyof Database['public']['Tables']> = 
  Database['public']['Tables'][T]['Row']