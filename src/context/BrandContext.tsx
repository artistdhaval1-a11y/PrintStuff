import React, { createContext, useContext, useState, useEffect } from 'react';

interface BrandContextType {
  tagLogoUrl: string;
  wordmarkUrl: string;
  wordmarkDarkUrl: string;
  wordmarkScale: number;
  isCustomWordmark: boolean;
  isCustomTagLogo: boolean;
  isUploadModalOpen: boolean;
  activeModalTab: 'wordmark' | 'logo';
  openUploadModal: (tab?: 'wordmark' | 'logo') => void;
  closeUploadModal: () => void;
  setWordmarkAsset: (whiteUrl: string, darkUrl?: string) => void;
  setWordmarkScale: (scale: number) => void;
  setTagLogoAsset: (logoUrl: string) => void;
  resetWordmark: () => void;
  resetAll: () => void;
}

const DEFAULT_TAG_LOGO = '/brand/printstuff-tag-logo.png';
const DEFAULT_WORDMARK_WHITE = '/brand/printstuff-wordmark-white.png';
const DEFAULT_WORDMARK_BLACK = '/brand/printstuff-wordmark-black.png';
const DEFAULT_SCALE = 1.3;

const BrandContext = createContext<BrandContextType>({
  tagLogoUrl: DEFAULT_TAG_LOGO,
  wordmarkUrl: DEFAULT_WORDMARK_WHITE,
  wordmarkDarkUrl: DEFAULT_WORDMARK_BLACK,
  wordmarkScale: DEFAULT_SCALE,
  isCustomWordmark: false,
  isCustomTagLogo: false,
  isUploadModalOpen: false,
  activeModalTab: 'wordmark',
  openUploadModal: () => {},
  closeUploadModal: () => {},
  setWordmarkAsset: () => {},
  setWordmarkScale: () => {},
  setTagLogoAsset: () => {},
  resetWordmark: () => {},
  resetAll: () => {},
});

export const BrandProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tagLogoUrl, setTagLogoUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('printstuff_user_tag_logo_url') || DEFAULT_TAG_LOGO;
    } catch {
      return DEFAULT_TAG_LOGO;
    }
  });

  const [wordmarkUrl, setWordmarkUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('printstuff_user_wordmark_url') || DEFAULT_WORDMARK_WHITE;
    } catch {
      return DEFAULT_WORDMARK_WHITE;
    }
  });

  const [wordmarkDarkUrl, setWordmarkDarkUrl] = useState<string>(() => {
    try {
      return localStorage.getItem('printstuff_user_wordmark_dark_url') || DEFAULT_WORDMARK_BLACK;
    } catch {
      return DEFAULT_WORDMARK_BLACK;
    }
  });

  const [wordmarkScale, setWordmarkScaleState] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('printstuff_user_wordmark_scale');
      return saved ? parseFloat(saved) : DEFAULT_SCALE;
    } catch {
      return DEFAULT_SCALE;
    }
  });

  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);
  const [activeModalTab, setActiveModalTab] = useState<'wordmark' | 'logo'>('wordmark');

  const isCustomWordmark = wordmarkUrl !== DEFAULT_WORDMARK_WHITE;
  const isCustomTagLogo = tagLogoUrl !== DEFAULT_TAG_LOGO;

  // Automatically synchronize any client-side localStorage wordmark to server disk
  useEffect(() => {
    try {
      const savedWordmark = localStorage.getItem('printstuff_user_wordmark_url');
      const savedDark = localStorage.getItem('printstuff_user_wordmark_dark_url');
      if (savedWordmark && savedWordmark.startsWith('data:image')) {
        fetch('/api/upload-brand-asset', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            type: 'wordmark',
            base64Data: savedWordmark,
            blackData: savedDark && savedDark.startsWith('data:image') ? savedDark : undefined,
          }),
        }).catch(() => {});
      }
    } catch {
      // Storage unavailable
    }
  }, []);

  const openUploadModal = (tab: 'wordmark' | 'logo' = 'wordmark') => {
    setActiveModalTab(tab);
    setIsUploadModalOpen(true);
  };

  const closeUploadModal = () => {
    setIsUploadModalOpen(false);
  };

  const setWordmarkAsset = (whiteUrl: string, darkUrl?: string) => {
    setWordmarkUrl(whiteUrl);
    const resolvedDark = darkUrl || whiteUrl;
    setWordmarkDarkUrl(resolvedDark);
    try {
      localStorage.setItem('printstuff_user_wordmark_url', whiteUrl);
      localStorage.setItem('printstuff_user_wordmark_dark_url', resolvedDark);
    } catch {
      // Storage quota or disabled
    }

    if (whiteUrl.startsWith('data:image')) {
      fetch('/api/upload-brand-asset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wordmark',
          base64Data: whiteUrl,
          blackData: resolvedDark.startsWith('data:image') ? resolvedDark : undefined,
        }),
      }).catch(() => {});
    }
  };

  const setWordmarkScale = (scale: number) => {
    setWordmarkScaleState(scale);
    try {
      localStorage.setItem('printstuff_user_wordmark_scale', scale.toString());
    } catch {
      // Storage quota or disabled
    }
  };

  const setTagLogoAsset = (logoUrl: string) => {
    setTagLogoUrl(logoUrl);
    try {
      localStorage.setItem('printstuff_user_tag_logo_url', logoUrl);
    } catch {
      // Storage quota or disabled
    }
  };

  const resetWordmark = () => {
    setWordmarkUrl(DEFAULT_WORDMARK_WHITE);
    setWordmarkDarkUrl(DEFAULT_WORDMARK_BLACK);
    setWordmarkScaleState(DEFAULT_SCALE);
    try {
      localStorage.removeItem('printstuff_user_wordmark_url');
      localStorage.removeItem('printstuff_user_wordmark_dark_url');
      localStorage.removeItem('printstuff_user_wordmark_scale');
    } catch {
      // Storage quota or disabled
    }
  };

  const resetAll = () => {
    setTagLogoUrl(DEFAULT_TAG_LOGO);
    resetWordmark();
    try {
      localStorage.removeItem('printstuff_user_tag_logo_url');
    } catch {
      // Storage quota or disabled
    }
  };

  return (
    <BrandContext.Provider
      value={{
        tagLogoUrl,
        wordmarkUrl,
        wordmarkDarkUrl,
        wordmarkScale,
        isCustomWordmark,
        isCustomTagLogo,
        isUploadModalOpen,
        activeModalTab,
        openUploadModal,
        closeUploadModal,
        setWordmarkAsset,
        setWordmarkScale,
        setTagLogoAsset,
        resetWordmark,
        resetAll,
      }}
    >
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = () => useContext(BrandContext);
