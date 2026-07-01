# Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Local Development

```bash
# Install dependencies
npm install

# Start development environment
npm run dev-all

# Open browser to http://localhost:5175
```

### 2. Test the Dashboard

✅ Click **Refresh** to load data
✅ Switch between **iOS** and **Android** apps
✅ Select different **Time Period** options
✅ Scroll through the **Login Events** table
✅ See the complete **7-Step Funnel** visualization

### 3. Deploy to Vercel (5 minutes)

```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-repo-url>
git push -u origin main

# Deploy via https://vercel.com/new
# Add environment variables:
#   EMBRACE_API_KEY=<your-key>
#   EMBRACE_ORG_ID=<your-org-id>
```

## 📁 Project Commands

| Command | Purpose |
|---------|---------|
| `npm install` | Install dependencies |
| `npm run dev` | Start Vite dev server (port 5175) |
| `npm run dev-api` | Start mock API server (port 3001) |
| `npm run dev-all` | Start both servers together |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |

## 🎯 What You Have

✅ **Fully functional React dashboard**
- 7-step login funnel visualization
- Detailed events table with sorting
- Session context information
- Multi-app support (iOS/Android)
- Time period selection
- Manual data refresh

✅ **Production-ready code**
- Vite bundler configuration
- Tailwind CSS styling
- Axios HTTP client
- Error handling
- Loading states
- Responsive design

✅ **Deployment infrastructure**
- Vercel serverless function
- Environment variable setup
- Build configuration
- CORS handling

✅ **Documentation**
- README.md - Feature overview
- DEPLOYMENT.md - Step-by-step guide
- PROJECT_SUMMARY.md - Complete project details
- This file - Quick reference

## 🔑 Environment Variables

Create a `.env.local` file for local development:

```
EMBRACE_API_KEY=your_embrace_api_key_here
EMBRACE_ORG_ID=your_org_id_here
```

For Vercel, add these in Project Settings → Environment Variables.

## 📊 Dashboard Sections

### Header
- Title and description
- Last updated timestamp
- Manual refresh button
- App selector (iOS/Android)
- Time period dropdown

### Session Information (Yellow Box)
- Login method
- User identity and email
- GA instance ID
- Duration, status, event count

### Login Funnel
- 7-step visualization
- Progress bars showing user flow
- Per-step metrics and drop-off
- Summary statistics

### Events Table
- All login events listed
- Sortable columns
- Color-coded status
- Search filtering
- Summary totals

## 🌍 Deployment Checklist

- [ ] Add API credentials to environment variables
- [ ] Test locally: `npm run dev-all`
- [ ] Build for production: `npm run build`
- [ ] Push to GitHub
- [ ] Deploy via Vercel dashboard
- [ ] Verify dashboard loads
- [ ] Test app switcher
- [ ] Test refresh button
- [ ] Share URL with team

## 🆘 Common Issues

### "Cannot find module 'axios'"
```bash
npm install
```

### "Port 5175 already in use"
```bash
# Kill the process on that port
lsof -ti:5175 | xargs kill -9
npm run dev
```

### "API returns 500 error"
1. Check EMBRACE_API_KEY is set
2. Check EMBRACE_ORG_ID is correct
3. Verify Embrace API is accessible
4. Check Vercel function logs

### "Module not found errors"
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

## 📖 Documentation

- **README.md** - Features, setup, tech stack
- **DEPLOYMENT.md** - Vercel deployment guide
- **PROJECT_SUMMARY.md** - Complete project overview
- **QUICKSTART.md** - This file

## 🎨 Customization

### Change Colors
Edit `tailwind.config.js`:
```javascript
theme: {
  colors: {
    primary: '#3B82F6',  // Change primary color
    success: '#10B981',  // Change success color
    // ... etc
  }
}
```

### Change Funnel Steps
Edit `src/utils/dataProcessor.js`:
```javascript
export const FUNNEL_STEPS = [
  // Add, remove, or rename steps
  // Adjust event mappings
]
```

### Modify API Endpoint
Edit `api/login-events.js` or `dev-server.js` to change where data comes from.

## 🔐 Security Notes

✅ API keys stored in environment variables (not in code)
✅ `.env` file in `.gitignore` (not committed)
✅ CORS headers properly configured
✅ No sensitive data in URLs
✅ Data fetched fresh on each refresh

## 📞 Next Steps

1. **Test Locally**
   ```bash
   npm run dev-all
   ```

2. **Connect to Real Embrace Data**
   - Update `api/login-events.js` with production API call
   - Add your Embrace credentials

3. **Deploy to Vercel**
   - See DEPLOYMENT.md for detailed steps
   - Set environment variables
   - Monitor in Vercel dashboard

4. **Share with Team**
   - Copy Vercel deployment URL
   - Share dashboard with stakeholders

5. **Monitor & Improve**
   - Check Vercel analytics
   - Gather user feedback
   - Plan future features

## 📚 Resources

- **React**: https://react.dev
- **Vite**: https://vitejs.dev
- **Tailwind**: https://tailwindcss.com
- **Vercel**: https://vercel.com
- **Embrace API**: https://embrace.io/docs

## 🎉 You're All Set!

Your Login Events & Funnel Analytics Dashboard is ready to go. Start with local testing, then deploy to Vercel for team access.

**Questions?** Check the full documentation files or visit the resource links above.

---

Happy analyzing! 📊✨
