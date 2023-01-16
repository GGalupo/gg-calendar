import { Button, TextInput } from '@ggalupo-ui/react'
import { ArrowRight } from 'phosphor-react'

import { Form } from './styles'

export const ClaimUsernameForm = () => {
  return (
    <Form as="form">
      <TextInput size="sm" placeholder="Your username" />
      <Button size="sm" type="submit">
        Schedule now
        <ArrowRight />
      </Button>
    </Form>
  )
}
