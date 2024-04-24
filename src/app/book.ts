export interface Book {
    volumeInfo: VolumeInfo;
    title: string;
  }
  
  interface VolumeInfo {
    title: string;
    description: string;
    imageLinks: ImageLinks;
  }
  
  interface ImageLinks {
    thumbnail: string;
  }
  