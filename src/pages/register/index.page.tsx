import { Button, Heading, MultiStep, Text, TextInput } from '@ggalupo-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Container, Form, Header } from './styles'

export default function Register() {
  return (
    <Container>
      <Header>
        <Heading as="strong">Welcome to GG Call!</Heading>
        <Text>
          We need some info to create your profile! Don&apos;t worry, you can
          always edit it later!
        </Text>

        <MultiStep size={4} currentStep={1} />
      </Header>

      <Form as="form">
        <label>
          <Text size="sm">Username</Text>
          <TextInput placeholder="Your username" />
        </label>

        <label>
          <Text size="sm">Full name</Text>
          <TextInput placeholder="Your name" />
        </label>

        <Button type="submit">
          Next step
          <ArrowRight />
        </Button>
      </Form>
    </Container>
  )
}
