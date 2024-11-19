'use client'

import { Button } from '@/app/_components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/app/_components/ui/dialog'
import { BotIcon, Loader2Icon } from 'lucide-react'
import { generateAiReport } from '../_actions/generate-ai-report'
import { useState } from 'react'
import { ScrollArea } from '@/app/_components/ui/scroll-area'
import MarkDown from 'react-markdown'
import Link from 'next/link'

interface ReportButtonProps {
  hasPremiumPlan: boolean
  month: string
}

const AiReportButton = ({ month, hasPremiumPlan }: ReportButtonProps) => {
  const [report, setReport] = useState<string | null>(null)
  const [reportIsLoading, setReportIsLoading] = useState(false)
  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ month })
      setReport(aiReport)
    } catch (error) {
      console.error(error)
    } finally {
      setReportIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          Relatório IA <BotIcon />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        {hasPremiumPlan ? (
          <>
            {' '}
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Use inteligência artificial para gerar um relatório com insights
                sobre suas finanças
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <MarkDown>{report}</MarkDown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            {' '}
            <DialogHeader>
              <DialogTitle>Relatório IA</DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar um relatório com IA
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="prose max-h-[450px] text-white prose-h3:text-white prose-h4:text-white prose-strong:text-white">
              <MarkDown>{report}</MarkDown>
            </ScrollArea>
            <DialogFooter>
              <DialogClose>
                <Button variant="ghost">Cancelar</Button>
              </DialogClose>
              <Button asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default AiReportButton
