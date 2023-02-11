import { Box, styled, Text } from '@ggalupo-ui/react'

export const Form = styled(Box, {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '$3',
  margin: '$4 0 $2',
  padding: '$4',

  '@media(min-width: 600px)': {
    gridTemplateColumns: '1fr auto',
  },
})

export const FormError = styled(Text, {
  marginBottom: '$1',
  fontWeight: '$medium',
})

export const SignInButton = styled('button', {
  background: 'transparent',
  border: 'none',
  color: '$grass300',
  fontWeight: '$bold',
  cursor: 'pointer',
  fontSize: '$sm',

  '&:hover': {
    textDecoration: 'underline',
  },
})
