import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Theme = 'light' | 'dark' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'system',
      
      setTheme: (theme) => {
        set({ theme });
        
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else if (theme === 'light') {
          document.documentElement.classList.remove('dark');
        } else {
          const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (isSystemDark) {
            document.documentElement.classList.add('dark');
          } else {
            document.documentElement.classList.remove('dark');
          }
        }
      },
    }),
    {
      name: 'theme-storage',
      onRehydrateStorage: (state) => {
        // When the store is rehydrated, apply the saved theme
        if (state) {
          const { theme } = state;
          
          if (theme === 'dark') {
            document.documentElement.classList.add('dark');
          } else if (theme === 'light') {
            document.documentElement.classList.remove('dark');
          } else {
            const isSystemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (isSystemDark) {
              document.documentElement.classList.add('dark');
            } else {
              document.documentElement.classList.remove('dark');
            }
          }
        }
      }
    }
  )
);