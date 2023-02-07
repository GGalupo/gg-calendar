import { GetStaticPaths, type GetStaticProps } from 'next'
import { Avatar, Heading, Text } from '@ggalupo-ui/react'
import { NextSeo } from 'next-seo'

import { prisma } from '../../../lib/prisma'

import { Container, UserHeader } from './styles'
import { ScheduleForm } from './ScheduleForm'

interface ScheduleProps {
  user: {
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Schedule({
  user: { name, bio, avatarUrl },
}: ScheduleProps) {
  return (
    <>
      <NextSeo title={`Scheduling with ${name} | GG Calendar`} />

      <Container>
        <UserHeader>
          <Avatar size="lg" src={avatarUrl} />
          <Heading>{name}</Heading>
          <Text>{bio}</Text>
        </UserHeader>

        <ScheduleForm />
      </Container>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const username = String(params?.username)

  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  })

  if (!user) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      user: {
        name: user.name,
        bio: user.bio,
        avatarUrl: user.avatar_url,
      },
    },
    revalidate: 60 * 60 * 24, // 1d
  }
}
