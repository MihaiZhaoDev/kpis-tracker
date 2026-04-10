import { HeroUIProvider } from '@heroui/react';
import { ReactNode } from 'react';

export interface UIProviderProps {
  children: ReactNode;
  navigate?: (path: string) => void;
}

export function UIProvider({ children, navigate }: UIProviderProps) {
  return (
    <HeroUIProvider navigate={navigate}>
      {children}
    </HeroUIProvider>
  );
}
