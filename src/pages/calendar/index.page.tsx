import { useMemo, useState } from 'react'
import { type GetServerSideProps } from 'next'
import {
  Avatar,
  Button,
  Heading,
  Text,
  Modal,
  ModalActions,
  ModalWrapper,
  ModalHeader,
  TextArea,
} from '@ggalupo-ui/react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NextSeo } from 'next-seo'
import { getServerSession } from 'next-auth'
import { Clock } from 'phosphor-react'
import dayjs from 'dayjs'
import { zodResolver } from '@hookform/resolvers/zod'

import { Calendar as CalendarComponent } from '../../components'
import { api } from '../../lib'
import { prisma } from '../../lib/prisma'
import { buildNextAuthOptions } from '../api/auth/[...nextauth].api'

import {
  Bio,
  BioLabel,
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

const updateBioSchema = z.object({
  bio: z.string(),
})
type UpdateBioFormData = z.infer<typeof updateBioSchema>

export default function Calendar({
  user: { username, name, bio, avatarUrl },
}: CalendarProps) {
  const [isUpdateBioModalOpen, setIsUpdateBioModalOpen] = useState(false)
  const [isUpdatingBio, setIsUpdatingBio] = useState(false)
  const [userBio, setUserBio] = useState(bio)

  const {
    register,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm({
    defaultValues: {
      bio: useMemo(() => userBio, [userBio]),
    },
    resolver: zodResolver(updateBioSchema),
  })
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  const weekDay = selectedDate ? dayjs(selectedDate).format('dddd') : null
  const monthYear = selectedDate ? dayjs(selectedDate).format('MMMM DD') : null

  const updateBio = async (data: UpdateBioFormData) => {
    setIsUpdatingBio(true)

    try {
      await api.put('/users/update-profile', {
        bio: data.bio,
      })

      setUserBio(data.bio)
      reset({
        bio: data.bio,
      })
      setIsUpdateBioModalOpen(false)
    } catch (e) {
      console.error(e)
    } finally {
      setIsUpdatingBio(false)
    }
  }

  return (
    <>
      <NextSeo title={`Your calendar | GG Calendar`} noindex />

      <Container>
        <UserInfo>
          <Avatar size="lg" src={avatarUrl} />
          <Heading size="sm">{name}</Heading>
          <Bio size="sm">{userBio}</Bio>
          <Modal
            open={isUpdateBioModalOpen}
            onOpenChange={() =>
              setIsUpdateBioModalOpen((prevState) => !prevState)
            }
          >
            <Button
              variant="tertiary"
              onClick={() => setIsUpdateBioModalOpen(true)}
            >
              Change my bio
            </Button>
            <ModalWrapper>
              <ModalHeader>Update your bio</ModalHeader>

              <form aria-label="Update bio" onSubmit={handleSubmit(updateBio)}>
                <BioLabel htmlFor="bio" size="sm" as="label">
                  Bio
                </BioLabel>
                <TextArea
                  id="bio"
                  style={{ width: '100%' }}
                  placeholder="Enter your new bio"
                  {...register('bio')}
                />
                <ModalActions>
                  <Button
                    variant="tertiary"
                    onClick={() => setIsUpdateBioModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button disabled={isUpdatingBio || !isDirty}>
                    Update bio
                  </Button>
                </ModalActions>
              </form>
            </ModalWrapper>
          </Modal>
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
        bio: user.bio ?? '',
        avatarUrl: user.avatar_url,
        username: user.username,
      },
    },
  }
}
