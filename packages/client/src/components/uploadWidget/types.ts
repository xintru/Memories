enum UploadEvents {
  ABORT = 'abort',
  SUCCESS = 'success',
  CLOSE = 'close',
}

export interface UploadResult {
  event: UploadEvents
  info: {
    secure_url: string
  }
}

export enum WidgetSources {
  LOCAL = 'local',
  URL = 'url',
  FACEBOOK = 'facebook',
  INSTAGRAM = 'instagram',
  DROPBOX = 'dropbox',
  GOOGLE_PHOTOS = 'google_photos',
}

export interface WidgetSettings {
  cloudName: string
  uploadPreset: string
  sources: WidgetSources[]
  styles: {
    palette: {
      window: string
      windowBorder: string
      tabIcon: string
      menuIcons: string
      textDark: string
      textLight: string
      link: string
      action: string
      inactiveTabIcon: string
      error: string
      inProgress: string
      complete: string
      sourceBg: string
    }
    fonts: {
      [font: string]: string
    }
  }
}
