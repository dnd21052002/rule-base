# RuleBase — Development TODO

## Day 1 ✅ (2026-02-20)

- [x] MVP Landing page (Hero, How it Works, Featured, Rules Grid, CTA, Footer)
- [x] Dark/Light mode toggle + Cursor spotlight effect
- [x] Auth.js (GitHub, Google, Credentials) + Sign-in page
- [x] Backend schema (Drizzle + Neon PostgreSQL)
- [x] REST API routes (rules CRUD, copy tracking, ratings)
- [x] Open Core + Hosted SaaS model (Lemon Squeezy integration)
- [x] Pricing page (/pricing) + Dashboard page (/dashboard)
- [x] Webhook handler + subscription lifecycle
- [x] DB migration (plan, subscriptions table)
- [x] Deploy to Vercel + GitHub repo

## Day 2 — Priorities

### 1. Seed DB + Replace Mock Data
- [ ] Seed categories vào DB (Next.js, Python, React, React Native, General, etc.)
- [ ] Seed 10-15 rules chất lượng cao vào DB
- [ ] Chuyển landing page từ mock data (`lib/data.ts`) sang fetch từ DB
- [ ] Server-side search + filter thay vì client-side

### 2. User Submit Rules
- [ ] Tạo trang `/rules/new` với form (title, description, content, category, tags)
- [ ] Validate input với Zod
- [ ] Chỉ user đã sign-in mới submit được
- [ ] Redirect sau submit -> rule detail page

### 3. Rule Detail Page (`/rules/[slug]`)
- [ ] Hiển thị full rule content, author info, rating, copy count
- [ ] Copy to clipboard button
- [ ] Rate (1-5 stars) cho user đã sign in
- [ ] Related rules (cùng category)
- [ ] SEO metadata (dynamic Open Graph)

### 4. Copy Limit (Free vs Pro)
- [ ] Đếm copies/ngày cho Free user (max 5)
- [ ] Chặn + hiện "Upgrade to Pro" popup khi vượt limit
- [ ] Pro user: unlimited copies

### 5. Dashboard thật
- [ ] My Rules: list rules đã tạo (edit/delete)
- [ ] Stats thật từ DB (rules created, total copies, avg rating)
- [ ] Copy history
- [ ] Thêm bảng `bookmarks` cho saved rules

### 6. Lemon Squeezy
- [ ] Verify store trên Lemon Squeezy
- [ ] Tạo product "Pro Plan" ($5/mo) -> lấy variant ID
- [ ] Tạo API key + Webhook
- [ ] Set env vars trên Vercel
- [ ] Test checkout flow end-to-end

## Backlog (Later)

- [ ] Private rules (Pro only)
- [ ] Export rules (.cursorrules, .windsurfrules, copilot-instructions.md)
- [ ] AI-powered rule suggestions
- [ ] Author analytics dashboard
- [ ] Full-text search (pg_trgm hoặc Algolia)
- [ ] Notifications (new copy, new rating)
- [ ] Comments/discussions on rules
- [ ] Rule versioning
- [ ] API rate limiting
- [ ] Mobile responsive improvements
