import { Box, styled } from '@ggalupo-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr auto',
  gap: '$3',
  margin: '$4 0 $2',
  padding: '$4',

  '@media(max-width: 600px)': {
    gridTemplateColumns: '1fr',
  },
})

export const SignInButton = styled('button', {})
