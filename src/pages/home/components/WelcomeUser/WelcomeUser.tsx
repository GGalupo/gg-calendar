import { Avatar, Text, Button } from '@ggalupo-ui/react'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'

import { Container } from './styles'

export const WelcomeUser = () => {
  const { data: session } = useSession()

  return (
    <Container>
      <Avatar
        size="lg"
        src={session?.user.avatar_url}
        alt={session?.user.name}
      />
      <div>
        <Text size="lg">Welcome, {session?.user.name}!</Text>
        <Button type="button">
          Go to your calendar <ArrowRight />
        </Button>
      </div>
    </Container>
  )
}
