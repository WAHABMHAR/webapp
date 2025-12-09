# 🚀 Free Deployment Guide for Project-One

This guide will help you deploy your monorepo (Admin + Backend + Mobile) **completely FREE**.

---

## 📋 Prerequisites

1. **GitHub Account** (free)
2. **MongoDB Atlas Account** (free tier: 512MB)
3. Choose your hosting:
   - **Option A**: Render.com (Easiest, requires card for verification)
   - **Option B**: Railway.app (Alternative, may require card)
   - **Option C**: Vercel (Frontend) + Fly.io (Backend) - **NO CARD NEEDED**
   - **Option D**: Cyclic.sh + Vercel - **100% FREE, NO CARD** ⭐ Recommended if you don't want to use card

---

## 🗄️ Step 1: Setup MongoDB Atlas (Free)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account (M0 Free Tier)
3. Create a cluster (Free tier)
4. Create database user (remember credentials)
5. Add your IP to Network Access (or `0.0.0.0/0` for testing)
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy connection string: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/dbname?retryWrites=true&w=majority`
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with your database name

---

## ⚠️ Important: About Credit Cards

**Render.com requires a credit card for verification**, even for free tier. However:
- ✅ **No charges** on free tier (750 hours/month free)
- ✅ Only charged if you upgrade to paid plans
- ✅ $1 authorization hold (released immediately) for verification

**If you prefer NO credit card**, see **Option D** below (100% free, no card needed).

---

## 🎯 Option A: Deploy on Render.com (Requires Card for Verification)

### Step 2A: Prepare for Deployment

#### 2A.1: Update Backend for Production

Your backend is already configured! Just ensure these environment variables are set:

```env
NODE_ENV=production
LOCAL_PORT=3000
LOCAL_MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=your-super-secret-jwt-key-min-32-chars
JWT_EXPIRATION=24h
MY_EMAIL=your-email@gmail.com
MY_PASSWORD=your-app-password
FRONTEND_URL=https://your-app.onrender.com
BASE_URL=https://your-app.onrender.com
```

#### 2A.2: Build Script for Root

Update your root `package.json`:

```json
{
  "scripts": {
    "build": "npm install --prefix admin && npm install --prefix backend && npm run build --prefix admin && npm run build --prefix backend",
    "start": "npm run start --prefix backend"
  }
}
```

#### 2A.3: Create Render Configuration (Optional)

Create `render.yaml` in root:

```yaml
services:
  - type: web
    name: project-one
    env: node
    buildCommand: npm run build
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: LOCAL_PORT
        value: 3000
```

### Step 2B: Deploy on Render

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Create Render Account**:
   - Go to [Render.com](https://render.com)
   - Sign up with GitHub

3. **Create Web Service**:
   - Click "New" → "Web Service"
   - Connect your GitHub repo
   - Settings:
     - **Name**: `project-one` (or your choice)
     - **Root Directory**: Leave blank (root)
     - **Environment**: `Node`
     - **Build Command**: `npm run build`
     - **Start Command**: `npm start`
     - **Plan**: **Free** (or Starter for better performance)

4. **Add Environment Variables**:
   - Click "Environment" tab
   - Add all variables from Step 2A.1
   - **Important**: Use your MongoDB Atlas connection string

5. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Wait 5-10 minutes for first deployment
   - Your app will be live at: `https://your-app-name.onrender.com`

---

## 🆓 Option D: 100% FREE - No Credit Card Required! ⭐

### Deploy Backend on Cyclic.sh (Free, No Card)

1. **Go to [Cyclic.sh](https://cyclic.sh)**
   - Sign up with GitHub (free)
   - **No credit card required!**

2. **Create New App**:
   - Click "Deploy Now"
   - Connect your GitHub repo
   - Select your repo

3. **Configure Backend**:
   - **Root Directory**: `backend`
   - **Runtime**: Node.js
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

4. **Add Environment Variables** (in Cyclic dashboard):
   ```
   NODE_ENV=production
   LOCAL_PORT=3000
   LOCAL_MONGO_URL=mongodb+srv://...
   JWT_SECRET=your-secret-key
   JWT_EXPIRATION=24h
   MY_EMAIL=your-email@gmail.com
   MY_PASSWORD=your-app-password
   FRONTEND_URL=https://your-frontend.vercel.app
   BASE_URL=https://your-backend.cyclic.app
   ```

5. **Deploy**:
   - Cyclic auto-deploys on git push
   - Your backend URL: `https://your-app.cyclic.app`

**Cyclic Free Tier:**
- ✅ No credit card needed
- ✅ Always on (no sleep)
- ✅ Unlimited requests
- ✅ Free SSL

### Deploy Frontend on Vercel (Free, No Card)

1. **Go to [Vercel.com](https://vercel.com)**
   - Sign up with GitHub (free)
   - **No credit card required!**

2. **Create New Project**:
   - Import your GitHub repo
   - **Root Directory**: `admin`
   - **Framework Preset**: Vite

3. **Add Environment Variables**:
   ```
   VITE_API_BASE_URL=https://your-backend.cyclic.app/api/
   ```

4. **Deploy**:
   - Vercel auto-deploys
   - Your frontend URL: `https://your-app.vercel.app`

**Vercel Free Tier:**
- ✅ No credit card needed
- ✅ Always on
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month

---

## 🌐 Alternative: Deploy Frontend & Backend Separately

### Option C: Vercel (Frontend) + Fly.io (Backend) - No Card Needed

#### Deploy Backend on Fly.io:

1. **Install Fly CLI**:
   ```bash
   powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
   ```

2. **Sign up**: `flyctl auth signup` (free, no card for hobby plan)

3. **Create `fly.toml`** in `backend/`:
   ```toml
   app = "your-app-name"
   primary_region = "iad"

   [build]
     builder = "paketobuildpacks/builder:base"

   [http_service]
     internal_port = 3000
     force_https = true
     auto_stop_machines = false
     auto_start_machines = true
     min_machines_running = 0
     processes = ["app"]

     [[http_service.checks]]
       interval = "10s"
       timeout = "2s"
       grace_period = "5s"
       method = "GET"
       path = "/api/health"
   ```

4. **Deploy**:
   ```bash
   cd backend
   flyctl launch
   flyctl secrets set LOCAL_MONGO_URL="mongodb+srv://..."
   flyctl secrets set JWT_SECRET="your-secret"
   # Add all other env vars
   flyctl deploy
   ```

**Fly.io Free Tier:**
- ✅ 3 shared-cpu VMs
- ✅ 3GB persistent volume
- ✅ 160GB outbound data transfer
- ✅ No credit card for hobby plan

#### Deploy Frontend on Vercel:
(Follow steps from Option D above)

---

### Option B: Vercel (Frontend) + Render (Backend) - Requires Card

#### Deploy Backend on Render:

1. Follow Step 2B above, but:
   - **Root Directory**: `backend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Plan**: Free

2. Note your backend URL: `https://your-backend.onrender.com`

#### Deploy Frontend on Vercel:

1. **Build Admin Panel**:
   ```bash
   cd admin
   npm run build
   ```

2. **Create `vercel.json`** in `admin/` folder:
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "devCommand": "npm run dev",
     "installCommand": "npm install",
     "framework": "vite",
     "rewrites": [
       {
         "source": "/(.*)",
         "destination": "/index.html"
       }
     ]
   }
   ```

3. **Update Admin Environment**:
   - Create `.env.production` in `admin/`:
   ```env
   VITE_API_BASE_URL=https://your-backend.onrender.com/api/
   ```

4. **Deploy on Vercel**:
   - Go to [Vercel.com](https://vercel.com)
   - Sign up with GitHub
   - "Add New Project" → Import your repo
   - **Root Directory**: `admin`
   - **Framework Preset**: Vite
   - Add environment variable:
     - `VITE_API_BASE_URL`: `https://your-backend.onrender.com/api/`
   - Deploy!

---

## 📱 Mobile App Deployment (Expo)

### Step 3: Deploy Mobile App

1. **Install EAS CLI**:
   ```bash
   npm install -g eas-cli
   ```

2. **Configure Expo**:
   ```bash
   cd mobile
   eas build:configure
   ```

3. **Update API URL**:
   - Create `mobile/.env`:
   ```env
   EXPO_PUBLIC_API_URL=https://your-backend.onrender.com/api/
   ```

4. **Build & Deploy**:
   ```bash
   # For Android
   eas build -p android --profile preview
   
   # For iOS (requires Apple Developer account - $99/year)
   eas build -p ios --profile preview
   ```

5. **Submit to Stores** (Optional):
   ```bash
   eas submit -p android
   eas submit -p ios
   ```

---

## 🔧 Important Configuration Updates

### Update CORS in Backend

Make sure your backend `index.ts` has proper CORS:

```typescript
app.use(cors({
    origin: [
        "https://your-frontend.vercel.app",
        "https://your-app.onrender.com",
        "http://localhost:5173", // For local dev
    ],
    credentials: true
}));
```

### Update Frontend API Base URL

In `admin/src/redux/api/baseApi.ts`, ensure:

```typescript
export const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/';
```

---

## 📝 Environment Variables Checklist

### Backend (.env on Render):
```
NODE_ENV=production
LOCAL_PORT=3000
LOCAL_MONGO_URL=mongodb+srv://...
JWT_SECRET=your-32-char-secret-key
JWT_EXPIRATION=24h
MY_EMAIL=your-email@gmail.com
MY_PASSWORD=your-gmail-app-password
FRONTEND_URL=https://your-app.onrender.com
BASE_URL=https://your-app.onrender.com
```

### Frontend (.env.production on Vercel or Render):
```
VITE_API_BASE_URL=https://your-backend.onrender.com/api/
```

---

## 🆓 Free Tier Limits Comparison

### Cyclic.sh (Backend - Recommended for No Card):
- ✅ **No credit card required**
- ✅ Always on (no sleep)
- ✅ Unlimited requests
- ✅ Free SSL
- ✅ Auto-scaling

### Fly.io (Backend - Alternative):
- ✅ **No credit card for hobby plan**
- ✅ 3 shared-cpu VMs
- ✅ 160GB outbound data/month
- ✅ Always on

### Render.com (Backend):
- ⚠️ **Requires credit card** (verification only)
- ✅ 750 hours/month (enough for 24/7)
- ✅ 512MB RAM
- ⚠️ Sleeps after 15min inactivity (Free tier)
- ✅ Auto-wakes on request (may take 30-60s)

### Vercel (Frontend):
- ✅ **No credit card required**
- ✅ Unlimited deployments
- ✅ 100GB bandwidth/month
- ✅ No sleep (always on)

### MongoDB Atlas:
- ✅ **No credit card required**
- ✅ 512MB storage
- ✅ Shared RAM
- ✅ Suitable for small-medium apps

---

## 🚨 Common Issues & Solutions

### Issue 1: App Sleeping (Render Free Tier)
**Solution**: Use a ping service like [UptimeRobot](https://uptimerobot.com) (free) to ping your app every 5 minutes.

### Issue 2: CORS Errors
**Solution**: Update CORS origin in backend to include your frontend URL.

### Issue 3: Database Connection Fails
**Solution**: 
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for all)
- Verify connection string has correct password
- Check database user permissions

### Issue 4: Build Fails
**Solution**:
- Check Node version (use Node 18 or 20)
- Verify all dependencies are in package.json
- Check build logs for specific errors

---

## 🎉 Post-Deployment Checklist

- [ ] Test API endpoints: `https://your-app.onrender.com/api/health`
- [ ] Test frontend loads correctly
- [ ] Test authentication flow
- [ ] Update mobile app API URL
- [ ] Set up domain (optional - requires paid plan)
- [ ] Configure custom domain SSL (automatic on Render/Vercel)

---

## 💡 Pro Tips

1. **Use Render Pro** ($7/month) for:
   - No sleep (always on)
   - Better performance
   - Custom domains

2. **Add Health Check**:
   - Your `/api/health` endpoint works!
   - Set up monitoring with UptimeRobot

3. **Environment Variables**:
   - Never commit `.env` files
   - Use Render/Vercel environment variable UI

4. **Logs**:
   - Monitor logs in Render/Vercel dashboard
   - Use `console.log` for debugging

---

## 📚 Additional Resources

- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [MongoDB Atlas Docs](https://docs.atlas.mongodb.com)
- [Expo EAS Docs](https://docs.expo.dev/build/introduction/)

---

**Your app should now be live! 🎊**

If you encounter any issues, check the deployment logs in your hosting platform's dashboard.

