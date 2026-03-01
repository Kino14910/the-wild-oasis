
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://nauibeinvgmfuyoneeno.supabase.co'
const supabaseKey = 'sb_publishable_eo0PPJo-I_Sh1G-Ps3_YqA_2YSohD3Z'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase