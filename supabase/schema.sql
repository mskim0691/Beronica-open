-- Beronica Admin: Database Schema
-- Run this in Supabase SQL Editor to set up tables

-- Blog posts table
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL,
  locale TEXT NOT NULL CHECK (locale IN ('ko', 'en')),
  title TEXT NOT NULL,
  date DATE NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('GTD', 'PARA', 'AI Memory', 'Build Log', 'Tutorial')),
  tags TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  image TEXT,
  series_name TEXT,
  series_order INTEGER,
  author TEXT NOT NULL DEFAULT 'Minsu Kim',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  content TEXT NOT NULL,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(slug, locale)
);

CREATE INDEX idx_blog_posts_locale_date ON blog_posts(locale, date DESC);
CREATE INDEX idx_blog_posts_locale_category ON blog_posts(locale, category);

-- Site content table (i18n messages)
CREATE TABLE site_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  locale TEXT NOT NULL CHECK (locale IN ('ko', 'en')),
  section TEXT NOT NULL,
  key TEXT NOT NULL,
  value TEXT NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(locale, section, key)
);

-- Auto-update updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Public read for published posts
CREATE POLICY "Public can read published posts"
  ON blog_posts FOR SELECT
  USING (published = TRUE);

-- Authenticated users get full access
CREATE POLICY "Admin full access on posts"
  ON blog_posts FOR ALL
  USING (auth.role() = 'authenticated');

CREATE POLICY "Public can read site content"
  ON site_content FOR SELECT
  USING (TRUE);

CREATE POLICY "Admin full access on site_content"
  ON site_content FOR ALL
  USING (auth.role() = 'authenticated');
