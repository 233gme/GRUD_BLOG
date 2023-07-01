import { createContext } from 'react';

export const LOCAL_STORAGE_THEME_KEY = 'blog_theme';
export const ThemeContext = createContext({ LOCAL_STORAGE_THEME_KEY: 'light' });
