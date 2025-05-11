
-- Add new columns to the profiles table for settings
ALTER TABLE profiles 
  ADD COLUMN IF NOT EXISTS phone TEXT,
  ADD COLUMN IF NOT EXISTS logo_url TEXT,
  ADD COLUMN IF NOT EXISTS preferences JSONB DEFAULT '{"language": "en", "currency": "ILS", "enableDailyReminders": false, "enablePaymentAlerts": false}'::jsonb;
