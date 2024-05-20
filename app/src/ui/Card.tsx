import { Card as RadixCard, Box, Heading, Text } from '@radix-ui/themes';
import { PropsWithChildren } from 'react';

interface Props {
  title: string;
  description: string;
}

export function Card({ title, description, children }: PropsWithChildren<Props>) {
  return (
    <RadixCard className="p-4">
      <Box mb="3">
        <Heading as="h2">{title}</Heading>
        <Text>{description}</Text>
      </Box>
      {children}
    </RadixCard>
  )
}