import { styled, Heading, Text } from '@ggalupo-ui/react'

export const Container = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '$5',
  margin: '0 auto',
  maxWidth: '1360px',
  height: 'calc(100vh - 3.5rem)',

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
  overflow: 'hidden',

  img: {
    width: '33rem',
    height: '29rem',
  },

  '@media(min-width: 1000px)': {
    display: 'block',
  },

  '@media(min-width: 1200px)': {
    img: {
      width: '40rem',
      height: '30rem',
    },
  },
})

export const Footer = styled('footer', {
  height: '3.5rem',
  maxWidth: '1360px',
  margin: '0 auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})
