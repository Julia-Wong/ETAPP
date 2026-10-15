import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import 'react-native-url-polyfill/auto';

const supabaseUrl = 'https://ucjevysgmtfdruqxcpay.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjamV2eXNnbXRmZHJ1cXhjcGF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwOTIzMjksImV4cCI6MjEwNzY2ODMyOX0.llltyuHQHcV0OiSPhO1kCi-MSY0VwRPCGpyy3XB5qaY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});