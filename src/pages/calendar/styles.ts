import { Box, Heading, styled, Text } from '@ggalupo-ui/react'

export const Container = styled('div', {
  maxWidth: 1180,
  padding: '$6 $4',
  margin: '$6 auto $4',
})

export const UserInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',

  [`> ${Heading}`]: {
    fontWeight: '$medium',
    lineHeight: '$base',
    marginTop: '$2',
  },

  [`> ${Text}`]: {
    color: '$gray200',
    marginBottom: '$4',
  },

  button: {
    '& + &': {
      marginTop: '$1',
    },
  },
})

export const CalendarContainer = styled(Box, {
  margin: '$8 0',
  padding: 0,
  display: 'grid',
  maxWidth: '100%',
  gridTemplateColumns: '1fr',

  '@media(min-width: 800px)': {
    position: 'relative',
    gridTemplateColumns: '1fr 350px',
  },
})

export const SchedulingsContainer = styled('aside', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$4',
  padding: '$6',
  borderTop: '2px dashed $gray500',

  [`> ${Text}`]: {
    marginBottom: '$2',
    display: 'block',
    fontWeight: '$medium',
  },

  [`${Heading}`]: {
    textDecoration: 'underline',
    marginBottom: '$4',
  },

  '@media(min-width: 800px)': {
    borderTop: 0,
    borderLeft: '2px dashed $gray500',
    overflowY: 'auto',
    position: 'absolute',
    width: 350,
    top: 0,
    bottom: 0,
    right: 0,
  },
})

export const Scheduling = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$1',
  margin: '$4 0 $4 $4',
  position: 'relative',

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '$2',

    time: {
      fontWeight: '$medium',
    },
  },

  '&::before': {
    content: '',
    width: 4,
    height: '100%',
    background: '$grass500',
    position: 'absolute',
    left: -16,
  },

  variants: {
    alreadyEnded: {
      true: {
        textDecoration: 'line-through',
        opacity: 0.8,
      },
    },
  },
})
