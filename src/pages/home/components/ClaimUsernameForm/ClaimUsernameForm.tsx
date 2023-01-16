import { Button, TextInput, Text } from '@ggalupo-ui/react'
import { ArrowRight } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { Form, FormAnnotation } from './styles'

const claimUsernameFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must have at least 3 characters.')
    .regex(/^([a-z\\\\-]+)$/i, 'Username must have only letters and hyphens.')
    .transform((username) => username.toLowerCase()),
})

type ClaimUsernameFormData = z.infer<typeof claimUsernameFormSchema>

export const ClaimUsernameForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClaimUsernameFormData>({
    resolver: zodResolver(claimUsernameFormSchema),
  })

  const handleClaimUsername = (data: ClaimUsernameFormData) => {
    console.log(data)
  }

  return (
    <>
      <Form onSubmit={handleSubmit(handleClaimUsername)} as="form">
        <TextInput
          size="sm"
          placeholder="Your username"
          {...register('username')}
        />
        <Button size="sm" type="submit">
          Schedule now
          <ArrowRight />
        </Button>
      </Form>
      <FormAnnotation>
        <Text size="sm">
          {errors.username
            ? errors.username.message
            : 'Enter the username to schedule an appointment.'}
        </Text>
      </FormAnnotation>
    </>
  )
}
