import { Text } from '@ggalupo-ui/react'
import { NextSeo } from 'next-seo'
import { ArrowLeft } from 'phosphor-react'

import { Link } from '../../components'

import { Container, Heading, MobileBackLinkContainer } from './styles'

export default function PrivacyPolicy() {
  return (
    <>
      <NextSeo title="Privacy Policy | GG Calendar" />

      <Container>
        <Link href="/">
          <ArrowLeft size={20} /> Back to home page
        </Link>
        <Heading as="h1" size="xl">
          Privacy policy
        </Heading>
        <Text>
          GG Calendar is a service offered to users who wish to let other people
          schedule meetings with them. The App accesses the user&apos;s calendar
          on Google Calendar to allow other users to schedule a call. In this
          privacy policy, we explain how we collect, use, and protect your
          personal information.
        </Text>

        <Heading as="h2" size="md">
          Information Collection
        </Heading>
        <Text>
          To use the App, you need to allow it to access your Google Calendar.
          We need this to let other people scheduling calls with you.
          Additionally, we may collect additional information such as your name,
          email address and profile picture.
        </Text>

        <Heading as="h2" size="md">
          Use of Information
        </Heading>
        <Text>
          The information collected by the App is used to provide the calendar
          scheduling service. We do not share your personal information with
          third parties without your consent, except where required by law or
          where we believe disclosure is necessary to protect our rights or to
          comply with a legal obligation.
        </Text>

        <Heading as="h2" size="md">
          Information Protection
        </Heading>
        <Text>
          We take measures to protect your personal information against loss,
          misuse, and unauthorized access, alteration, or destruction. We store
          your information on secure servers.
        </Text>

        <Heading as="h2" size="md">
          Information Retention
        </Heading>
        <Text>
          The information collected by the App is stored for as long as
          necessary to provide the calendar scheduling service.
        </Text>

        <Heading as="h2" size="md">
          Changes to this Privacy Policy
        </Heading>
        <Text>
          We reserve the right to modify this privacy policy at any time. If we
          make significant changes to how we collect, use, or protect your
          personal information, we will notify you by e-mail.
        </Text>

        <Heading as="h2" size="md">
          Contact
        </Heading>
        <Text>
          If you have any questions or concerns about our privacy policy, or how
          we handle your personal information, please contact us at
          ggalupo2@gmail.com
        </Text>

        <MobileBackLinkContainer>
          <Link href="/">
            <ArrowLeft size={20} /> Back to home page
          </Link>
        </MobileBackLinkContainer>
      </Container>
    </>
  )
}
