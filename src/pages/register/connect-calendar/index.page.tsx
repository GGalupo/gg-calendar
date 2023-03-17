import { Button, Heading, MultiStep, Text } from '@ggalupo-ui/react'
import { signIn, useSession } from 'next-auth/react'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight, CalendarPlus, Check } from 'phosphor-react'

import { Container, Header } from '../styles'

import { AuthError, ConnectBox, ConnectedChip, ConnectItem } from './styles'

export default function ConnectCalendar() {
  const { data: session } = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  const handleCalendarConnection = async () => {
    const callbackUrl = `${process.env.NEXT_PUBLIC_GG_CALENDAR_URL}/register/connect-calendar`
    await signIn('google', { callbackUrl })
  }

  const handleGoToNextStep = async () => {
    await router.push('/register/time-intervals')
  }

  return (
    <>
      <NextSeo title="Connect yout Google Calendar | GG Calendar" noindex />

      <Container>
        <Header>
          <Heading as="strong">Connect your calendar!</Heading>
          <Text>
            Connect your calendar to show your availability and allow people to
            schedule a call with you.
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
                onClick={handleCalendarConnection}
              >
                <CalendarPlus />
                Connect
              </Button>
            )}
          </ConnectItem>

          {hasAuthError && (
            <AuthError level="danger" size="sm">
              An error occured while trying to connect to Google.
              <br />
              Connect again and check if you&apos;ve given permissions to access
              Google Calendar.
            </AuthError>
          )}
          <Button
            type="submit"
            disabled={!session}
            onClick={handleGoToNextStep}
          >
            Next step
            <ArrowRight />
          </Button>
        </ConnectBox>
      </Container>
    </>
  )
}
