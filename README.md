# Login Funnel Dashboard - Live

A real-time login funnel analytics dashboard built with React, Vite, and Embrace Analytics API.

## Features

✨ **Live Updates** - Auto-refreshing dashboard that updates every minute  
📊 **Visual Funnel** - Interactive funnel visualization with bar charts  
📈 **Real-time Metrics** - Track success rates, conversions, and user counts  
🎨 **Modern UI** - Dark theme dashboard with Tailwind CSS  
⚡ **Fast Performance** - Built with Vite for lightning-fast builds  
🚀 **Vercel Ready** - Deploy to Vercel with one command  

## Setup

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager
- Embrace Analytics account with API access

### Local Development

1. **Install dependencies:**
```bash
cd login-funnel-dashboard
npm install
```

2. **Create environment variables:**
Create a `.env.local` file:
```
VITE_API_URL=http://localhost:3000
```

3. **Start development server:**
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### API Configuration

The dashboard fetches data from `/api/funnel` endpoint. To connect real Embrace data:

1. Update `api/funnel.js` with your Embrace API credentials
2. Replace the mock data with actual API calls to Embrace MCP tools
3. Example implementation:

```javascript
// In api/funnel.js
import { fetchLoginEvents } from '../src/api/embrace'

export default async function handler(req, res) {
  try {
    const data = await fetchLoginEvents({
      appIds: ['cPBea', 'hNH8N'],
      timeWindow: 'last_7_days'
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
```

## Deployment to Vercel

### Option 1: Using Vercel CLI

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
npm run deploy
```

3. Follow the prompts to set up your Vercel project

### Option 2: GitHub Integration

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/login-funnel-dashboard
git push -u origin main
```

2. Go to [Vercel Dashboard](https://vercel.com)
3. Click "New Project" → Import GitHub repo
4. Configure environment variables
5. Deploy

### Environment Variables on Vercel

Add these in Vercel project settings:
- `VITE_API_URL` - Your API endpoint
- `EMBRACE_API_KEY` - Your Embrace API key (if needed)
- `EMBRACE_ORG_ID` - Your Embrace organization ID

## Building for Production

```bash
npm run build
```

This creates optimized production build in the `dist/` folder.

## Project Structure

```
login-funnel-dashboard/
├── src/
│   ├── components/
│   │   ├── FunnelVisualization.jsx
│   │   ├── MetricsCard.jsx
│   │   └── EventsTable.jsx
│   ├── api/
│   │   └── embrace.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── api/
│   └── funnel.js              (Vercel serverless function)
├── public/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── vercel.json
└── package.json
```

## Data Format

The `/api/funnel` endpoint should return data in this format:

```json
{
  "funnel": [
    {
      "name": "Login Initiated",
      "description": "Users started login",
      "users": 12,
      "conversion": 100
    },
    // ... more funnel steps
  ],
  "events": [
    {
      "name": "Login Event",
      "message": "login_actions",
      "count": 178,
      "users": 12,
      "conversion": 100,
      "type": "success"
    },
    // ... more events
  ],
  "metrics": {
    "totalUsers": 12,
    "totalEvents": 276,
    "successRate": 58.3,
    "conversionRate": 41.7,
    "timeRange": "Last 7 days"
  },
  "timestamp": "2026-06-30T10:00:00Z"
}
```

## Customization

### Update Refresh Interval

Edit `src/App.jsx` line 32:
```javascript
const interval = setInterval(() => {
  loadData()
}, 60000) // Change to desired milliseconds
```

### Change Colors

Update color values in `tailwind.config.js`:
```javascript
colors: {
  primary: '#3B82F6',
  success: '#10B981',
  // ...
}
```

### Modify Dashboard Layout

Edit components in `src/components/` to change layout and styling.

## Troubleshooting

**"No data available" message:**
- Check API endpoint is running
- Verify environment variables are set
- Check browser console for errors

**Build fails:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

**Port already in use:**
```bash
npm run dev -- --port 3000
```

## Support

For issues or questions:
1. Check the [Embrace API documentation](https://embrace.io/docs)
2. Review Vite [setup guide](https://vitejs.dev/guide/)
3. Check Vercel [deployment docs](https://vercel.com/docs)

## License

MIT - Feel free to use this project for your analytics needs!
