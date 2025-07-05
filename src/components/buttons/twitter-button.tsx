import { Button, ButtonProps } from '@mantine/core';
import { TwitterIcon } from '@mantinex/dev-icons';
import { ComponentPropsWithoutRef } from 'react';

export function TwitterButton(props: ButtonProps & ComponentPropsWithoutRef<'button'>) {
  return (
    <Button leftSection={<TwitterIcon size={16} color="#00ACEE" />} variant="default" {...props} />
  );
}