# TikTok-like Short Video App

A modern, TikTok-inspired short video web application built with Vue 3, TypeScript, and Tailwind CSS. This application provides a vertical video feed with interactive features including likes, comments, and user profiles.

## 🎯 Features

### Video Feed Page (Home)
- **Vertical full-screen video feed** - One video displayed at a time
- **Auto-play functionality** - Videos play automatically when visible
- **Smart pause/play** - Videos pause when scrolled out of view
- **Mouse wheel & touch scrolling** - Smooth navigation between videos
- **Interactive video controls** - Click video to toggle play/pause

### Video Interactions
- **Like system** - Toggle likes with real-time count updates
- **Comment panel** - View mock comments for each video
- **Share functionality** - Placeholder share action
- **Creator profiles** - Click avatar or username to view profile

### User Profile Page
- User avatar and username display
- Bio text
- Follower and following counts (mock data)
- Grid layout of user's videos
- Click video thumbnail to return to feed view

### Navigation
- **Bottom navigation bar** with mobile-first design
- Home and Profile tabs
- Active state indication
- Touch-friendly interactions

### Responsive Design
- Mobile-first approach
- Desktop layout centers feed with max width (500px)
- Touch-optimized interactions
- Accessible keyboard controls

## 🛠️ Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript (Strict Mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm
- **Routing**: Vue Router
- **State Management**: Pinia
- **Video**: HTML5 video elements

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- pnpm

### Steps

1. **Install dependencies**:
```bash
pnpm install
```

2. **Run development server**:
```bash
pnpm dev
```

The application will open automatically at `http://localhost:3000`

3. **Build for production**:
```bash
pnpm build
```

4. **Preview production build**:
```bash
pnpm preview
```

5. **Type checking**:
```bash
pnpm type-check
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── VideoPlayer.vue     # HTML5 video player with controls
│   │   ├── VideoItem.vue       # Video feed item with interactions
│   │   ├── BottomNav.vue       # Bottom navigation bar
│   │   └── CommentPanel.vue    # Comment overlay panel
│   ├── pages/               # Page-level views
│   │   ├── VideoFeed.vue       # Home feed page
│   │   └── Profile.vue         # User profile page
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── store/               # Pinia global state
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── data/                # Mock data
│   │   ├── users.ts
│   │   ├── videos.ts
│   │   └── comments.ts
│   ├── App.vue              # Root component
│   ├── main.ts              # Application entry point
│   └── style.css            # Global styles with Tailwind
├── index.html               # HTML template
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── README.md                # This file
```

## 🎮 Core User Flows

### 1. Browsing Videos
1. Open app - lands on video feed
2. First video auto-plays
3. Scroll down/up to switch videos
4. Click video to pause/play
5. Previous video pauses automatically

### 2. Interacting with Videos
1. Click **heart icon** to like (turns red)
2. Click again to unlike
3. Like count updates in real-time
4. Click **comment icon** to view comments
5. Comment panel slides up from bottom
6. Click **share icon** for placeholder action

### 3. Viewing Profiles
1. Click creator avatar or username
2. Navigate to profile page
3. View user info and video grid
4. Click video thumbnail to return to feed
5. Use bottom nav to switch between Home/Profile

### 4. Navigation
1. Bottom nav always visible
2. **Home icon** - returns to video feed
3. **Profile icon** - shows current user profile
4. Active tab highlighted in white

## 🧪 Manual UI Validation Steps

### Video Feed Functionality
- [ ] First video auto-plays on page load
- [ ] Scrolling switches to next/previous video
- [ ] Only one video plays at a time
- [ ] Click video toggles play/pause
- [ ] Pause icon appears when video is paused
- [ ] Video loops when finished

### Interaction System
- [ ] Like button toggles filled/outline state
- [ ] Like count increments/decrements correctly
- [ ] Comment button opens comment panel
- [ ] Comment panel shows mock comments
- [ ] Share button displays alert message
- [ ] All buttons provide visual feedback

### Profile Page
- [ ] Profile displays user information correctly
- [ ] Video grid shows user's videos only
- [ ] Follower/following counts display with K/M formatting
- [ ] Click video thumbnail navigates to feed
- [ ] Back navigation works correctly

### Navigation & Routing
- [ ] Bottom nav visible on all pages
- [ ] Active tab highlighted correctly
- [ ] Home icon navigates to feed
- [ ] Profile icon navigates to user profile
- [ ] Browser back/forward buttons work

### Responsive Design
- [ ] Works on mobile viewport (375px)
- [ ] Works on tablet viewport (768px)
- [ ] Works on desktop viewport (1920px)
- [ ] Videos centered on desktop
- [ ] Touch gestures work on mobile
- [ ] Mouse wheel scrolling works on desktop

### Accessibility
- [ ] All interactive elements keyboard accessible
- [ ] Tab navigation works correctly
- [ ] ARIA labels present on buttons
- [ ] Semantic HTML structure
- [ ] Focus indicators visible

## 🔄 State Management

The app uses Pinia for global state management:

- **currentUser**: Currently logged-in user (mock)
- **likedVideoIds**: Set of video IDs the user has liked
- **videos**: Array of all videos in the feed

State is persisted across navigation and provides reactive updates to all components.

## 📊 Mock Data

All data is mocked for demonstration purposes:

- **5 users** with avatars, bios, and follower counts
- **8 videos** with descriptions, like counts, and comment counts
- **Mock comments** for select videos
- Video URLs use public sample videos

## ⚠️ Known Limitations

- **No real backend** - All data is mocked in the frontend
- **No authentication** - Current user is hardcoded
- **No video upload** - Videos are predefined URLs
- **Limited comment functionality** - Comments are read-only
- **No real sharing** - Share button shows placeholder alert
- **Video sources** - Uses sample videos from public CDN
- **No persistence** - Likes/state reset on page refresh

## 🚀 Future Enhancements

Potential improvements for production use:

- Real backend API integration
- User authentication system
- Video upload functionality
- Real comment creation and replies
- Social sharing integration
- Video recording/editing tools
- Following/follower system
- Notifications
- Search and discovery
- Video analytics
- Progressive Web App (PWA) support

## 📄 License

This is a demonstration project for UI case evaluation purposes.

## 🤝 Contributing

This project is for evaluation purposes and is not accepting contributions.

---

Built with ❤️ using Vue 3, TypeScript, and Tailwind CSS
