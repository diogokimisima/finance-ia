'use server'

import { db } from '@/app/_lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import { generateAiReportSchema, GenerateAiReportSchema } from './schema'

export const generateAiReport = async ({ month }: GenerateAiReportSchema) => {
  generateAiReportSchema.parse({ month })
  const { userId } = await auth()
  console.log('User ID:', userId)
  const currentYear = new Date().getFullYear()
  if (!userId) {
    throw new Error('Unauthorized')
  }
  const clerk = await clerkClient()
  const user = await clerk.users.getUser(userId)
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === 'premium'

  if (!hasPremiumPlan) {
    throw new Error('You need to be a premium user to generate a report')
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  })

  // Pegar as transações do mês recebido
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${currentYear}-${month}-01`),
        lte: new Date(`${currentYear}-${month}-31`),
      },
    },
  })

  // Mandar as transações para o ChatGPT e pedir para ele gerar um relatório com insights
  const content = `Gere um relatório com insights sobre as minhas finanças com dicas e orientações de como melhorar minha vida financeira. As transações estão divididas por ponto e vírgula. A estrutura de cada uma é {DATA}-{TIPO}-{VALOR}-{CATEGORIA}. São elas: 
  ${transactions
    .map(
      (transaction) =>
        `${transaction.date.toLocaleDateString('pt-BR')}-R$ ${transaction.amount}-${transaction.type}-${transaction.category}`,
    )
    .join(';')}`

  const completion = await openAi.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content:
          'Você é um especialista em gestão e organização de finanças pessoais. Você ajuda as pessoas a organizarem melhor as suas finanças.',
      },
      {
        role: 'user',
        content,
      },
    ],
  })
  // Pegar o relatório gerado pelo ChatGPT e retornar para o usuário
  return completion.choices[0].message.content
}
