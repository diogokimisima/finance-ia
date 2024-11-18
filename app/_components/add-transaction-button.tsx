'use client'

import { ArrowDownUpIcon } from 'lucide-react'
import { Button } from './ui/button'
import { useState } from 'react'
import UpsertTransactionDialog from './upsert-transaction'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

interface AddTransactionButtonProps {
  userCanAddTransaction?: boolean
}

const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  console.log(userCanAddTransaction)
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              className="rounded-full font-bold"
              onClick={() => setDialogIsOpen(true)}
              disabled={!userCanAddTransaction}
            >
              Adicionar transação
              <ArrowDownUpIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {!userCanAddTransaction &&
              'Você atingiu o limite de transações. Atualize o seu plano para criar transações ilimitadas'}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  )
}

export default AddTransactionButton
