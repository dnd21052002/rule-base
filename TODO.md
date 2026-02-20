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

## Owner Tasks (Manual — Không cần code)

### Branding & Infrastructure
- [ ] Mua domain (gợi ý: `rulebase.dev` ~$12/năm trên Cloudflare/Namecheap)
- [ ] Setup email `hello@rulebase.dev` (Cloudflare Email Routing free → forward về Gmail cá nhân)
- [ ] Tạo GitHub org (ví dụ: `rulebase-dev`) → transfer repo từ `dnd21052002/rule-base` sang org
- [ ] Trỏ domain về Vercel (Add domain trong Vercel dashboard → cập nhật DNS)
- [ ] Cập nhật `AUTH_URL` env var trên Vercel thành domain mới

### OAuth Apps
- [ ] Tạo lại GitHub OAuth App dưới org mới, callback URL = `https://rulebase.dev/api/auth/callback/github`
- [ ] Cập nhật Google OAuth App: thêm `https://rulebase.dev` vào Authorized redirect URIs
- [ ] Cập nhật env vars trên Vercel với OAuth credentials mới

### Lemon Squeezy
- [ ] Verify store trên Lemon Squeezy (cần ID/passport + địa chỉ)
- [ ] Tạo product "RuleBase Pro" — $5/mo recurring
- [ ] Lấy: API Key, Store ID, Pro Variant ID
- [ ] Tạo Webhook → URL: `https://rulebase.dev/api/lemonsqueezy/webhook`
  - Events: `subscription_created`, `subscription_updated`, `subscription_cancelled`, `subscription_expired`
- [ ] Lấy Webhook Secret
- [ ] Set 4 env vars trên Vercel:
  - `LEMON_SQUEEZY_API_KEY`
  - `LEMON_SQUEEZY_STORE_ID`
  - `LEMON_SQUEEZY_PRO_VARIANT_ID`
  - `LEMON_SQUEEZY_WEBHOOK_SECRET`

### Social & Marketing
- [ ] Tạo Twitter/X account cho RuleBase
- [ ] Tạo Discord server cho community
- [ ] Viết launch post trên Twitter, Reddit (r/webdev, r/nextjs), Hacker News
- [ ] Submit lên Product Hunt khi có đủ rules

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
