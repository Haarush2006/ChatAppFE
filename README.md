# Room Chat App Frontend

A modern, real-time chat application frontend built with Next.js, React, and Tailwind CSS. This app allows users to join chat rooms, send and receive messages instantly, and experience a responsive, themeable UI.

## Features

- Join chat rooms with a username and room ID
- Real-time messaging using WebSockets
- Persistent user and room session (via sessionStorage)
- Responsive and accessible UI
- Light and dark theme support
- Built with Next.js, React, and Tailwind CSS

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```sh
   git clone <repo-url>
   cd roomfrontend
   ```
2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

### Running the Development Server

```sh
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

### Building for Production

```sh
npm run build
npm start
```

## Project Structure

- `app/` — Next.js app directory (pages, layout, global styles)
- `components/` — Reusable UI components (chat panel, join form, etc.)

## Customization
- Update WebSocket server URL in `app/page.tsx` if your backend runs elsewhere.
- Tailwind CSS and theme settings can be customized in `tailwind.config.ts` and `app/globals.css`.

## Author

Haarush

