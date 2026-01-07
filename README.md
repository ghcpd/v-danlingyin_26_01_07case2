# TikTok-like Short Video Web Application

A fully-functional TikTok-inspired short video browsing platform built with Vue 3, TypeScript, and Vite. This application features a vertical video feed, user interactions, and profile management with a mobile-first responsive design.

## 🎯 Project Overview

This application replicates the core user experience of TikTok for the web, allowing users to:
- Browse through short-form videos in a vertical feed
- Interact with videos through likes, comments, and shares
- View creator profiles and their video collections
- Experience smooth auto-play and navigation

All data in this application is mock data for demonstration purposes.

## 🛠 Tech Stack

- **Framework**: Vue 3 (Composition API)
- **Language**: TypeScript (Strict Mode)
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Pinia
- **Routing**: Vue Router
- **Package Manager**: pnpm

## ✨ Key Features

### Video Feed Page (Home)
- **Vertical Scrolling**: One video displayed at a time in full-screen view
- **Auto-play**: Videos automatically play when visible in viewport
- **Pause on Leave**: Videos pause when user scrolls away
- **Click to Play/Pause**: Tap video to toggle playback
- **Like Interaction**: Click heart icon to like/unlike videos with real-time count updates
- **Comment Panel**: View mock comments in a bottom sheet modal
- **Share Button**: Placeholder share functionality
- **Creator Info**: Avatar, username, and description overlay
- **Keyboard Navigation**: Arrow keys to navigate between videos

### User Profile Page
- **User Information**: Avatar, username, bio, follower/following counts
- **Video Grid**: 3-column grid layout of user's videos
- **Video Preview**: Thumbnail with play icon overlay
- **Navigation**: Click any video to jump to it in the feed

### Navigation
- **Bottom Navigation Bar**: Fixed bottom navigation with Home and Profile tabs
- **Active State**: Visual indicator for current page
- **Mobile-First**: Touch-friendly design optimized for mobile devices
- **Desktop Support**: Centered layout with maximum width constraints

## 📁 Project Structure

```
tiktok-short-video-app/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── NavigationBar.vue    # Bottom navigation
│   │   ├── UserAvatar.vue       # User avatar component
│   │   ├── VideoItem.vue        # Individual video player
│   │   └── CommentPanel.vue     # Comments modal
│   ├── pages/               # Page-level views
│   │   ├── Home.vue            # Video feed page
│   │   └── Profile.vue         # User profile page
│   ├── router/              # Vue Router configuration
│   │   └── index.ts
│   ├── store/               # Pinia state management
│   │   └── index.ts
│   ├── types/               # TypeScript type definitions
│   │   └── index.ts
│   ├── data/                # Mock data
│   │   ├── users.ts
│   │   ├── videos.ts
│   │   └── comments.ts
│   ├── App.vue              # Root component
│   ├── main.ts              # Application entry point
│   ├── style.css            # Global styles
│   └── vite-env.d.ts        # Vite type declarations
├── index.html               # HTML entry point
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── postcss.config.js        # PostCSS configuration
```

## 🚀 Getting Started

### Prerequisites

- **Node.js**: Version 18.0 or higher
- **pnpm**: Version 8.0 or higher

Install pnpm globally if you haven't already:
```bash
npm install -g pnpm
```

### Installation

1. **Navigate to the project directory**:
```bash
cd tiktok-short-video-app
```

2. **Install dependencies**:
```bash
pnpm install
```

### Development

Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:3000`

### Build for Production

Create an optimized production build:
```bash
pnpm build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:
```bash
pnpm preview
```

### Type Checking

Run TypeScript type checking without emitting files:
```bash
pnpm type-check
```

## 🎮 Core User Flows

### 1. Browsing Videos
1. Open the app at the Home page
2. First video auto-plays on load
3. Scroll down to see the next video (previous pauses automatically)
4. Scroll up to return to previous videos
5. Use arrow keys (↑/↓) for keyboard navigation

### 2. Interacting with Videos
1. **Play/Pause**: Click anywhere on the video
2. **Like**: Click the heart icon on the right side
   - Icon fills with pink color when liked
   - Like count updates immediately
   - Click again to unlike
3. **Comment**: Click the comment icon
   - Opens bottom sheet with mock comments
   - Shows comment count
   - Click outside or X button to close
4. **Share**: Click the share icon
   - Displays placeholder alert message

### 3. Viewing Creator Profile
1. From any video, click the bottom navigation "Profile" button
2. View user information (avatar, username, bio, stats)
3. Scroll through video grid
4. Click any video thumbnail to jump to it in the feed

### 4. Navigation Between Pages
1. Use bottom navigation bar
2. **Home**: Returns to video feed at last position
3. **Profile**: Opens current user's profile
4. Active page indicated by pink highlight

## 🧪 Manual UI Validation Steps

To validate the application is working correctly, perform these tests:

### Video Playback
- [ ] First video plays automatically on page load
- [ ] Video pauses when scrolling away
- [ ] Next video auto-plays when scrolled into view
- [ ] Click video to toggle play/pause
- [ ] Play/pause indicator appears briefly

### Interactions
- [ ] Like button toggles state (empty ↔ filled)
- [ ] Like count increases/decreases correctly
- [ ] Comment panel opens when clicking comment icon
- [ ] Comment panel displays mock comments
- [ ] Share button shows alert message

### Navigation
- [ ] Vertical scroll works smoothly
- [ ] Snap-scroll stops at each video
- [ ] Bottom navigation switches pages
- [ ] Active page is highlighted in navigation
- [ ] Profile page displays user info correctly
- [ ] Video grid loads and displays thumbnails
- [ ] Clicking thumbnail navigates to video in feed

### Responsive Design
- [ ] Works on mobile viewport (375px width)
- [ ] Works on tablet viewport (768px width)
- [ ] Works on desktop viewport (1280px width)
- [ ] Touch gestures work on mobile
- [ ] Mouse scroll works on desktop
- [ ] Layout adapts appropriately at all sizes

### Accessibility
- [ ] All interactive elements are keyboard accessible
- [ ] Tab navigation works correctly
- [ ] ARIA labels are present on buttons
- [ ] Focus indicators are visible
- [ ] Semantic HTML elements are used

## 🎨 Design Decisions

### State Management
- **Pinia** chosen for its excellent TypeScript support and simple API
- Centralized store manages users, videos, and like states
- Reactive state updates ensure UI consistency

### Video Handling
- HTML5 video element with native controls disabled
- Intersection observer could be added for better performance
- Currently uses scroll event with throttling

### Styling Approach
- **Tailwind CSS** for rapid UI development
- Mobile-first responsive design methodology
- Custom utilities for video feed constraints
- Dark theme consistent with TikTok aesthetic

### TypeScript Configuration
- Strict mode enabled for maximum type safety
- No usage of `any` type throughout the codebase
- Strong typing for all data structures and components

## ⚠️ Known Limitations

### Current Implementation
1. **Mock Data Only**: No real backend API integration
2. **Limited Video Sources**: Uses sample videos from Google Cloud Storage
3. **Comment System**: Comments are hardcoded, not dynamic
4. **Share Functionality**: Placeholder implementation only
5. **User Authentication**: No login/logout functionality
6. **Video Upload**: No ability to upload new videos
7. **Search Feature**: Not implemented
8. **Following/Followers**: Mock data only, no interaction
9. **Notifications**: Not implemented
10. **Performance**: Large video files may cause loading delays

### Browser Compatibility
- Tested on modern browsers (Chrome, Firefox, Safari, Edge)
- Requires JavaScript enabled
- HTML5 video support required
- Some older browsers may not support all features

### Accessibility
- Basic accessibility implemented
- Screen reader support could be enhanced
- More ARIA attributes could be added for complex interactions

## 🔧 Future Enhancements

Potential improvements for production readiness:
- Backend API integration
- Real user authentication
- Video upload functionality
- Enhanced comment system with replies
- Search and discovery features
- Follow/unfollow functionality
- Real-time notifications
- Video buffering and quality selection
- Analytics and engagement tracking
- Content moderation
- Infinite scroll optimization
- PWA capabilities
- Video preloading strategy

## 📝 TypeScript Strict Mode

This project is configured with TypeScript strict mode enabled, including:
- `strict: true`
- `noImplicitAny: true`
- `strictNullChecks: true`
- `strictFunctionTypes: true`
- `strictBindCallApply: true`
- `strictPropertyInitialization: true`
- `noImplicitThis: true`
- `alwaysStrict: true`

All types are explicitly defined with no use of `any` type.

## 🤝 Component Architecture

### VideoItem Component
- Self-contained video player with overlay UI
- Manages play/pause state internally
- Emits events for user interactions
- Receives `isActive` prop to control auto-play

### CommentPanel Component
- Modal overlay component
- Uses Teleport for proper DOM positioning
- Displays mock comments with user avatars
- Handles backdrop click to close

### NavigationBar Component
- Fixed position bottom navigation
- Uses Vue Router for navigation
- Active state highlighting
- Touch-friendly button sizing

### UserAvatar Component
- Reusable avatar component
- Supports multiple sizes (small, medium, large)
- Lazy loading for images
- Proper alt text for accessibility

## 📊 Performance Considerations

- Videos use `preload="metadata"` for faster initial load
- Scroll event throttling to reduce CPU usage
- CSS scroll-snap for smooth scrolling
- Component lazy loading with Vue Router
- Optimized re-renders with proper reactive dependencies

## 🧑‍💻 Development Notes

### Code Style
- Vue 3 Composition API exclusively (no Options API)
- TypeScript for all logic
- Single File Components (.vue files)
- Functional and reactive programming patterns
- Clear separation of concerns

### State Management Pattern
- Single source of truth (Pinia store)
- Computed properties for derived state
- Actions for state mutations
- No direct state mutation outside store

### Component Communication
- Props down, events up pattern
- Provide/Inject for deep component trees (if needed)
- Store for global state
- Vue Router for navigation state

---

**Note**: This is a demonstration project built for educational purposes. It showcases modern Vue 3 development practices with TypeScript and is not intended for production use without further enhancements.
