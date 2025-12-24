# Quick Start Guide - Client Portal SaaS

## 🎯 What You Built

A **multi-tenant B2B SaaS** where service businesses can manage clients, track projects, and share files - all from one professional dashboard.

---

## 🚀 Running the Application

### Terminal 1: Database
```bash
docker-compose up -d
```

### Terminal 2: Backend API
```bash
cd apps/api
npm run start:dev
```
✅ API runs on `http://localhost:3001`

### Terminal 3: Frontend
```bash
cd apps/client-portal
npm run dev
```
✅ Frontend runs on `http://localhost:3000`

---

## 📋 Quick Test Workflow

### 1. Register a Business
Visit: `http://localhost:3000/register`
- Business Name: "Your Agency"
- Email: your@email.com
- Password: (your choice)

### 2. Add a Client
- Click "Clients" in sidebar
- Click "Add Client" button
- Fill in client details

### 3. Create a Project
- Click "Projects" in sidebar
- Click "New Project" button
- Select client and add project details

### 4. Upload Files
- On any project card, click "Upload"
- Files are stored in Cloudinary

### 5. Update Status
- Click "Start Work" → Changes to IN_PROGRESS
- Click "Deliver" → Changes to DELIVERED

---

## 🔑 Key Features Implemented

✅ **Multi-tenant Architecture** - Each business has isolated data  
✅ **JWT Authentication** - Secure login/registration  
✅ **Duplicate Prevention** - Smart slug generation with random suffixes  
✅ **Client Management** - Full CRUD operations  
✅ **Project Tracking** - Status workflow (Pending → In Progress → Delivered)  
✅ **File Uploads** - Cloudinary integration  
✅ **Premium UI** - Modern, B2B-focused design  
✅ **CORS Enabled** - Frontend/backend communication  

---

## 🗄️ Database Schema

```
Business (Multi-tenant root)
├── Users (OWNER, ADMIN, CLIENT roles)
├── Clients
├── Projects
│   └── Files (Cloudinary URLs)
└── Invoices
```

---

## 🔧 Environment Variables

Located in `.env`:
```env
DATABASE_URL="postgresql://cp_user:cp_password@localhost:5432/cp_db"
CLOUDINARY_CLOUD_NAME=dbcuyckat
CLOUDINARY_API_KEY=848143656821748
CLOUDINARY_API_SECRET=jb23YSIikpzNLqI_PEQLtcHhaJ0
JWT_SECRET=super-secret-key-change-me
```

---

## 🎨 Tech Stack

**Frontend:** Next.js 15, Tailwind CSS, Axios  
**Backend:** NestJS, Prisma, JWT, Passport  
**Database:** PostgreSQL (Docker)  
**Storage:** Cloudinary  
**Monorepo:** Turborepo  

---

## 📝 What's Next?

1. **Invoice PDF Generation** - Export quotes/invoices as PDF
2. **Client Portal View** - Read-only dashboard for clients
3. **Email Notifications** - Alert clients on status changes
4. **Business Branding** - Custom logos and colors
5. **Subscription System** - Manual payment verification
6. **Production Deploy** - Docker compose for full stack

---

## 🐛 Common Issues

**Port already in use?**
```bash
lsof -ti:3001 | xargs kill -9  # Kill backend
lsof -ti:3000 | xargs kill -9  # Kill frontend
```

**Database not connecting?**
```bash
docker-compose down
docker-compose up -d
npx prisma migrate dev
```

**Frontend can't reach API?**
- Check `apps/client-portal/src/lib/api.ts` has `baseURL: 'http://localhost:3001'`
- Verify CORS is enabled in `apps/api/src/main.ts`
