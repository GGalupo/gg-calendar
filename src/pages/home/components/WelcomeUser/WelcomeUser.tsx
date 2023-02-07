import { Avatar, Text, Button } from '@ggalupo-ui/react'
import { signOut } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'

import { Container, SignOutButton } from './styles'

interface WelcomeUserProps {
  userInfo: {
    name: string
    avatarUrl: string
  }
}

export const WelcomeUser = ({ userInfo }: WelcomeUserProps) => {
  return (
    <>
      <Container>
        <Avatar size="lg" src={userInfo.avatarUrl} alt={userInfo.name} />
        <div>
          <Text size="lg">Welcome, {userInfo.name}!</Text>
          <Button type="button">
            Go to your calendar <ArrowRight />
          </Button>
        </div>
      </Container>
      <SignOutButton variant="tertiary" onClick={() => signOut()}>
        Sign out from my account
      </SignOutButton>
    </>
  )
}
