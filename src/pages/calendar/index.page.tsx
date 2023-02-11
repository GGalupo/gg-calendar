import { useState } from 'react'
import { type GetServerSideProps } from 'next'
import { Avatar, Button, Heading, Text } from '@ggalupo-ui/react'
import { NextSeo } from 'next-seo'
import { getServerSession } from 'next-auth'
import { Clock } from 'phosphor-react'
import dayjs from 'dayjs'

import { Calendar as CalendarComponent } from '../../components'
import { prisma } from '../../lib/prisma'
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api'

import {
  CalendarContainer,
  Container,
  Scheduling,
  SchedulingsContainer,
  UserInfo,
} from './styles'

interface CalendarProps {
  user: {
    username: string
    name: string
    bio: string
    avatarUrl: string
  }
}

export default function Calendar({
  user: { username, name, bio, avatarUrl },
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const monthYear = selectedDate ? dayjs(selectedDate).format('MMMM DD') : null

  return (
    <>
      <NextSeo title={`Your calendar | GG Calendar`} noindex />

      <Container>
        <UserInfo>
          <Avatar size="lg" src={avatarUrl} />
          <Heading size="sm">{name}</Heading>
          <Text>{bio}</Text>
          <Button variant="tertiary">Change my bio</Button>
          <Button variant="secondary">Edit availability</Button>
        </UserInfo>

        <CalendarContainer>
          <CalendarComponent
            username={username}
            onDateSelected={setSelectedDate}
          />
          <SchedulingsContainer>
            <Text as="time">
              {weekDay}, <span>{monthYear}</span>
            </Text>

            <section>
              <Heading size="sm">Schedules</Heading>
              <Scheduling alreadyEnded>
                <header>
                  <Clock size={18} />
                  <Text size="sm" as="time">
                    08:00 AM - 09:00 AM
                  </Text>
                </header>

                <Text size="sm">Gustavo Galupo</Text>
              </Scheduling>

              <Scheduling alreadyEnded>
                <header>
                  <Clock size={18} />
                  <Text size="sm" as="time">
                    11:00 AM - 12:00 AM
                  </Text>
                </header>

                <Text size="sm">Gustavo Galupo</Text>
              </Scheduling>
              <Scheduling>
                <header>
                  <Clock size={18} />
                  <Text size="sm" as="time">
                    02:00 PM - 03:00 PM
                  </Text>
                </header>

                <Text size="sm">Gustavo Galupo</Text>
              </Scheduling>

              <Scheduling>
                <header>
                  <Clock size={18} />
                  <Text size="sm" as="time">
                    06:00 PM - 07:00 PM
                  </Text>
                </header>

                <Text size="sm">Gustavo Galupo</Text>
              </Scheduling>
            </section>

            <section>
              <Heading size="sm">Available times</Heading>
              <Text>There are no available times left.</Text>
            </section>
          </SchedulingsContainer>
        </CalendarContainer>
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
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = await prisma.user.findUnique({
    where: {
      username: session.user.username,
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
        username: user.username,
      },
    },
  }
}
