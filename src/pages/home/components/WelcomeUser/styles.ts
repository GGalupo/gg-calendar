import { Box, Button, styled, Text } from '@ggalupo-ui/react'

export const Container = styled(Box, {
  display: 'flex',
  alignItems: 'center',
  gap: '$6',
  marginTop: '$4',

  [`${Text}`]: {
    color: '$gray100',
    marginBottom: '$2',
  },
})

export const SignOutButton = styled(Button, {
  padding: '$0',
  marginLeft: '$1',

  '&:hover': {
    color: '$danger400 !important',
  },
})
