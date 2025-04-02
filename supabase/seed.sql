-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create authors table
CREATE TABLE authors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create categories table
CREATE TABLE categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create tags table
CREATE TABLE tags (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create articles table
CREATE TABLE articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    content TEXT NOT NULL,
    excerpt TEXT,
    featured_image TEXT,
    author_id UUID REFERENCES authors(id),
    category_id UUID REFERENCES categories(id),
    reading_time INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Create article_tags junction table
CREATE TABLE article_tags (
    article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (article_id, tag_id)
);

-- Create indexes
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_author ON articles(author_id);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_tags_slug ON tags(slug);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = TIMEZONE('utc', NOW());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_articles_updated_at
    BEFORE UPDATE ON articles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_authors_updated_at
    BEFORE UPDATE ON authors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_categories_updated_at
    BEFORE UPDATE ON categories
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_tags_updated_at
    BEFORE UPDATE ON tags
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Insert sample authors
INSERT INTO authors (id, name, avatar_url, bio) VALUES
(
  '4f62d14a-456d-4946-9c25-7581259e37d1',
  'Andre Sarr',
  '/images/profile-picture.png',
  'Full Stack Developer & Security Enthusiast. Passionate about cybersecurity, web development, and innovative technologies.'
);

-- Insert sample categories
INSERT INTO categories (id, name, slug) VALUES
('d5b42c5a-7f62-4229-8c79-05cecbde9584', 'Security', 'security'),
('a93c121d-2d7c-4012-9d3e-c90c39616103', 'Development', 'development'),
('f76e3dd5-553f-4f0b-a0c5-56b563128bf9', 'AI & Security', 'ai-security');

-- Insert sample tags
INSERT INTO tags (id, name, slug) VALUES
('7d32f2c8-2d71-4d1e-bc8e-93061a10a2b5', 'Cybersecurity', 'cybersecurity'),
('c9e52d4a-e381-4fca-a136-0d15b9bf5120', 'Network Security', 'network-security'),
('b4f62a78-9c30-4f05-b36e-d22af4a79691', 'Web Development', 'web-development'),
('e2c7d4b1-3f8a-4b02-9a5d-156789c04328', 'AI', 'ai'),
('a1d3e5f7-9b2c-4d0e-8f6a-123456789abc', 'Machine Learning', 'machine-learning'),
('f9e8d7c6-b5a4-3210-9876-543210fedcba', 'Next.js', 'nextjs');

-- Insert sample articles
INSERT INTO articles (
  id, 
  title, 
  slug, 
  content, 
  excerpt,
  featured_image,
  author_id,
  category_id,
  reading_time,
  is_featured
) VALUES
(
  '81c4d9e6-72f3-49b0-a5e1-123456789012',
  'Advanced Network Security: Protecting Against Modern Threats',
  'advanced-network-security',
  E'# Advanced Network Security: Protecting Against Modern Threats\n\n## Introduction\n\nIn today\'s interconnected world, network security has become more critical than ever. As cyber threats continue to evolve and become more sophisticated, organizations must adapt their security measures to protect against these modern challenges.\n\n## Understanding Modern Threats\n\n### 1. Advanced Persistent Threats (APTs)\n\nAPTs are long-term targeted attacks where hackers maintain unauthorized access to a network for extended periods. These attacks are particularly dangerous because:\n\n- They\'re difficult to detect\n- They can cause significant damage over time\n- They often target sensitive data\n\n### 2. Zero-Day Exploits\n\nZero-day vulnerabilities are particularly dangerous because:\n\n```python\n# Example of a vulnerability scanner\ndef scan_for_vulnerabilities(network):\n    vulnerabilities = []\n    for node in network.nodes:\n        if node.patch_level < latest_patch:\n            vulnerabilities.append({\n                "node": node,\n                "risk_level": "high",\n                "recommendation": "update_immediately"\n            })\n    return vulnerabilities\n```',
  'A comprehensive guide to protecting your network against modern security threats including APTs and zero-day exploits.',
  '/images/featured/network-security.jpg',
  '4f62d14a-456d-4946-9c25-7581259e37d1',
  'd5b42c5a-7f62-4229-8c79-05cecbde9584',
  8,
  true
);

-- Link articles to tags
INSERT INTO article_tags (article_id, tag_id) VALUES
('81c4d9e6-72f3-49b0-a5e1-123456789012', '7d32f2c8-2d71-4d1e-bc8e-93061a10a2b5'),
('81c4d9e6-72f3-49b0-a5e1-123456789012', 'c9e52d4a-e381-4fca-a136-0d15b9bf5120');