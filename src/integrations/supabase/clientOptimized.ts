// Enhanced Supabase client with performance optimizations and security measures
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://oaolfwlfnrmrpukpkqxf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hb2xmd2xmbnJtcnB1a3BrcXhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2NjE3NTEsImV4cCI6MjA3NDIzNzc1MX0.E-F-hAQ8KVhIlj5a66E9v0tYBqwGK_qBmRJJVGHXDBQ";

// Enhanced supabase client configuration
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  db: {
    schema: 'public'
  },
  global: {
    headers: {
      'X-Client-Info': 'achiever-perks-hub-v1.0.0',
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
    }
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});

// Export the client for import in other files
export default supabase;