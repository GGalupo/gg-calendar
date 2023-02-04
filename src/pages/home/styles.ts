import { styled, Heading, Text } from '@ggalupo-ui/react'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$5',
  marginLeft: 'auto',
  maxWidth: 'calc(100vw - (100vw - 1160px) / 2)',
  height: '100vh',

  '@media(min-width: 1200px)': {
    gap: '$16',
  },
})

export const Hero = styled('div', {
  maxWidth: 580,
  padding: '0 $10',

  [`> ${Heading}`]: {
    '@media(min-width: 900px)': {
      fontSize: '$6xl',
    },
    marginBottom: '$2',
  },

  [`> ${Text}`]: {
    '&:first-child': {
      color: 'red',
    },
  },

  '@media(min-width: 900px)': {
    maxWidth: 500,
  },
})

export const Preview = styled('div', {
  display: 'none',
  padding: '$8',
  overflow: 'hidden',

  '@media(min-width: 900px)': {
    display: 'block',
  },
})
