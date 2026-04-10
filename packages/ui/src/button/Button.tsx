import { Button as HeroButton, ButtonProps as HeroButtonProps } from '@heroui/react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'ghost';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isDisabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  fullWidth?: boolean;
  onPress?: () => void;
  className?: string;
}

export function Button({
  children,
  variant = 'solid',
  color = 'primary',
  size = 'md',
  isLoading,
  isDisabled,
  type = 'button',
  fullWidth,
  onPress,
  className,
}: ButtonProps) {
  return (
    <HeroButton
      variant={variant}
      color={color}
      size={size}
      isLoading={isLoading}
      isDisabled={isDisabled}
      type={type}
      fullWidth={fullWidth}
      onPress={onPress}
      className={className}
    >
      {children}
    </HeroButton>
  );
}
