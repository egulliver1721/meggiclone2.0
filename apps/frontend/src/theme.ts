import { atom, useAtom } from 'jotai';

export const themeAtom = atom<'light' | 'dark'>('light');

export function toggleDarkMode() {
  const [, setTheme] = useAtom(themeAtom);
  setTheme('dark');
}

export function toggleLightMode() {
  const [, setTheme] = useAtom(themeAtom);
  setTheme('light');
}
