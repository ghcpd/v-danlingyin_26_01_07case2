import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { User, Video } from '@/types';
import { users, videos, getVideosByUserId } from '@/data';

/**
 * Main application store
 * Manages current user, liked videos, and feed state
 */
export const useAppStore = defineStore('app', () => {
  // Current user (defaults to first user for demo)
  const currentUser = ref<User>(users[0]);
  
  // Set of liked video IDs
  const likedVideoIds = ref<Set<string>>(new Set());
  
  // Local like count adjustments (to show immediate feedback)
  const likeCountAdjustments = ref<Map<string, number>>(new Map());
  
  // Current video index in feed
  const currentVideoIndex = ref<number>(0);
  
  // Active video ID for feed viewing
  const activeVideoId = ref<string | null>(null);
  
  // Comment panel visibility
  const isCommentPanelOpen = ref<boolean>(false);
  const commentPanelVideoId = ref<string | null>(null);

  /**
   * All videos for the feed
   */
  const feedVideos = computed<Video[]>(() => {
    return videos;
  });

  /**
   * Current video being viewed
   */
  const currentVideo = computed<Video | undefined>(() => {
    return feedVideos.value[currentVideoIndex.value];
  });

  /**
   * Check if a video is liked
   */
  function isVideoLiked(videoId: string): boolean {
    return likedVideoIds.value.has(videoId);
  }

  /**
   * Get adjusted like count for a video
   */
  function getAdjustedLikeCount(video: Video): number {
    const adjustment = likeCountAdjustments.value.get(video.id) || 0;
    return video.likeCount + adjustment;
  }

  /**
   * Toggle like state for a video
   */
  function toggleLike(videoId: string): void {
    const isCurrentlyLiked = likedVideoIds.value.has(videoId);
    
    if (isCurrentlyLiked) {
      likedVideoIds.value.delete(videoId);
      // Decrease adjustment
      const current = likeCountAdjustments.value.get(videoId) || 0;
      likeCountAdjustments.value.set(videoId, current - 1);
    } else {
      likedVideoIds.value.add(videoId);
      // Increase adjustment
      const current = likeCountAdjustments.value.get(videoId) || 0;
      likeCountAdjustments.value.set(videoId, current + 1);
    }
  }

  /**
   * Navigate to next video in feed
   */
  function nextVideo(): void {
    if (currentVideoIndex.value < feedVideos.value.length - 1) {
      currentVideoIndex.value++;
    }
  }

  /**
   * Navigate to previous video in feed
   */
  function previousVideo(): void {
    if (currentVideoIndex.value > 0) {
      currentVideoIndex.value--;
    }
  }

  /**
   * Set current video by index
   */
  function setVideoIndex(index: number): void {
    if (index >= 0 && index < feedVideos.value.length) {
      currentVideoIndex.value = index;
    }
  }

  /**
   * Set active video ID (for viewing from profile)
   */
  function setActiveVideoId(videoId: string | null): void {
    activeVideoId.value = videoId;
    if (videoId) {
      const index = feedVideos.value.findIndex(v => v.id === videoId);
      if (index !== -1) {
        currentVideoIndex.value = index;
      }
    }
  }

  /**
   * Open comment panel for a video
   */
  function openCommentPanel(videoId: string): void {
    commentPanelVideoId.value = videoId;
    isCommentPanelOpen.value = true;
  }

  /**
   * Close comment panel
   */
  function closeCommentPanel(): void {
    isCommentPanelOpen.value = false;
    commentPanelVideoId.value = null;
  }

  /**
   * Get videos for a specific user
   */
  function getUserVideos(userId: string): Video[] {
    return getVideosByUserId(userId);
  }

  /**
   * Set current user
   */
  function setCurrentUser(user: User): void {
    currentUser.value = user;
  }

  return {
    // State
    currentUser,
    likedVideoIds,
    currentVideoIndex,
    activeVideoId,
    isCommentPanelOpen,
    commentPanelVideoId,
    
    // Computed
    feedVideos,
    currentVideo,
    
    // Methods
    isVideoLiked,
    getAdjustedLikeCount,
    toggleLike,
    nextVideo,
    previousVideo,
    setVideoIndex,
    setActiveVideoId,
    openCommentPanel,
    closeCommentPanel,
    getUserVideos,
    setCurrentUser
  };
});
