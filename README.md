# LordSMP Minecraft Server Website

A modern, responsive website for the LordSMP Minecraft server with real-time server status updates, member management, and an admin panel.

## Features

- Real-time server status indicator (online/offline)
- Public pages for members, rules, and server information
- Application form for new members
- Admin panel for managing server status, members, and rules
- Firebase integration for authentication and real-time database
- Responsive design for mobile and desktop

## Technologies Used

- Next.js 15+
- React
- Tailwind CSS
- ShadCN UI Components
- Firebase Authentication
- Firebase Realtime Database
- TypeScript

## Getting Started

### Prerequisites

- Node.js 16+ and Bun
- A Firebase account (free tier is sufficient)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/lordsmp-website.git
   cd lordsmp-website
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Create a `.env.local` file in the root directory with your Firebase configuration:
   ```
   NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_DATABASE_URL=https://your-project-id-default-rtdb.firebaseio.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
   NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
   ```

4. Follow the Firebase setup instructions in [FIREBASE_SETUP.md](./FIREBASE_SETUP.md)

5. Start the development server:
   ```bash
   bun run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Firebase Setup

For detailed Firebase setup instructions, please refer to [FIREBASE_SETUP.md](./FIREBASE_SETUP.md).

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
  - `/ui` - ShadCN UI components
  - `/layout` - Layout components
  - `/minecraft` - Minecraft-themed components
- `/src/lib` - Utility functions and shared code
  - `/context` - React contexts including server status
  - `/data` - Data schemas and mock data
  - `/firebase` - Firebase configuration and utilities
  - `/utils` - Helper functions
- `/public` - Static assets

## Admin Panel

The admin panel is accessible at `/admin/login`. You'll need to create an admin user in Firebase before you can log in. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for instructions.

Once logged in, you can:
- Toggle the server status (online/offline)
- View and manage member applications
- Edit server rules
- View server logs

## Deployment

This project can be deployed to any platform that supports Next.js, such as Vercel, Netlify, or a custom server.

### Netlify Deployment

1. Make sure you have the Netlify CLI installed:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   bun run build
   ```

3. Deploy to Netlify:
   ```bash
   netlify deploy --prod
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- Minecraft is a trademark of Mojang Studios
- This project is not affiliated with Mojang or Microsoft
