import { getHACKNYUProgram, getHACKNYUProgramId } from '@project/anchor'
import { useConnection } from '@solana/wallet-adapter-react'
import { Cluster, Keypair, PublicKey } from '@solana/web3.js'
import { useMutation, useQuery } from '@tanstack/react-query'

import { useMemo } from 'react'
import toast from 'react-hot-toast'
import { useCluster } from '../cluster/cluster-data-access'
import { useAnchorProvider } from '../solana/solana-provider'
import { useTransactionToast } from '../ui/ui-layout'

export function useHACKNYUProgram() {
  const { connection } = useConnection()
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const provider = useAnchorProvider()
  const programId = useMemo(() => getHACKNYUProgramId(cluster.network as Cluster), [cluster])
  const program = useMemo(() => getHACKNYUProgram(provider, programId), [provider, programId])

  const accounts = useQuery({
    queryKey: ['HACKNYU', 'all', { cluster }],
    queryFn: () => program.account.HACKNYU.all(),
  })

  const getProgramAccount = useQuery({
    queryKey: ['get-program-account', { cluster }],
    queryFn: () => connection.getParsedAccountInfo(programId),
  })

  const initialize = useMutation({
    mutationKey: ['HACKNYU', 'initialize', { cluster }],
    mutationFn: (keypair: Keypair) =>
      program.methods.initialize().accounts({ HACKNYU: keypair.publicKey }).signers([keypair]).rpc(),
    onSuccess: (signature) => {
      transactionToast(signature)
      return accounts.refetch()
    },
    onError: () => toast.error('Failed to initialize account'),
  })

  return {
    program,
    programId,
    accounts,
    getProgramAccount,
    initialize,
  }
}

export function useHACKNYUProgramAccount({ account }: { account: PublicKey }) {
  const { cluster } = useCluster()
  const transactionToast = useTransactionToast()
  const { program, accounts } = useHACKNYUProgram()

  const accountQuery = useQuery({
    queryKey: ['HACKNYU', 'fetch', { cluster, account }],
    queryFn: () => program.account.HACKNYU.fetch(account),
  })

  const closeMutation = useMutation({
    mutationKey: ['HACKNYU', 'close', { cluster, account }],
    mutationFn: () => program.methods.close().accounts({ HACKNYU: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accounts.refetch()
    },
  })

  const decrementMutation = useMutation({
    mutationKey: ['HACKNYU', 'decrement', { cluster, account }],
    mutationFn: () => program.methods.decrement().accounts({ HACKNYU: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const incrementMutation = useMutation({
    mutationKey: ['HACKNYU', 'increment', { cluster, account }],
    mutationFn: () => program.methods.increment().accounts({ HACKNYU: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  const setMutation = useMutation({
    mutationKey: ['HACKNYU', 'set', { cluster, account }],
    mutationFn: (value: number) => program.methods.set(value).accounts({ HACKNYU: account }).rpc(),
    onSuccess: (tx) => {
      transactionToast(tx)
      return accountQuery.refetch()
    },
  })

  return {
    accountQuery,
    closeMutation,
    decrementMutation,
    incrementMutation,
    setMutation,
  }
}
