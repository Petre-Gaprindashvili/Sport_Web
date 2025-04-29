import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VideoHelperService {
  constructor() {}


  getEmbedUrl(videoUrl: string): string {
  let videoId = '';

  if (videoUrl.includes('youtube.com/watch')) {
    const urlParams = new URLSearchParams(videoUrl.split('?')[1]);
    videoId = urlParams.get('v') || '';
  } else if (videoUrl.includes('youtu.be/')) {
    videoId = videoUrl.split('youtu.be/')[1].split('?')[0];
  }

  // This hides the title and YouTube branding as much as allowed
  return `https://www.youtube.com/embed/${videoId}?modestbranding=1&showinfo=0&rel=0`;
}
}
