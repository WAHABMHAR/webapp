# 🆓 Deploy Without Credit Card - Quick Guide

## ✅ Best Option: Cyclic.sh (Backend) + Vercel (Frontend)

**Both are 100% FREE and require NO CREDIT CARD!**

---

## 📦 Step 1: Deploy Backend on Cyclic.sh

### 1.1 Sign Up
1. Go to **[Cyclic.sh](https://cyclic.sh)**
2. Click "Get Started" → Sign up with GitHub
3. **No credit card needed!**

### 1.2 Connect Repository
1. Click "Deploy Now"
2. Authorize GitHub access
3. Select your `project-one` repository

### 1.3 Configure Backend
1. **App Name**: `project-one-backend` (or your choice)
2. **Root Directory**: `backend`
3. **Runtime**: Node.js (auto-detected)
4. **Branch**: `main` (or your default branch)

### 1.4 Add Environment Variables
Click "Environment Variables" and add:

```
NODE_ENV=production
LOCAL_PORT=3000
LOCAL_MONGO_URL=mongodb+srv://username:password@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-minimum-32-characters
JWT_EXPIRATION=24h
MY_EMAIL=your-email@gmail.com
MY_PASSWORD=your-gmail-app-password
FRONTEND_URL=https://your-frontend.vercel.app
BASE_URL=https://your-app-name.cyclic.app
```

**Important**: Replace:
- `LOCAL_MONGO_URL` with your MongoDB Atlas connection string
- `JWT_SECRET` with a random 32+ character string
- `MY_EMAIL` and `MY_PASSWORD` with your Gmail credentials
- `FRONTEND_URL` will be updated after Step 2

### 1.5 Deploy
- Cyclic automatically detects your build process
- It will run: `npm install && npm run build && npm start`
- Wait 2-3 minutes for deployment
- Your backend URL: `https://your-app-name.cyclic.app`

---

## 🎨 Step 2: Deploy Frontend on Vercel

### 2.1 Sign Up
1. Go to **[Vercel.com](https://vercel.com)**
2. Click "Sign Up" → Sign up with GitHub
3. **No credit card needed!**

### 2.2 Import Project
1. Click "Add New Project"
2. Import your `project-one` repository
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `admin`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

### 2.3 Add Environment Variables
Click "Environment Variables" and add:

```
VITE_API_BASE_URL=https://your-app-name.cyclic.app/api/
```

**Replace** `your-app-name` with your actual Cyclic app name from Step 1.5

### 2.4 Deploy
- Click "Deploy"
- Wait 1-2 minutes
- Your frontend URL: `https://your-app-name.vercel.app`

### 2.5 Update Backend Environment
Go back to Cyclic.sh and update:
```
FRONTEND_URL=https://your-app-name.vercel.app
```

---

## ✅ Step 3: Test Your Deployment

1. **Test Backend**: 
   - Visit: `https://your-app-name.cyclic.app/api/health`
   - Should see: `{"message":"Server is healthy","status":"ok"}`

2. **Test Frontend**:
   - Visit: `https://your-app-name.vercel.app`
   - Should load your admin panel

3. **Test Full Flow**:
   - Try logging in/registering
   - Check if API calls work

---

## 🔧 Step 4: Update CORS (If Needed)

If you get CORS errors, update `backend/src/index.ts`:

```typescript
app.use(cors({
    origin: [
        "https://your-app-name.vercel.app",
        "http://localhost:5173", // For local dev
    ],
    credentials: true
}));
```

---

## 🎉 Done!

Your app is now live:
- **Frontend**: `https://your-app-name.vercel.app`
- **Backend**: `https://your-app-name.cyclic.app/api/`

Both are **100% FREE** and **NO CREDIT CARD** required!

---

## 📝 Quick Checklist

- [ ] MongoDB Atlas setup (free)
- [ ] Backend deployed on Cyclic.sh
- [ ] Frontend deployed on Vercel
- [ ] Environment variables set
- [ ] Backend health check works
- [ ] Frontend loads correctly
- [ ] CORS configured (if needed)

---

## 🆘 Troubleshooting

### Backend won't start?
- Check Cyclic logs in dashboard
- Verify all environment variables are set
- Ensure MongoDB connection string is correct

### Frontend can't connect to backend?
- Check `VITE_API_BASE_URL` in Vercel
- Verify backend URL is correct
- Check CORS settings in backend

### Database connection fails?
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0`)
- Verify connection string password
- Check database user permissions

---

**Need help? Check the full `DEPLOYMENT_GUIDE.md` for more details!**

