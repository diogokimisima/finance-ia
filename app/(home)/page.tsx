import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import Navbar from '../_components/navbar'
import SummaryCards from './_components/summary-cards'
import TimeSelect from './_components/time-select'
import { isMatch } from 'date-fns'
import TransactionPieCharts from './_components/transaction-pie-charts'
import ExpensesPerCategory from './_components/expenses-per-category'
import { getDashboard } from '../_data/get-dashboard'
import LastTransactions from './_components/last-transactions'
import { canUserAddTransaction } from '../_data/can-user-add-transaction'
// import AiReportButton from "./_components/ai-report-button";

interface HomeProps {
  searchParams: {
    month: string
  }
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }

  const monthIsInvalid = !month || !isMatch(month, 'MM')

  if (monthIsInvalid) {
    redirect(`?month=${new Date().getMonth() + 1}`)
  }

  const dashboard = await getDashboard(month)
  const userCanAddTransaction = await canUserAddTransaction()
  return (
    <>
      <Navbar />
      <div className="flex flex-col gap-4 space-y-6 overflow-hidden p-6 text-red-500">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center gap-3">
            {/* <AiReportButton /> */}
            <TimeSelect />
          </div>
        </div>
        <div className="grid grid-cols-[2fr,1fr] gap-6">
          <div className="flex flex-col gap-6 overflow-hidden">
            <SummaryCards
              userCanAddTransaction={userCanAddTransaction}
              month={month}
              {...dashboard}
            />
            <div className="grid grid-cols-3 grid-rows-1 gap-6">
              <TransactionPieCharts {...dashboard} />
              <ExpensesPerCategory
                expensesPerCategory={dashboard.totalExpensePerCategory}
              />
            </div>
          </div>
          <LastTransactions lastTransactions={dashboard.lastTransactions} />
        </div>
      </div>
    </>
  )
}

export default Home
