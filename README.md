# Login Events & Funnel Analytics Dashboard

A real-time login conversion tracking dashboard powered by Embrace. Track login events, visualize the complete login funnel, and analyze user progression through the authentication flow.

## Features

- **7-Step Login Funnel**: Visualize the complete login journey with detailed metrics
  - Login Screen Viewed
  - OTP/Credentials Entry
  - Verification Complete
  - Auth Request Sent
  - Authentication Success
  - Profile Setup
  - Session Complete

- **Detailed Event Table**: Browse all login events with sortable columns and advanced filtering
  - Time, Event Name, Category, Action/Label, Key Fields
  - Click-to-expand rows for more details
  - Real-time search across all event fields

- **Session Context**: View session metadata at a glance
  - Login method (Email OTP, Phone OTP, etc.)
  - User identity and email
  - GA Instance ID
  - Session duration and status

- **Multi-App Support**: Track login events across iOS and Android apps
- **Time Period Selection**: View data for custom time windows (1d, 3d, 7d, 14d, 30d)
- **Manual Refresh**: Control when data is fetched—no automatic polling
- **Summary Statistics**: Entry points, successful completions, and overall conversion rates

## Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Backend**: Node.js Express (development), Vercel Serverless Functions (production)
- **Data Source**: Embrace Logs API

## Setup & Installation

### Prerequisites
- Node.js 16+ and npm
- Embrace API Key
- Vercel account (for deployment)

### Local Development

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   # Add your Embrace API credentials
   ```

3. **Start development servers**
   ```bash
   # In one terminal
   npm run dev

   # In another terminal
   npm run dev-api
   ```

   Or run both simultaneously:
   ```bash
   npm run dev-all
   ```

4. **Open in browser**
   Navigate to http://localhost:5175

## API Integration

### Development

The dev server uses mock data for testing. To connect to real Embrace data:

1. Add your Embrace API key to `dev-server.js`
2. Implement the Embrace API call logic

### Production (Vercel)

The production deployment uses Vercel Serverless Functions (`api/login-events.js`).

**Environment Variables Required:**
- `EMBRACE_API_KEY` - Your Embrace API authentication key
- `EMBRACE_ORG_ID` - Your Embrace organization ID

## Project Structure

```
login-funnel-prototype/
├── src/
│   ├── components/
│   │   ├── Header.jsx              # Top header with filters
│   │   ├── SessionHeader.jsx       # Session context box
│   │   ├── LoginFunnel.jsx         # 7-step funnel visualization
│   │   └── LoginEventsTable.jsx    # Events table with sorting
│   ├── utils/
│   │   └── dataProcessor.js        # Data transformation utilities
│   ├── App.jsx                     # Main app component
│   ├── main.jsx                    # React entry point
│   └── index.css                   # Tailwind & custom styles
├── api/
│   └── login-events.js             # Vercel serverless function
├── public/
│   └── index.html                  # HTML template
├── vite.config.js                  # Vite configuration
├── tailwind.config.js              # Tailwind configuration
└── package.json                    # Dependencies & scripts
```

## Key Components

### Header.jsx
- Manual refresh button
- App selector (iOS/Android)
- Time period dropdown (1d, 3d, 7d, 14d, 30d)
- Last updated timestamp

### SessionHeader.jsx
- Yellow bordered box with session details
- Login method, user identity, GA instance
- Duration, status, event count, user count

### LoginFunnel.jsx
- 7-step visual funnel with progress bars
- Per-step metrics: conversion %, duration, event count, drop-off
- Summary section: Entry points, successful conversions, overall conversion rate

### LoginEventsTable.jsx
- Sortable columns (click header to sort)
- Color-coded status indicators with emojis
- Search filtering across all fields
- Footer with totals: Total Events, Unique Users, Success Rate

## Deployment

### Deploy to Vercel

1. **Connect your repository**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - Go to Project Settings → Environment Variables
   - Add `EMBRACE_API_KEY` and `EMBRACE_ORG_ID`

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Configure vercel.json

The `vercel.json` file is pre-configured with:
- Build command: `npm run build`
- Output directory: `dist`
- Framework: Vite
- Environment variables setup

## Data Processing

The `dataProcessor.js` utility handles:

- **processLoginEvents()** - Transform raw Embrace API response into dashboard format
- **mapEventToStage()** - Map events to funnel steps with color coding
- **getStatusEmoji()** - Return emoji based on event type
- **getStatusColor()** - Return Tailwind color class for event status
- **FUNNEL_STEPS** - Define the 7-step login flow

## Styling

The dashboard uses Tailwind CSS with custom colors:
- Primary: `#3B82F6` (Blue)
- Success: `#10B981` (Green)
- Warning: `#F59E0B` (Amber)
- Error: `#EF4444` (Red)

Custom animations:
- Spinner animation for loading state
- Skeleton loading effect
- Smooth transitions on hover

## API Response Format

The API expects a response in this format:

```json
{
  "success": true,
  "data": {
    "loginMethod": "EMAIL_OTP",
    "userName": "Abhishek",
    "userEmail": "user@example.com",
    "gaInstance": "INSTANCE_ID",
    "duration": "2 min 45 sec",
    "status": "✓ Success",
    "events": [
      {
        "timestamp": "2026-07-01T18:27:14Z",
        "message": "event_name",
        "type": "info|success|warning|error|profile",
        "category": "category_name",
        "actionLabel": "action_label",
        "keyFields": "key_fields",
        "count": 1,
        "unique_users": 1
      }
    ]
  }
}
```

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Notes

- Total bundle size: ~205 KB (gzipped: ~67 KB)
- Manual refresh only - no automatic polling
- Client-side data processing
- Efficient re-renders with React 18

## Future Enhancements

- Real-time data updates with WebSockets
- Custom date range picker
- Export data to CSV
- Advanced filtering and segmentation
- Comparison between time periods
- User cohort analysis

## Support

For issues or questions about:
- **Dashboard**: Check the component files in `src/components/`
- **Styling**: See `src/index.css` for custom styles
- **API**: Refer to `api/login-events.js` for integration details
- **Embrace Integration**: Visit https://embrace.io/docs

## License

MIT
