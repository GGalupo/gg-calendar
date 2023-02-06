import { Heading, Text } from '@ggalupo-ui/react'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { useSession } from 'next-auth/react'

import { ClaimUsernameForm, WelcomeUser } from './components'
import homeImage from '../../assets/home-page.png'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  const { data: session } = useSession()

  return (
    <>
      <NextSeo
        title="Hassle-free scheduling | GG Call"
        description="Connect your Google calendar and allow people to schedule an appointment with you."
      />

      <Container>
        <Hero>
          <Heading size="2xl" as="h1">
            Hassle-free scheduling
          </Heading>
          <Text size="lg">
            Connect your Google calendar and allow people to create a scheduling
            with you.
          </Text>
          {session ? <WelcomeUser /> : <ClaimUsernameForm />}
        </Hero>
        <Preview>
          <Image
            src={homeImage}
            alt="A calendar showing the app in use"
            height={400}
            quality={100}
            priority
          />
        </Preview>
      </Container>
    </>
  )
}
