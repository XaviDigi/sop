// YouTube utility functions

/**
 * Format YouTube video duration
 * @param {string} duration - Duration in ISO 8601 format (PT1H2M3S)
 * @returns {string} - Formatted duration (HH:MM:SS)
 */
export const formatDuration = (duration) => {
  if (!duration) return '00:00';
  
  // Remove PT from the beginning
  const time = duration.replace('PT', '');
  
  let hours = 0;
  let minutes = 0;
  let seconds = 0;
  
  // Extract hours, minutes, and seconds
  if (time.includes('H')) {
    const hoursPart = time.split('H')[0];
    hours = parseInt(hoursPart, 10);
    duration = time.split('H')[1];
  } else {
    duration = time;
  }
  
  if (duration.includes('M')) {
    const minutesPart = duration.split('M')[0];
    minutes = parseInt(minutesPart, 10);
    duration = duration.split('M')[1];
  }
  
  if (duration.includes('S')) {
    const secondsPart = duration.split('S')[0];
    seconds = parseInt(secondsPart, 10);
  }
  
  // Format the time
  const formattedHours = hours > 0 ? `${hours.toString().padStart(2, '0')}:` : '';
  const formattedMinutes = `${minutes.toString().padStart(2, '0')}:`;
  const formattedSeconds = seconds.toString().padStart(2, '0');
  
  return `${formattedHours}${formattedMinutes}${formattedSeconds}`;
};

/**
 * Format YouTube view count
 * @param {number} viewCount - Number of views
 * @returns {string} - Formatted view count (e.g., 1.2M, 456K)
 */
export const formatViewCount = (viewCount) => {
  if (!viewCount) return '0 views';
  
  const count = parseInt(viewCount, 10);
  
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  } else {
    return `${count} views`;
  }
};

/**
 * Extract video ID from YouTube URL
 * @param {string} url - YouTube video URL
 * @returns {string|null} - YouTube video ID or null if invalid
 */
export const extractVideoId = (url) => {
  if (!url) return null;
  
  // Regular expression to extract YouTube video ID
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  
  return (match && match[2].length === 11) ? match[2] : null;
};

/**
 * Generate YouTube thumbnail URL
 * @param {string} videoId - YouTube video ID
 * @param {string} quality - Thumbnail quality (default, mqdefault, hqdefault, sddefault, maxresdefault)
 * @returns {string} - YouTube thumbnail URL
 */
export const getThumbnailUrl = (videoId, quality = 'hqdefault') => {
  if (!videoId) return '';
  
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

/**
 * Generate YouTube embed URL
 * @param {string} videoId - YouTube video ID
 * @returns {string} - YouTube embed URL
 */
export const getEmbedUrl = (videoId) => {
  if (!videoId) return '';
  
  return `https://www.youtube.com/embed/${videoId}`;
};
