'use client'
import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { supabase } from '@/lib/supabase' // Импорт синглтона

const OrdersChart = dynamic(() => import('../components/Chart/Chart'), {
  ssr: false,
  loading: () => <div className="h-full flex items-center justify-center">Загрузка...</div>
})

export default function Dashboard() {
  const [data, setData] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const { data: orders } = await supabase
        .from('orders')
        .select('total_sum, created_at')
        .order('created_at', { ascending: true })

      if (orders) {
        const chartData = orders.reduce((acc: any, curr: any) => {
          const date = new Date(curr.created_at).toISOString().split('T')[0]
          acc[date] = (acc[date] || 0) + Number(curr.total_sum)
          return acc
        }, {})
        setData(Object.entries(chartData).map(([date, sum]) => ({ date, sum })))
      }
    }
    fetchData()
  }, [])

  return (
    <main className="p-10 bg-slate-50 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white p-6 rounded-xl shadow-md border border-slate-200">
        <h2 className="text-xl font-bold mb-6 text-slate-800">Выручка из RetailCRM</h2>
        <div className="w-full h-[400px]">
          {data.length > 0 ? <OrdersChart data={data} /> : "Загрузка..."}
        </div>
      </div>
    </main>
  )
}
