import { styled } from '@ggalupo-ui/react'
import NextLink from 'next/link'

export const Link = styled(NextLink, {
  textDecoration: 'none',
  color: '$white',
  fontStyle: 'normal',
  fontFamily: '$default',
  display: 'flex',
  alignItems: 'center',
  gap: '$2',
  svg: {
    color: '$white',
  },

  '&:hover': {
    color: '$grass500',
    svg: {
      color: '$grass500',
    },
  },
})
