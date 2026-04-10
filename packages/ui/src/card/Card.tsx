import {
  Card as HeroCard, CardHeader as HeroCardHeader,
  CardBody as HeroCardBody, CardFooter as HeroCardFooter,
} from '@heroui/react';
import { ReactNode } from 'react';

export interface CardProps {
  children: ReactNode; isPressable?: boolean; onPress?: () => void; className?: string;
}

export function Card({ children, isPressable, onPress, className }: CardProps) {
  return <HeroCard isPressable={isPressable} onPress={onPress} className={className}>{children}</HeroCard>;
}

export function CardHeader({ children, className }: { children: ReactNode; className?: string }) {
  return <HeroCardHeader className={className}>{children}</HeroCardHeader>;
}

export function CardBody({ children, className }: { children: ReactNode; className?: string }) {
  return <HeroCardBody className={className}>{children}</HeroCardBody>;
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <HeroCardFooter className={className}>{children}</HeroCardFooter>;
}
