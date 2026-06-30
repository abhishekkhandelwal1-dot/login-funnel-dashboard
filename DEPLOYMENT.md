# Deployment Guide - Login Funnel Dashboard

## 📦 Project Created Successfully! ✅

Your live login funnel dashboard is ready to deploy to Vercel.

**Location:** `/Users/a42970/login-funnel-dashboard`

---

## 🚀 Quick Start (2 minutes)

### 1. Install & Test Locally

```bash
cd /Users/a42970/login-funnel-dashboard
npm install
npm run dev
```

Visit `http://localhost:5173` - You should see the dashboard with mock data.

### 2. Deploy to Vercel (One Command)

```bash
npm install -g vercel
vercel
```

Follow the interactive prompts:
- Connect GitHub account
- Select framework: **Vite**
- Build command: `npm run build`
- Output directory: `dist`
- Deploy!

Your live dashboard URL will be displayed. 🎉

---

## 📋 What's Included

### Frontend Components
✅ **FunnelVisualization.jsx** - Interactive funnel chart with Recharts  
✅ **MetricsCard.jsx** - Key metrics display (success rate, conversions, etc.)  
✅ **EventsTable.jsx** - Detailed events breakdown table  
✅ **App.jsx** - Main dashboard with auto-refresh (1 min interval)  

### Backend API
✅ **api/funnel.js** - Vercel serverless function (returns mock data)  
✅ **api/embrace-integration.js** - Real Embrace API integration example  
✅ **src/api/embrace.js** - Frontend API client  

### Configuration
✅ **vite.config.js** - Vite build configuration  
✅ **tailwind.config.js** - Tailwind CSS theming  
✅ **vercel.json** - Vercel deployment config  
✅ **package.json** - Dependencies (React, Recharts, TailwindCSS)  

### Documentation
✅ **README.md** - Complete feature documentation  
✅ **SETUP.md** - Detailed setup instructions  
✅ **DEPLOYMENT.md** - This file  

---

## 🔌 Connecting Real Embrace Data

### Option 1: Use Mock Data (Fastest)

The dashboard works immediately with mock data showing:
- 12 users through login funnel
- 276 total events
- 58.3% success rate
- 5-step login process visualization

Perfect for testing UI and deployment.

### Option 2: Connect Real Data (Requires API Key)

1. **Get Embrace API credentials:**
   - Login to [app.embrace.io](https://app.embrace.io)
   - Settings → API Keys
   - Copy API Key and Organization ID

2. **Update api/funnel.js:**

```javascript
import { getCombinedFunnelData } from './embrace-integration.js'

export default async function handler(req, res) {
  try {
    const data = await getCombinedFunnelData()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

3. **Set environment variables in Vercel:**
   - Go to Vercel dashboard → Your Project → Settings → Environment Variables
   - Add:
     ```
     EMBRACE_API_KEY=your_key_here
     EMBRACE_ORG_ID=your_org_id
     VITE_IOS_APP_ID=cPBea
     VITE_ANDROID_APP_ID=hNH8N
     ```

4. **Redeploy:**
```bash
vercel --prod
```

---

## 📊 Dashboard Features

### Live Updates
- Auto-refreshes every 60 seconds (configurable)
- Manual refresh button
- Last update timestamp
- Pause/Resume auto-refresh

### Metrics Display
- 👥 Total Users
- 📊 Total Events
- ✅ Success Rate
- 📈 Conversion Rate

### Visualizations
- 📈 Funnel flow chart (visual bars showing user progression)
- 📊 Bar chart (user count by event)
- 📋 Events table (detailed breakdown)

### Performance
- ⚡ Built with Vite (fast HMR)
- 🎨 Tailwind CSS (optimized styling)
- 📦 Recharts (lightweight charts)
- 🚀 Deployed on Vercel (CDN + edge functions)

---

## 🛠️ Customization

### Change Refresh Interval

Edit `src/App.jsx` line 32:
```javascript
const interval = setInterval(() => {
  loadData()
}, 30000) // Every 30 seconds instead of 60
```

### Add More Metrics

Update `src/App.jsx` metrics grid (lines 75-86):
```javascript
<MetricsCard
  title="Abandonment Rate"
  value={`${funnelData.metrics.abandonmentRate.toFixed(1)}%`}
  icon="❌"
/>
```

### Change Color Scheme

Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#FF6B6B',    // Your brand color
  success: '#51CF66',
  warning: '#FFD93D',
  danger: '#FF6B6B',
}
```

### Add More Apps

In `api/funnel.js`, add app IDs:
```javascript
const apps = [
  'cPBea',    // AUS Consumer iOS
  'hNH8N',    // AUS Consumer Android
  'new_app'   // Add here
]
```

---

## 🔒 Security Checklist

Before deploying to production:

✅ **Environment Variables**
- Never commit `.env` files
- Use Vercel Environment Variables for secrets
- Rotate API keys regularly

✅ **API Security**
- Validate all API requests
- Use CORS policies appropriately
- Add rate limiting if needed

✅ **Data Protection**
- User data is read-only (no modifications)
- No sensitive data in client-side logs
- Encrypt API keys in transit

✅ **Access Control**
- Optional: Add authentication to dashboard
- Log access attempts
- Monitor for suspicious activity

---

## 📈 Monitoring & Analytics

### Vercel Analytics
Vercel automatically provides:
- Build times & deployment history
- Runtime logs
- Function invocations
- Error tracking

Access via: Vercel Dashboard → Your Project → Analytics

### Application Monitoring
Add your own monitoring:
```javascript
// In App.jsx
useEffect(() => {
  console.log('Dashboard loaded', { timestamp: new Date() })
  // Send to your monitoring service
}, [])
```

---

## 🐛 Common Issues & Solutions

### Issue: "Cannot GET /api/funnel"
**Solution:** 
- Ensure `api/funnel.js` is in the root directory
- Rebuild and redeploy: `vercel --prod`
- Check Vercel function logs

### Issue: No data appears on dashboard
**Solution:**
- Check browser console (F12) for errors
- Verify API endpoint is accessible
- Check environment variables are set
- Ensure `api/funnel.js` returns correct data format

### Issue: Dashboard loads slowly
**Solution:**
- Increase refresh interval (see customization)
- Optimize API response time
- Check network tab in DevTools
- Review Vercel function duration logs

### Issue: Vercel build fails
**Solution:**
```bash
# Test build locally first
npm run build

# Check for errors
npm run dev

# If still failing, try:
rm -rf .vercel dist node_modules
npm install
npm run build
```

---

## 📱 Mobile Responsiveness

The dashboard is fully responsive:
- ✅ Mobile (< 640px)
- ✅ Tablet (640px - 1024px)
- ✅ Desktop (> 1024px)

Test on mobile:
```bash
npm run dev
# Visit http://your-local-ip:5173 from your phone
```

---

## 🔄 CI/CD Integration

### GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:
```yaml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci && npm run build
      - run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

---

## 📞 Support & Resources

### Documentation
- [Embrace API Docs](https://embrace.io/docs/api)
- [React Docs](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [Recharts](https://recharts.org)
- [Vercel Docs](https://vercel.com/docs)

### Getting Help
1. Check the README.md for detailed feature docs
2. Review SETUP.md for configuration help
3. Check Vercel deployment logs for errors
4. Inspect browser console (F12) for JavaScript errors

---

## ✨ Next Steps

1. **Install & Test**
   ```bash
   npm install
   npm run dev
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Share Dashboard**
   - Get your Vercel URL
   - Share with team
   - Monitor live funnel data

4. **Integrate Real Data** (Optional)
   - Set up Embrace API credentials
   - Update `api/funnel.js`
   - Redeploy with real data

---

## 🎉 Congratulations!

Your live login funnel dashboard is ready to go!

**Features:**
- ✅ Real-time updates
- ✅ Beautiful visualizations  
- ✅ Production-ready on Vercel
- ✅ Fully customizable
- ✅ Mock data included for instant testing
- ✅ Easy integration with real Embrace API

Get started: `npm install && npm run dev`

Deploy: `vercel`

Enjoy! 🚀
