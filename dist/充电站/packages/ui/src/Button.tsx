import React from 'react';
import { Button as ChakraButton, ButtonProps } from '@chakra-ui/react';

interface CustomButtonProps extends ButtonProps {
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<CustomButtonProps> = ({ variant = 'primary', ...props }) => {
  return (
    <ChakraButton
      colorScheme={variant === 'primary' ? 'blue' : 'gray'}
      {...props}
    />
  );
};

export default Button;