'use client'

import { Button } from '@/app/_components/ui/button'
import { createStripeCheckout } from '../_actions/create-stripe-checkout'
import { loadStripe } from '@stripe/stripe-js'
import { useUser } from '@clerk/nextjs'
import Link from 'next/link'

const AcquirePlanButton = () => {
  const { user } = useUser()

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout()

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe publishable key is not defined')
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    )

    if (!stripe) {
      throw new Error('Stripe is not defined')
    }

    await stripe.redirectToCheckout({ sessionId })
  }

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === 'premium'

  if (!process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL) {
    throw new Error('Stripe customer portal URL is not defined')
  }

  if (hasPremiumPlan) {
    return (
      <Button
        className="w-full rounded-full font-bold text-primary"
        variant="outline"
      >
        <Link
          href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user?.emailAddresses[0].emailAddress}`}
        >
          Gerenciar Plano
        </Link>
      </Button>
    )
  }
  return (
    <Button
      onClick={handleAcquirePlanClick}
      className="w-full rounded-full font-bold"
    >
      Adquirir Plano
    </Button>
  )
}

export default AcquirePlanButton
