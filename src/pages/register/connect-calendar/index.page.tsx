import { Button, Heading, MultiStep, Text } from '@ggalupo-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ArrowRight, CalendarPlus, Check } from 'phosphor-react'

import { Container, Header } from '../styles'

import { AuthError, ConnectBox, ConnectedChip, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const { data: session } = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error

  return (
    <Container>
      <Header>
        <Heading as="strong">Connect your calendar!</Heading>
        <Text>
          Connect yout calendar to automatically check the busy hours and new
          events as soon as they&apos;re scheduled.
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Calendar</Text>
          {session ? (
            <ConnectedChip>
              <Text size="sm">Connected</Text>
              <Check />
            </ConnectedChip>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={() => signIn('google')}
            >
              <CalendarPlus />
              Connect
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            An error occured while trying to connect to Google. Check if
            you&apos;ve given permissions to access Google Calendar.
          </AuthError>
        )}
        <Button type="submit" disabled={!session}>
          Next step
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
