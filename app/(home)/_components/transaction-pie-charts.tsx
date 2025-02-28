'use client'

import { Pie, PieChart } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/app/_components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/app/_components/ui/chart'
import { TransactionType } from '@prisma/client'
import { TransactionPercentagePerType } from '@/app/_data/get-dashboard/types'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import PercentageItem from './percetange-item'

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investido',
    color: '#FFFFFF',
  },
  [TransactionType.DEPOSIT]: {
    label: 'Receita',
    color: '#55B02E',
  },
  [TransactionType.EXPENSE]: {
    label: 'Despesas',
    color: '#E93030',
  },
} satisfies ChartConfig

interface TransactionPieChartsProps {
  typesPercentage: TransactionPercentagePerType
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

const TransactionPieCharts = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionPieChartsProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: '#55B02E',
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: '#FFFFFF',
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: '#E93030',
    },
  ]
  return (
    <Card className="flex flex-col p-6">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pie Chart - Donut</CardTitle>
        <CardDescription>January - June 2025</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={60}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-2">
          <PercentageItem
            icon={<TrendingUpIcon size={16} className="text-primary" />}
            title="Receita"
            value={typesPercentage.DEPOSIT}
          />
          <PercentageItem
            icon={<TrendingDownIcon size={16} className="text-red-500" />}
            title="Investido"
            value={typesPercentage.INVESTMENT}
          />
          <PercentageItem
            icon={<PiggyBankIcon size={16} />}
            title="Despesas"
            value={typesPercentage.EXPENSE}
          />
        </div>
      </CardContent>
    </Card>
  )
}

export default TransactionPieCharts
