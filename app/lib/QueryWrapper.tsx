'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "react-hot-toast";


const queryClient = new QueryClient()

const QueryWrapper = ({children}: {children: React.ReactNode}) => (
  <QueryClientProvider client={queryClient}>
    <Toaster />
    {children}
  </QueryClientProvider>
)

export default QueryWrapper;