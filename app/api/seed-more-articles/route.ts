import { NextResponse } from "next/server"
import { supabase } from "@/lib/supabase"

export async function GET() {
  try {
    // Check if we already have these articles
    const { data: existingArticles, error: checkError } = await supabase
      .from("articles")
      .select("id, slug")
      .in("id", sampleArticles.map(a => a.id))
      .in("slug", sampleArticles.map(a => a.slug));

    if (checkError) {
      return NextResponse.json({ error: "Failed to check articles", details: checkError });
    }

    // Skip if articles already exist
    const existingIds = existingArticles?.map(a => a.id) || [];
    const existingSlugs = existingArticles?.map(a => a.slug) || [];
    const articlesToAdd = sampleArticles.filter(a => 
      !existingIds.includes(a.id) && !existingSlugs.includes(a.slug)
    );

    if (articlesToAdd.length === 0) {
      return NextResponse.json({
        message: "Additional articles already exist",
        action: "none",
      })
    }

    // Insert new articles
    const { error: insertError } = await supabase.from("articles").insert(articlesToAdd)

    if (insertError) {
      return NextResponse.json({ error: "Failed to insert articles", details: insertError })
    }

    // Link articles to tags
    const articleTags = [
      // Web Security article tags
      { article_id: "a2c4d9e6-72f3-49b0-a5e1-123456789013", tag_id: "7d32f2c8-2d71-4d1e-bc8e-93061a10a2b5" },
      { article_id: "a2c4d9e6-72f3-49b0-a5e1-123456789013", tag_id: "b4f62a78-9c30-4f05-b36e-d22af4a79691" },

      // AI in Cybersecurity article tags
      { article_id: "a3c4d9e6-72f3-49b0-a5e1-123456789014", tag_id: "7d32f2c8-2d71-4d1e-bc8e-93061a10a2b5" },
      { article_id: "a3c4d9e6-72f3-49b0-a5e1-123456789014", tag_id: "e2c7d4b1-3f8a-4b02-9a5d-156789c04328" },
      { article_id: "a3c4d9e6-72f3-49b0-a5e1-123456789014", tag_id: "a1d3e5f7-9b2c-4d0e-8f6a-123456789abc" },

      // Next.js article tags
      { article_id: "a4c4d9e6-72f3-49b0-a5e1-123456789015", tag_id: "b4f62a78-9c30-4f05-b36e-d22af4a79691" },
      { article_id: "a4c4d9e6-72f3-49b0-a5e1-123456789015", tag_id: "f9e8d7c6-b5a4-3210-9876-543210fedcba" },
    ]

    const { error: tagError } = await supabase.from("article_tags").insert(articleTags)

    if (tagError) {
      return NextResponse.json({ error: "Failed to insert article tags", details: tagError })
    }

    return NextResponse.json({
      success: true,
      message: "Additional articles seeded successfully",
      count: articlesToAdd.length,
    })
  } catch (error: any) {
    console.error("Seed more articles error:", error)
    return NextResponse.json({ error: "Internal server error", details: error.message })
  }
}

// Sample articles data
const sampleArticles = [
  {
    id: "a2c4d9e6-72f3-49b0-a5e1-123456789013",
    title: "Web Security Best Practices for Developers",
    slug: "web-security-best-practices",
    content: `# Web Security Best Practices for Developers

## Introduction

Web security is a critical aspect of modern application development. As cyber threats continue to evolve, developers must stay vigilant and implement robust security measures to protect user data and maintain application integrity.

## Essential Security Practices

### 1. Input Validation and Sanitization

Always validate and sanitize user input to prevent injection attacks:

\`\`\`javascript
// Bad practice
const query = \`SELECT * FROM users WHERE username = '\${userInput}'\`;

// Good practice
const query = 'SELECT * FROM users WHERE username = ?';
db.execute(query, [sanitizeInput(userInput)]);
\`\`\`

### 2. Implement Proper Authentication

Use strong authentication mechanisms:

- Implement multi-factor authentication
- Use secure password hashing (bcrypt, Argon2)
- Enforce strong password policies
- Implement account lockout mechanisms

### 3. Use HTTPS Everywhere

Always use HTTPS to encrypt data in transit:

- Obtain SSL/TLS certificates from trusted authorities
- Configure proper SSL/TLS settings
- Implement HSTS (HTTP Strict Transport Security)
- Redirect HTTP to HTTPS

### 4. Practice the Principle of Least Privilege

Only grant the minimum permissions necessary:

- Use role-based access control
- Regularly audit user permissions
- Implement proper session management

## Advanced Security Measures

### 1. Implement Content Security Policy (CSP)

CSP helps prevent XSS attacks by specifying which dynamic resources are allowed to load:

\`\`\`html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' https://trusted-cdn.com;">
\`\`\`

### 2. Use Security Headers

Implement security headers to enhance your application's security posture:

\`\`\`
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
\`\`\`

### 3. Regular Security Audits and Penetration Testing

Conduct regular security assessments:

- Automated vulnerability scanning
- Manual penetration testing
- Code reviews focused on security
- Dependency vulnerability checks

## Conclusion

Web security is not a one-time implementation but an ongoing process. By following these best practices, developers can significantly reduce the risk of security breaches and protect both their applications and users.`,
    excerpt:
      "Learn essential web security practices every developer should implement to protect applications from common vulnerabilities and attacks.",
    featured_image: "/images/featured/web-security.jpg",
    author_id: "4f62d14a-456d-4946-9c25-7581259e37d1",
    category_id: "d5b42c5a-7f62-4229-8c79-05cecbde9584",
    reading_time: 7,
    is_featured: false,
  },
  {
    id: "a3c4d9e6-72f3-49b0-a5e1-123456789014",
    title: "AI in Cybersecurity: Revolutionizing Threat Detection",
    slug: "ai-in-cybersecurity",
    content: `# AI in Cybersecurity: Revolutionizing Threat Detection

## Introduction

Artificial Intelligence (AI) is transforming the cybersecurity landscape, enabling organizations to detect and respond to threats with unprecedented speed and accuracy. This article explores how AI technologies are being applied to enhance security operations and combat increasingly sophisticated cyber attacks.

## The Evolution of Cybersecurity Challenges

Traditional security approaches are becoming less effective against:

- Advanced Persistent Threats (APTs)
- Zero-day vulnerabilities
- Sophisticated social engineering attacks
- Automated attack tools
- Insider threats

## How AI is Transforming Cybersecurity

### 1. Enhanced Threat Detection

AI systems can analyze vast amounts of data to identify patterns and anomalies that might indicate a security breach:

\`\`\`python
# Example of anomaly detection with machine learning
def detect_anomalies(network_traffic_data):
    # Train model on normal behavior
    model = train_anomaly_detection_model(historical_normal_data)
    
    # Analyze current traffic
    anomalies = []
    for data_point in network_traffic_data:
        score = model.predict(data_point)
        if score > anomaly_threshold:
            anomalies.append({
                "timestamp": data_point.timestamp,
                "source": data_point.source,
                "anomaly_score": score,
                "details": data_point.raw_data
            })
    
    return anomalies
\`\`\`

### 2. Behavioral Analysis

AI can establish baselines of normal user behavior and detect deviations that might indicate account compromise:

- Login patterns and locations
- File access behaviors
- Command execution patterns
- Network traffic patterns

### 3. Automated Response

AI-powered security systems can automatically respond to threats:

- Isolating compromised systems
- Blocking suspicious IP addresses
- Requiring additional authentication
- Alerting security teams with contextual information

## Real-World Applications

### 1. Next-Generation Antivirus (NGAV)

Modern antivirus solutions use machine learning to detect malware based on behavior rather than signatures.

### 2. User and Entity Behavior Analytics (UEBA)

UEBA systems use AI to model normal behavior and detect anomalies that might indicate compromise.

### 3. Network Traffic Analysis

AI-powered tools can analyze network traffic in real-time to detect command-and-control communications, data exfiltration, and other suspicious activities.

## Challenges and Limitations

Despite its potential, AI in cybersecurity faces several challenges:

- False positives and alert fatigue
- Adversarial attacks against AI systems
- Data quality and availability issues
- Skills gap in AI security expertise

## The Future of AI in Cybersecurity

As AI technologies continue to evolve, we can expect:

- More sophisticated threat hunting capabilities
- Better integration between security tools
- Improved explainability of AI-based detections
- Autonomous security operations

## Conclusion

AI is not a silver bullet for cybersecurity, but it is becoming an essential component of modern security strategies. By augmenting human expertise with AI capabilities, organizations can better defend against the evolving threat landscape.`,
    excerpt:
      "Discover how artificial intelligence and machine learning are revolutionizing cybersecurity threat detection and response capabilities.",
    featured_image: "/images/featured/ai-security.jpg",
    author_id: "4f62d14a-456d-4946-9c25-7581259e37d1",
    category_id: "f76e3dd5-553f-4f0b-a0c5-56b563128bf9",
    reading_time: 9,
    is_featured: false,
  },
  {
    id: "a4c4d9e6-72f3-49b0-a5e1-123456789015",
    title: "Mastering Next.js App Router: A Comprehensive Guide",
    slug: "nextjs-app-router",
    content: `# Mastering Next.js App Router: A Comprehensive Guide

## Introduction

Next.js 13 introduced the App Router, a new paradigm for building React applications with server components, nested layouts, and simplified data fetching. This guide explores the key features and best practices for leveraging the App Router in your projects.

## Understanding the App Router

The App Router uses a file-system based router built on top of Server Components:

- \`page.js\` files define routes
- \`layout.js\` files define shared UI
- \`loading.js\` files create loading states
- \`error.js\` files handle errors
- \`not-found.js\` files handle 404 errors

## Server Components vs. Client Components

The App Router introduces a new mental model with Server Components as the default:

\`\`\`jsx
// Server Component (default)
export default function ServerComponent() {
  // This code runs on the server
  return <div>Server Component</div>;
}

// Client Component
'use client';

export default function ClientComponent() {
  // This code runs on the client
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
\`\`\`

## Data Fetching Patterns

The App Router simplifies data fetching with built-in patterns:

### 1. Server Component Data Fetching

\`\`\`jsx
// app/users/page.js
export default async function UsersPage() {
  // This fetch call is automatically deduped and cached
  const users = await fetch('https://api.example.com/users').then(res => res.json());
  
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}
\`\`\`

### 2. Static vs. Dynamic Data

Control caching behavior with the \`cache\` option:

\`\`\`jsx
// Static data (default)
const data = await fetch('https://api.example.com/data');

// Dynamic data (no caching)
const data = await fetch('https://api.example.com/data', { cache: 'no-store' });

// Revalidated data
const data = await fetch('https://api.example.com/data', { next: { revalidate: 60 } });
\`\`\`

## Nested Layouts

Create consistent UI across routes with nested layouts:

\`\`\`jsx
// app/layout.js (Root layout)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>Site Header</header>
        {children}
        <footer>Site Footer</footer>
      </body>
    </html>
  );
}

// app/dashboard/layout.js (Nested layout)
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <nav>Dashboard Navigation</nav>
      <main>{children}</main>
    </div>
  );
}
\`\`\`

## Route Handlers

Create API endpoints with the new Route Handlers:

\`\`\`jsx
// app/api/users/route.js
export async function GET() {
  const users = await fetchUsers();
  return Response.json(users);
}

export async function POST(request) {
  const data = await request.json();
  const newUser = await createUser(data);
  return Response.json(newUser, { status: 201 });
}
\`\`\`

## Server Actions

Perform server-side mutations with Server Actions:

\`\`\`jsx
// app/actions.js
'use server';

export async function createTodo(formData) {
  const title = formData.get('title');
  
  // Server-side validation
  if (!title || title.length < 3) {
    return { error: 'Title must be at least 3 characters' };
  }
  
  // Create todo in database
  await db.todos.create({ title });
  
  // Return success
  return { success: true };
}

// app/new-todo.js
'use client';

import { createTodo } from './actions';
import { useFormState } from 'react-dom';

export default function NewTodo() {
  const [state, formAction] = useFormState(createTodo, {});
  
  return (
    <form action={formAction}>
      <input name="title" placeholder="New todo" />
      <button type="submit">Create</button>
      {state.error && <p className="error">{state.error}</p>}
    </form>
  );
}
\`\`\`

## Parallel Routes and Intercepting Routes

The App Router introduces advanced routing patterns:

### Parallel Routes

\`\`\`jsx
// app/@dashboard/page.js
export default function Dashboard() {
  return <div>Dashboard Content</div>;
}

// app/@sidebar/page.js
export default function Sidebar() {
  return <div>Sidebar Content</div>;
}

// app/layout.js
export default function Layout({ dashboard, sidebar }) {
  return (
    <div className="grid grid-cols-4">
      <div className="col-span-1">{sidebar}</div>
      <div className="col-span-3">{dashboard}</div>
    </div>
  );
}
\`\`\`

### Intercepting Routes

\`\`\`
app/feed/page.js
app/feed/[postId]/page.js
app/feed/@modal/(.)post/[postId]/page.js
\`\`\`

## Best Practices

1. **Prefer Server Components** for most UI rendering
2. **Use Client Components sparingly** for interactive elements
3. **Colocate data fetching** with the components that use the data
4. **Leverage streaming** with Suspense boundaries for improved UX
5. **Implement proper error handling** with error.js files

## Conclusion

The Next.js App Router represents a significant evolution in React application development, enabling more performant, maintainable, and user-friendly web applications. By understanding its core concepts and following best practices, developers can build sophisticated applications with improved performance and developer experience.`,
    excerpt:
      "Learn how to leverage the powerful features of Next.js App Router to build more efficient and maintainable React applications.",
    featured_image: "/images/featured/nextjs.jpg",
    author_id: "4f62d14a-456d-4946-9c25-7581259e37d1",
    category_id: "a93c121d-2d7c-4012-9d3e-c90c39616103",
    reading_time: 12,
    is_featured: false,
  },
]

