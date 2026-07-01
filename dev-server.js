import express from 'express'
import cors from 'cors'

const app = express()
const PORT = 3001

app.use(cors())
app.use(express.json())

const MOCK_LOGIN_EVENTS = {
  success: true,
  data: {
    loginMethod: 'EMAIL_OTP',
    userName: 'Abhishek',
    userEmail: 'abhishek52@yopmail.com',
    gaInstance: '71211C8374674B279891A55131DA9598',
    duration: '2 min 45 sec',
    status: '✓ Success',
    events: [
      {
        timestamp: '2026-07-01T18:27:14Z',
        message: 'cta_clicked',
        type: 'warning',
        category: 'login_sdk',
        actionLabel: 'deeplink | verify_otp',
        keyFields: null,
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:14Z',
        message: 'login_actions',
        type: 'info',
        category: 'login_sdk',
        actionLabel: 'deeplink | otp_filled',
        keyFields: null,
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:14Z',
        message: 'viewed',
        type: 'info',
        category: 'login_sdk',
        actionLabel: 'otp_input | OTP_FIELD',
        keyFields: 'OTP complete, retry timer visible',
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:17Z',
        message: 'login',
        type: 'success',
        category: 'deeplink',
        actionLabel: 'abhishek52@yopmail.com | EMAIL_OTP',
        keyFields: 'phone: (empty) · email: abhishek52@yopmail.com',
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:17Z',
        message: 'Login success',
        type: 'success',
        category: 'deeplink',
        actionLabel: 'abhishek52@yopmail.com | EMAIL_OTP',
        keyFields: 'phone: (empty) · email: abhishek52@yopmail.com',
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:17Z',
        message: 'login_actions',
        type: 'success',
        category: 'login_sdk',
        actionLabel: 'deeplink | LOGIN_SUCCESS | PHONE_OTP | whats',
        keyFields: 'WhatsApp opt-in captured',
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:17Z',
        message: 'profile_details_shown',
        type: 'profile',
        category: 'deeplink_update_details',
        actionLabel: 'NA',
        keyFields: 'login_type: EMAIL_OTP · name: (empty) · email: (e...',
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:34Z',
        message: 'profile_details_field_entered',
        type: 'profile',
        category: 'deeplink_update_details',
        actionLabel: 'field: name · value: \'A\'',
        keyFields: 'login_type: EMAIL_OTP',
        count: 1,
        unique_users: 1
      },
      {
        timestamp: '2026-07-01T18:27:39Z',
        message: 'profile_details_submit',
        type: 'profile',
        category: 'deeplink_update_details',
        actionLabel: 'Abhishek Khandelwal',
        keyFields: null,
        count: 1,
        unique_users: 1
      }
    ]
  }
}

app.get('/api/login-events', (req, res) => {
  res.json(MOCK_LOGIN_EVENTS)
})

app.listen(PORT, () => {
  console.log(`Dev API server listening on http://localhost:${PORT}`)
})
