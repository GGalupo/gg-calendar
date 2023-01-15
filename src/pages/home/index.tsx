import Head from 'next/head'
import { Heading, Text } from '@ggalupo-ui/react'
import Image from 'next/image'

import homeImage from '../../assets/home-page.png'
import { Container, Hero, Preview } from './styles'

export default function Home() {
  return (
    <>
      <Head>
        <title>GG Call</title>
      </Head>

      <Container>
        <Hero>
          <Heading size="4xl" as="h1">
            Hassle-free scheduling
          </Heading>
          <Text size="xl">
            Connect your calendar and allow people to schedule an appointment
            with you.
          </Text>
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
