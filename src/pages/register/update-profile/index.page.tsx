import {
  Avatar,
  Button,
  Heading,
  MultiStep,
  Text,
  TextArea,
} from '@ggalupo-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { type GetServerSideProps } from 'next'
import { getServerSession } from 'next-auth'
import { useSession } from 'next-auth/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { NextSeo } from 'next-seo'

import { buildNextAuthOptions } from '../../api/auth/[...nextauth].api'
import { api } from '../../../lib'
import { Container, Header } from '../styles'

import { FormAnottation, ProfileBox } from './styles'

const updateProfileFormSchema = z.object({
  bio: z.string(),
})

type UpdateProfileData = z.infer<typeof updateProfileFormSchema>

export default function UpdateProfile() {
  const { data: session } = useSession()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<UpdateProfileData>({
    resolver: zodResolver(updateProfileFormSchema),
    defaultValues: {
      bio: '',
    },
  })

  const handleUpdateProfile = async (data: UpdateProfileData) => {
    try {
      await api.put('/users/update-profile', {
        bio: data.bio,
      })

      await router.push(`/schedule/${session?.user.username}`)
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <>
      <NextSeo title="Update your profile | GG Calendar" noindex />

      <Container>
        <Header>
          <Heading as="strong">Welcome to GG Calendar!</Heading>
          <Text>Last step! Let people know a bit more about yourself.</Text>

          <MultiStep size={4} currentStep={4} />
        </Header>

        <ProfileBox as="form" onSubmit={handleSubmit(handleUpdateProfile)}>
          <label>
            <Text>Profile picture</Text>
            <Avatar
              size="lg"
              src={session?.user.avatar_url}
              alt={session?.user.name}
            />
          </label>

          <label>
            <Text size="sm">About yourself</Text>
            <TextArea {...register('bio')} />
            <FormAnottation size="sm">
              This will be shown on your profile page, and can be changed any
              time you want.
            </FormAnottation>
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Finish register
            <ArrowRight />
          </Button>
        </ProfileBox>
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
  return {
    props: {
      session,
    },
  }
}
