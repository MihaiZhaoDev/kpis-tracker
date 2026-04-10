import { Modal as HeroModal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@heroui/react';
import { ReactNode } from 'react';

export interface ModalProps {
  isOpen: boolean; onClose: () => void; title?: string;
  children: ReactNode; footer?: ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ isOpen, onClose, title, children, footer, size = 'md' }: ModalProps) {
  return (
    <HeroModal isOpen={isOpen} onClose={onClose} size={size}>
      <ModalContent>
        {title && <ModalHeader>{title}</ModalHeader>}
        <ModalBody>{children}</ModalBody>
        {footer && <ModalFooter>{footer}</ModalFooter>}
      </ModalContent>
    </HeroModal>
  );
}
