# Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### Step 1: Install Dependencies
```bash
cd /Users/a42970/login-funnel-dashboard
npm install
```

### Step 2: Configure Environment
```bash
cp .env.example .env.local
# Edit .env.local with your values
```

### Step 3: Start Development Server
```bash
npm run dev
```

Visit `http://localhost:5173` in your browser.

---

## 📊 Connecting Real Data from Embrace

### Option A: Using Mock Data (Quick Testing)

The dashboard comes with mock data enabled. You can test the UI immediately without API configuration.

### Option B: Connect Real Embrace API

1. **Get your Embrace credentials:**
   - Go to [Embrace Dashboard](https://app.embrace.io)
   - Navigate to Settings → API Keys
   - Copy your API Key and Organization ID

2. **Update environment variables:**
```bash
# In .env.local
EMBRACE_API_KEY=your_key_here
EMBRACE_ORG_ID=your_org_id_here
VITE_IOS_APP_ID=cPBea
VITE_ANDROID_APP_ID=hNH8N
```

3. **Update the API handler** (`api/funnel.js`):

```javascript
import axios from 'axios'

export default async function handler(req, res) {
  try {
    const apiKey = process.env.EMBRACE_API_KEY
    const orgId = process.env.EMBRACE_ORG_ID
    const iosAppId = process.env.VITE_IOS_APP_ID
    const androidAppId = process.env.VITE_ANDROID_APP_ID

    // Fetch iOS logs
    const iosResponse = await axios.get(
      `https://api.embrace.io/v1/orgs/${orgId}/apps/${iosAppId}/logs`,
      {
        headers: { 'Authorization': `Bearer ${apiKey}` },
        params: {
          messageFilter: 'login',
          timeWindow: 'last_7_days',
          limit: 50
        }
      }
    )

    // Process data and return formatted response
    const data = processEmbraceLogs(iosResponse.data)
    
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

function processEmbraceLogs(logs) {
  // Transform Embrace API response to dashboard format
  // See data format in README.md
  return {
    funnel: [...],
    events: [...],
    metrics: {...},
    timestamp: new Date().toISOString()
  }
}
```

---

## 🌐 Deploy to Vercel

### Prerequisites
- Vercel account (free at [vercel.com](https://vercel.com))
- Git repository (GitHub, GitLab, or Bitbucket)

### Deployment Steps

1. **Push to GitHub:**
```bash
git init
git add .
git commit -m "Initial commit: Login funnel dashboard"
git remote add origin https://github.com/your-username/login-funnel-dashboard
git push -u origin main
```

2. **Deploy to Vercel:**
```bash
npm i -g vercel
vercel
```

3. **Configure Vercel Project:**
   - Select framework: Vite
   - Root directory: ./
   - Build command: `npm run build`
   - Output directory: `dist`

4. **Set Environment Variables:**
   - Go to Vercel Dashboard → Your Project → Settings → Environment Variables
   - Add:
     - `EMBRACE_API_KEY`
     - `EMBRACE_ORG_ID`
     - `VITE_IOS_APP_ID`
     - `VITE_ANDROID_APP_ID`

5. **Redeploy:**
```bash
vercel --prod
```

Your dashboard is now live! 🎉

---

## 🔧 Advanced Configuration

### Change Refresh Interval

Edit `src/App.jsx`:
```javascript
const interval = setInterval(() => {
  loadData()
}, 30000) // Refresh every 30 seconds
```

### Add More Apps

Modify `api/funnel.js` to fetch from multiple app IDs:
```javascript
const apps = ['cPBea', 'hNH8N', 'other_app_id']
const allData = await Promise.all(
  apps.map(appId => fetchAppLogs(appId))
)
```

### Customize Dashboard Colors

Edit `tailwind.config.js`:
```javascript
theme: {
  extend: {
    colors: {
      primary: '#YOUR_COLOR',
      success: '#YOUR_COLOR',
      // ...
    }
  }
}
```

---

## 📱 Testing Locally

Start the dev server with hot reload:
```bash
npm run dev
```

Changes to files will auto-reload in the browser.

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'react'"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: Port 5173 already in use
```bash
npm run dev -- --port 3000
```

### Issue: API returns 401 error
- Check `EMBRACE_API_KEY` is valid
- Ensure API key has correct permissions
- Verify organization ID is correct

### Issue: Vercel build fails
1. Check build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Verify all environment variables are set

---

## 📚 Resources

- [Embrace API Docs](https://embrace.io/docs/api)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Vercel Deployment](https://vercel.com/docs)

---

## 💡 Tips

✅ Use `.env.local` for development (git ignored)  
✅ Test API locally before deploying to Vercel  
✅ Monitor Vercel build & runtime logs  
✅ Set up GitHub Actions for CI/CD  
✅ Use Vercel Analytics to track usage  

---

## 🆘 Need Help?

1. Check the README.md for detailed docs
2. Review console logs (F12) for errors
3. Check Vercel deployment logs
4. Verify API credentials are correct
