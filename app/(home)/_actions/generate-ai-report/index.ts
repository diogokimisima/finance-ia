'use server'

import { db } from '@/app/_lib/prisma'

export const generateAiReport = async (month: string) => {
  const currentYear = new Date().getFullYear()

  // Pegar as transações do mês recebido
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`${currentYear}-${month}-01`), // Usando o ano atual
        lte: new Date(`${currentYear}-${month}-31`), // Usando o ano atual
      },
    },
  })

  // Mandar as transações para o ChatGPT e pedir para ele gerar um relatório com insights
  // Pegar o relatório gerado pelo ChatGPT e retornar para o usuário
}
