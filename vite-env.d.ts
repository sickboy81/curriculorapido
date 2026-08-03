/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ADSENSE_ENABLED?: string;
  readonly VITE_ADSENSE_CLIENT?: string;
  readonly VITE_ADSENSE_EDITOR_SLOT?: string;
  readonly VITE_ADSENSE_PREVIEW_SLOT?: string;
  readonly VITE_ADSENSE_FOOTER_SLOT?: string;
  readonly VITE_ADSENSE_GUIDE_SLOT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
