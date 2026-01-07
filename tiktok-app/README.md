# TikTok-like Short Video App

A TikTok-inspired short video browsing platform built with Vue 3, TypeScript, and Tailwind CSS. Users can scroll through a vertical video feed, interact with videos, and view creator profiles.

## 🎬 Features

### Video Feed (Home Page)
- **Vertical Full-Screen Feed**: One video visible at a time with smooth scrolling
- **Auto-play/Pause**: Videos automatically play when visible and pause when scrolled away
- **Click to Play/Pause**: Toggle video playback by clicking on the video
- **Like Button**: Toggle like state with immediate visual feedback
- **Comment Button**: Opens mock comment panel
- **Share Button**: Placeholder share action
- **Creator Info**: Avatar, username, and video description overlay

### User Profile Page
- **User Information**: Avatar, username, display name, and bio
- **Stats Display**: Follower count, following count, and total likes
- **Video Grid**: Grid layout of user's videos
- **Click to View**: Clicking a video opens it in the feed view

### Navigation
- **Bottom Navigation Bar**: Mobile-first design with Home and Profile tabs
- **Active State Indication**: Visual feedback for current page

### Interactions
- **Scroll/Swipe Navigation**: Mouse wheel or touch gestures to switch videos
- **Keyboard Navigation**: Arrow keys (↑↓) or j/k keys to navigate
- **Responsive Design**: Mobile-first with centered desktop layout

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript (strict mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: Vue Router 4
- **State Management**: Pinia
- **Package Manager**: pnpm

## 📦 Installation

```bash
# Clone the repository or navigate to the project folder
cd tiktok-app

# Install dependencies
pnpm install
```

## 🚀 Development

```bash
# Start development server
pnpm dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Build

```bash
# Build for production
pnpm build

# Preview production build
pnpm preview
```

## 📁 Project Structure

```
tiktok-app/
├── public/
│   └── vite.svg            # App icon
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── CommentPanel.vue    # Comment panel overlay
│   │   ├── NavigationBar.vue   # Bottom navigation
│   │   ├── UserAvatar.vue      # Avatar component
│   │   ├── VideoCard.vue       # Video player with interactions
│   │   └── index.ts            # Component exports
│   ├── data/               # Mock data
│   │   ├── comments.ts         # Mock comments
│   │   ├── users.ts            # Mock users
│   │   ├── videos.ts           # Mock videos
│   │   └── index.ts            # Data exports
│   ├── pages/              # Page-level views
│   │   ├── HomePage.vue        # Video feed page
│   │   └── ProfilePage.vue     # User profile page
│   ├── router/             # Vue Router configuration
│   │   └── index.ts            # Routes definition
│   ├── store/              # Pinia store
│   │   └── index.ts            # Global state management
│   ├── types/              # TypeScript definitions
│   │   └── index.ts            # Type interfaces
│   ├── utils/              # Helper functions
│   │   └── index.ts            # Utility functions
│   ├── App.vue             # Root component
│   ├── main.ts             # App entry point
│   ├── style.css           # Global styles with Tailwind
│   └── vite-env.d.ts       # Vite type declarations
├── index.html              # HTML template
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # Node TypeScript config
└── vite.config.ts          # Vite configuration
```

## 🔄 Core User Flows

### 1. Browsing Videos
1. Open the app → Lands on Home page with video feed
2. First video auto-plays
3. Scroll down (mouse wheel or swipe) → Navigates to next video
4. Previous video pauses, new video auto-plays
5. Click on video → Toggles play/pause

### 2. Liking a Video
1. While viewing a video, click the heart icon
2. Heart turns red, like count increases
3. Click again to unlike

### 3. Viewing Comments
1. Click the comment icon on any video
2. Comment panel slides up from bottom
3. View mock comments with user info
4. Click X or outside panel to close

### 4. Viewing a Profile
1. Click on creator's avatar or username
2. Navigate to their profile page
3. View their stats and video grid
4. Click any video to return to feed at that video

### 5. Navigating to Own Profile
1. Click Profile in bottom navigation
2. View your profile (first mock user)
3. Click Home to return to feed

## ✅ Manual UI Validation Steps

1. **Video Feed Navigation**
   - [ ] Videos scroll vertically one at a time
   - [ ] Videos auto-play when visible
   - [ ] Videos pause when scrolled away
   - [ ] Click on video toggles play/pause

2. **Interactions**
   - [ ] Like button toggles red color and updates count
   - [ ] Comment button opens panel
   - [ ] Comment panel shows mock comments
   - [ ] Share button shows alert

3. **Profile Page**
   - [ ] Shows user avatar, username, bio
   - [ ] Shows follower/following/likes stats
   - [ ] Shows grid of user's videos
   - [ ] Clicking video navigates to feed

4. **Navigation**
   - [ ] Bottom nav shows Home and Profile
   - [ ] Active tab is highlighted
   - [ ] Navigation works between pages

5. **Responsive Design**
   - [ ] Mobile view fills screen
   - [ ] Desktop view is centered with max-width
   - [ ] Touch interactions work on mobile

6. **Accessibility**
   - [ ] Keyboard navigation works (↑↓ keys)
   - [ ] Focus states are visible
   - [ ] Screen reader labels present

## ⚠️ Known Limitations

1. **Mock Data Only**: All data (users, videos, comments) is static mock data
2. **No Authentication**: No login/logout functionality
3. **No Real Video Upload**: Cannot upload new videos
4. **Mock Comments**: Comment posting is disabled (input is read-only)
5. **Mock Share**: Share button shows placeholder alert only
6. **Videos Muted**: Videos play muted to comply with autoplay policies
7. **Sample Videos**: Using public sample videos for demonstration
8. **No Backend**: All state is client-side and resets on refresh

## 📝 License

This project is for demonstration purposes only.
