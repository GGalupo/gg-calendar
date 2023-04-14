import { Heading as UIHeading, styled } from '@ggalupo-ui/react'

export const Container = styled('div', {
  maxWidth: 1080,
  padding: '$4',
  margin: '$10 auto 0',
})

export const Heading = styled(UIHeading, {
  marginBottom: '$2',
  marginTop: '$8',
})

export const MobileBackLinkContainer = styled('div', {
  margin: '$8 0',

  '@media(min-width: 800px)': {
    display: 'none',
  },
})
