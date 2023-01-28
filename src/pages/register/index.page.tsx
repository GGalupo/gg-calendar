import { Button, Heading, MultiStep, Text, TextInput } from '@ggalupo-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import { ArrowRight } from 'phosphor-react'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { api } from '../../lib'

import { Container, Form, FormError, Header } from './styles'

const registerFormSchema = z.object({
  username: z
    .string()
    .min(3, 'Username must have at least 3 characters.')
    .regex(/^([a-z\\\\-]+)$/i, 'Username must have only letters and hyphens.')
    .transform((username) => username.toLowerCase()),
  name: z.string().min(3, 'Name must have at least 3 characters.'),
})

type RegisterFormData = z.infer<typeof registerFormSchema>

export default function Register() {
  const { query, push } = useRouter()
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: '',
      name: '',
    },
  })

  useEffect(() => {
    if (query.username) {
      setValue('username', query.username.toString())
    }
  }, [query.username, setValue])

  const handleRegister = async (data: RegisterFormData) => {
    try {
      await api.post('/users', {
        name: data.name,
        username: data.username,
      })

      await push('/register/connect-calendar')
    } catch (e) {
      if (e instanceof AxiosError && e.response?.data?.message) {
        alert(e.response.data.message)
        return
      }

      console.error(e)
    }
  }

  return (
    <>
      <NextSeo title="Create an account | GG Call" />

      <Container>
        <Header>
          <Heading as="strong">Welcome to GG Call!</Heading>
          <Text>
            We need some info to create your profile! Don&apos;t worry, you can
            always edit it later!
          </Text>

          <MultiStep size={4} currentStep={1} />
        </Header>

        <Form as="form" onSubmit={handleSubmit(handleRegister)}>
          <label>
            <Text size="sm">Username</Text>
            <TextInput placeholder="Your username" {...register('username')} />
            {errors.username && (
              <FormError size="sm">{errors.username.message}</FormError>
            )}
          </label>

          <label>
            <Text size="sm">Full name</Text>
            <TextInput placeholder="Your name" {...register('name')} />
            {errors.name && (
              <FormError size="sm">{errors.name.message}</FormError>
            )}
          </label>

          <Button type="submit" disabled={isSubmitting}>
            Next step
            <ArrowRight />
          </Button>
        </Form>
      </Container>
    </>
  )
}
