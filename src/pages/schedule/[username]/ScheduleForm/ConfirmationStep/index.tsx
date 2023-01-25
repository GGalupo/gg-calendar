import { Button, Text, TextArea, TextInput } from '@ggalupo-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import dayjs from 'dayjs'
import { CalendarBlank, Clock } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { ConfirmationForm, FormActions, FormError, FormHeader } from './styles'

const confirmationFormSchema = z.object({
  name: z.string().min(3, { message: 'Name must have at least 3 characters.' }),
  email: z.string().email({ message: 'E-mail address format is not valid.' }),
  observations: z.string().nullable(),
})

type ConfirmationFormData = z.infer<typeof confirmationFormSchema>

type ConfirmationStepProps = {
  scheduledDateTime: Date
  onCancelConfirmation: () => void
}

export const ConfirmationStep = ({
  scheduledDateTime,
  onCancelConfirmation,
}: ConfirmationStepProps) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ConfirmationFormData>({
    resolver: zodResolver(confirmationFormSchema),
  })

  const handleScheduling = (data: ConfirmationFormData) => {
    console.log(data)
  }

  const formattedScheduledDate =
    dayjs(scheduledDateTime).format('MMMM DD, YYYY')
  const formattedScheduledTime = dayjs(scheduledDateTime).format('hh:mm A')

  return (
    <ConfirmationForm as="form" onSubmit={handleSubmit(handleScheduling)}>
      <FormHeader>
        <Text>
          <CalendarBlank />
          {formattedScheduledDate}
        </Text>
        <Text>
          <Clock />
          {formattedScheduledTime}
        </Text>
      </FormHeader>

      <label>
        <Text size="sm">Full name</Text>
        <TextInput placeholder="Your full name" {...register('name')} />
        {errors.name && <FormError size="sm">{errors.name.message}</FormError>}
      </label>

      <label>
        <Text size="sm">Your e-mail</Text>
        <TextInput
          type="email"
          placeholder="johndoe@example.com"
          {...register('email')}
        />
        {errors.email && (
          <FormError size="sm">{errors.email.message}</FormError>
        )}
      </label>

      <label>
        <Text size="sm">Observations</Text>
        <TextArea {...register('observations')} />
      </label>

      <FormActions>
        <Button type="button" onClick={onCancelConfirmation} variant="tertiary">
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          Confirm
        </Button>
      </FormActions>
    </ConfirmationForm>
  )
}
