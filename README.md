# Premium SaaS Business Analytics Dashboard

A production-grade, multi-page SaaS dashboard built with Next.js 14, TypeScript, Tailwind CSS, Framer Motion, and Supabase.

## Features
- **Modern UI/UX**: Sora & Inter fonts, glassmorphism, animated gradients, and premium Framer Motion transitions.
- **Three Theme Modes**: Light, Dark, and Night (OLED Black).
- **Custom Auth**: Registration with automated data seeding based on business category.
- **Analytics**: Interactive Recharts for revenue, growth, and category distribution.
- **Full CRUD**: Manage transactions, products, users (admin-only), and notifications.
- **Real-time Performance**: Optimized data fetching with custom hooks and loading states.
- **Responsive**: Fully functional sidebar and navigation on all screen sizes.

## Getting Started

1. **Supabase Setup**:
   - Create a new project in [Supabase](https://supabase.com).
   - Go to the **SQL Editor** and run the contents of `setup.sql`.
   - Go to **Project Settings > API** and copy your `URL` and `anon public` key.

2. **Environment Variables**:
   - Update `.env.local` with your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
     ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```

5. **Access the App**:
   - Open [http://localhost:3000](http://localhost:3000)
   - Go to `/onboarding` to create your first account and seed initial data.

## Project Structure
- `/app`: Main pages and routing
- `/components`: Reusable UI and Layout components
- `/lib`: Supabase client, auth helpers, types, and seeding logic
- `/hooks`: Custom data fetching and session hooks
- `/public`: Static assets

## Absolute Rules Followed
- No placeholders after onboarding.
- Real Supabase CRUD on all operations.
- Staggered animations and spring physics on every page.
- Role-based access control (Admin/Viewer).
- CSV export for analytics and transactions.
