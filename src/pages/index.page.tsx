import { Heading, Text } from '@ggalupo-ui/react'
import Image from 'next/image'
import { NextSeo } from 'next-seo'
import { GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'

import { ClaimUsernameForm, WelcomeUser } from './home/components'
import { Container, Header, Hero, Preview } from './home/styles'
import { buildNextAuthOptions } from './api/auth/[...nextauth].api'
import homeImage from '../assets/home-page.svg'
import logoImg from '../assets/logo.png'
import { Link } from '../components'

type HomeProps = {
  userInfo?: {
    name: string
    avatarUrl: string
  }
}

export default function Home({ userInfo }: HomeProps) {
  return (
    <>
      <NextSeo
        title="Hassle-free scheduling | GG Calendar"
        description="Connect your Google calendar and allow people to schedule an appointment with you."
      />

      <Header>
        <Image src={logoImg} alt="GG Calendar's logo" width={125} />
        <Link href="/privacy-policy">Privacy policy</Link>
      </Header>

      <Container>
        <Hero>
          <Heading size="2xl" as="h1">
            Hassle-free scheduling
          </Heading>
          <Text size="lg">
            Connect your Google calendar and allow people to create a scheduling
            with you.
          </Text>
          {userInfo ? (
            <WelcomeUser userInfo={userInfo} />
          ) : (
            <ClaimUsernameForm />
          )}
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

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getServerSession(
    req,
    res,
    buildNextAuthOptions(req, res),
  )

  if (!session) {
    return {
      props: {},
    }
  }

  return {
    props: {
      userInfo: {
        name: session.user.name,
        avatarUrl: session.user.avatar_url,
      },
    },
  }
}
