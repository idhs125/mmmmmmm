# Setting Up Firebase for LordSMP Website

This guide will walk you through setting up Firebase for the LordSMP website, enabling real-time server status updates and secure authentication for the admin panel.

## Prerequisites

1. A Google account
2. Node.js installed (v14 or higher)
3. Basic understanding of JavaScript and Firebase concepts

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Name your project (e.g., "LordSMP-Website")
4. Choose whether to enable Google Analytics (optional)
5. Click "Create project"

## Step 2: Register Your Web App

1. On your Firebase project dashboard, click the web icon (</>) to add a web app
2. Name your app (e.g., "lordsmp-web")
3. Click "Register app"
4. Copy the Firebase configuration object, which looks like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_API_KEY",
     authDomain: "your-project-id.firebaseapp.com",
     databaseURL: "https://your-project-id-default-rtdb.firebaseio.com",
     projectId: "your-project-id",
     storageBucket: "your-project-id.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID"
   };
   ```

## Step 3: Set Up Realtime Database

1. In the Firebase console, go to "Build" → "Realtime Database"
2. Click "Create Database"
3. Start in test mode for development
4. Choose a database location close to your users
5. Click "Enable"

## Step 4: Configure Authentication

1. Go to "Build" → "Authentication"
2. Click "Get started"
3. Under "Sign-in method", enable "Email/Password"
4. Save your changes

## Step 5: Update Environment Variables

1. Open the `.env.local` file in your project
2. Replace the placeholders with your actual Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

## Step 6: Create Admin User

There are two ways to create your admin user:

### Option 1: Using the Setup Script (Recommended)

1. Make sure you have the Firebase configuration in your `.env.local` file
2. Run the admin setup script:
   ```bash
   node scripts/setup-admin.js
   ```
3. The script will create an admin user with the email and password specified in the script (or environment variables)

### Option 2: Manual Setup

1. In your browser, go to your website's admin login page
2. Click "Sign up" or navigate to a registration page
3. Create a new user with your admin email and password
4. In the Firebase console, go to "Realtime Database"
5. Manually create a new entry:
   ```
   /users/[user-uid]/role: "admin"
   ```
   (Replace [user-uid] with the actual UID from the Authentication section)

## Step 7: Set Up Security Rules

1. Get your Firebase Admin SDK service account key:
   - Go to Firebase console → Project settings → Service accounts
   - Click "Generate new private key"
   - Save the JSON file

2. Set the path to this file as an environment variable or update it in the script:
   ```
   FIREBASE_ADMIN_SDK_CREDENTIALS=path/to/your-service-account.json
   ```

3. Run the security rules setup script:
   ```bash
   node scripts/setup-security-rules.js
   ```

## Step 8: Deploy and Test

1. Deploy your website
2. Navigate to the admin login page
3. Log in with your admin credentials
4. Test changing the server status from online to offline and back
5. Verify that the changes appear in real-time on the public pages

## Troubleshooting

### Firebase Authentication Issues

- Check browser console for specific error messages
- Verify that you've enabled Email/Password authentication in Firebase
- Make sure your Firebase project has the correct permissions

### Database Access Issues

- Check security rules in Firebase console
- Verify that the database URL in your config is correct
- Make sure the admin user has the 'admin' role in the database

### Real-time Updates Not Working

- Check that you're using the correct database reference path
- Ensure that all components subscribing to updates are properly unmounting their listeners
- Verify network connectivity (the Firebase Realtime Database requires an active internet connection)

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication](https://firebase.google.com/docs/auth)
- [Firebase Realtime Database](https://firebase.google.com/docs/database)
- [Firebase Security Rules](https://firebase.google.com/docs/database/security)
