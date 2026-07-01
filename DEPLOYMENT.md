# Deployment Guide

This guide provides step-by-step instructions for deploying the Login Events & Funnel Analytics Dashboard to Vercel.

## Prerequisites

- Git repository initialized and pushed to GitHub
- Vercel account (free tier available at https://vercel.com)
- Embrace API credentials ready

## Option 1: Deploy via Vercel Dashboard (Recommended)

### Step 1: Push to GitHub

```bash
# Initialize git (if not already done)
git init
git add .
git commit -m "Initial commit: Login Funnel Dashboard"

# Add remote and push
git remote add origin <your-github-repo-url>
git branch -M main
git push -u origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your GitHub repository
4. Click "Import"

### Step 3: Configure Environment Variables

1. In the Vercel project settings, go to **Environment Variables**
2. Add the following variables:
   - **Name**: `EMBRACE_API_KEY` → **Value**: Your Embrace API key
   - **Name**: `EMBRACE_ORG_ID` → **Value**: Your Embrace organization ID

3. Make sure both variables are set for all environments (Production, Preview, Development)

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete
3. Your dashboard is now live!

**Your dashboard URL**: `https://<project-name>.vercel.app`

## Option 2: Deploy via Vercel CLI

### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

### Step 2: Authenticate

```bash
vercel login
```

### Step 3: Deploy

```bash
# First deploy (creates new project)
vercel

# Then set environment variables interactively or via dashboard

# Production deploy
vercel --prod
```

## Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `EMBRACE_API_KEY` | Embrace API authentication key | `abc123xyz...` |
| `EMBRACE_ORG_ID` | Embrace organization ID | `org_12345` |

### How to Get Credentials

1. **Embrace API Key**
   - Log in to your Embrace dashboard
   - Go to Settings → API Keys
   - Create a new API key or use existing one

2. **Organization ID**
   - Log in to your Embrace dashboard
   - Go to Settings → Organization
   - Copy your Organization ID

## Build Configuration

The project uses the following configuration (defined in `vercel.json`):

```json
{
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "outputDirectory": "dist",
  "framework": "vite"
}
```

## Verify Deployment

1. Navigate to your Vercel dashboard
2. Select the project
3. Check the latest deployment status
4. Click the deployment URL to test the dashboard

### Test the Dashboard

After deployment:
1. Open the dashboard URL
2. Click the "Refresh" button
3. Verify that data loads from your Embrace API
4. Test app switching (iOS/Android)
5. Test time period selection
6. Test search in the events table

## Troubleshooting

### Build Fails

**Issue**: `npm: not found` or build fails during dependency installation

**Solution**:
- Check `package.json` has correct dependencies
- Ensure Node.js version is compatible (16+)
- Clear cache: `vercel env pull` then redeploy

### API Returns 500 Error

**Issue**: Dashboard shows "Error: Request failed with status code 500"

**Solution**:
- Verify `EMBRACE_API_KEY` and `EMBRACE_ORG_ID` are set correctly
- Check Embrace API documentation for endpoint format
- Review Vercel function logs: Dashboard → Deployments → Function logs

**To view logs**:
1. Go to Vercel Dashboard
2. Select your project
3. Go to "Functions" tab
4. Click on `login-events` function
5. Review the logs

### Environment Variables Not Loaded

**Issue**: Function shows error about missing env variables

**Solution**:
1. Ensure variables are set in Vercel dashboard (not just in `.env` file)
2. Redeploy after adding variables: `vercel --prod`
3. Check that variables are set for "Production" environment

### CORS Errors

**Issue**: "CORS policy: No 'Access-Control-Allow-Origin' header"

**Solution**:
- The CORS headers are already configured in `api/login-events.js`
- If errors persist, check Embrace API CORS settings
- May need to whitelist your Vercel domain in Embrace settings

## Monitoring & Maintenance

### Analytics

1. Go to Vercel Dashboard
2. Select your project
3. View "Analytics" tab for:
   - Page load times
   - Web vitals
   - Error rates

### Logs

View real-time logs:
```bash
vercel logs <project-name> --follow
```

View function logs:
```bash
vercel logs <project-name> --follow --function=login-events
```

## Database & Persistence

This dashboard doesn't use a database—it fetches data directly from Embrace API on demand. The "manual refresh" pattern means:
- No data is cached server-side
- Each refresh fetches fresh data from Embrace
- No user data is stored

## Custom Domain

To use a custom domain:

1. Go to Vercel Dashboard → Project Settings → Domains
2. Click "Add"
3. Enter your domain
4. Follow DNS configuration instructions for your domain registrar

## CI/CD

Vercel automatically:
- Deploys on `git push` to main
- Creates preview deployments for pull requests
- Runs your build and test commands

## Rollback

To rollback to a previous deployment:

1. Go to Vercel Dashboard → Deployments
2. Find the deployment you want to rollback to
3. Click the three dots menu
4. Select "Promote to Production"

## Performance Optimization

Current optimizations:
- Vite bundling with code splitting
- Tailwind CSS with purge enabled
- React 18 with Suspense-ready components
- Gzip compression (handled by Vercel)

To further optimize:
- Enable Image Optimization if adding images
- Use Vercel's built-in CDN (automatic)

## Updating the Dashboard

To update after deployment:

1. Make changes locally
2. Test with `npm run dev`
3. Build: `npm run build`
4. Commit and push: `git push origin main`
5. Vercel automatically redeploys

## Removing Sensitive Data

Before committing:
- Ensure `.env` file is in `.gitignore` ✓
- Don't commit API keys ✓
- Use Vercel environment variables instead ✓

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Embrace API Docs**: https://embrace.io/docs/api
- **Vite Docs**: https://vitejs.dev
- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com

## Next Steps

After successful deployment:

1. ✅ Share the dashboard URL with your team
2. ✅ Set up monitoring alerts in Vercel
3. ✅ Document any custom Embrace API configurations
4. ✅ Plan regular updates and new features
5. ✅ Gather feedback from users

---

**Deployment completed!** 🎉 Your dashboard is now live and tracking login funnel metrics.
