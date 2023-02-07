import { Button, TextInput, Text } from '@ggalupo-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useRouter } from 'next/router'
import { zodResolver } from '@hookform/resolvers/zod'
import { signIn } from 'next-auth/react'

import { Form, SignInButton } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must have at least 3 characters.')
    .regex(/^([a-z\\\\-]+)$/i, 'Username must have only letters and hyphens.')
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export const ClaimUsernameForm = () => {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const handleClaimUsername = async (data: ClaimUsernameFormData) => {
    const { username } = data

    router.push(`/register?username=${username}`)
  }

  const handleSignIn = async () => {
    await signIn('google')
  }

  return (
    <>
      <Form onSubmit={handleSubmit(handleClaimUsername)} as="form">
        <TextInput
          size="sm"
          placeholder="Choose your username"
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Create calendar
          <ArrowRight />
        </Button>
      </Form>
      <Text>
        Already have an account?{' '}
        <SignInButton onClick={handleSignIn}>Sign in</SignInButton>
      </Text>
      {errors.username && (
        <Text size="sm" level="danger">
          {errors.username.message}
        </Text>
      )}
    </>
  )
}
