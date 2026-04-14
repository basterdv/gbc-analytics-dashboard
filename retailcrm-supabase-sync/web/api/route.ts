import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    // Извлекаем данные из запроса RetailCRM
    const sum = body.sum || '0'
    const customer = body.customer || 'Клиент'
    
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE"
    const chatId = "481948421"
    const text = `🔥 VIP заказ!\n💰 Сумма: ${sum} ₸\n👤 Клиент: ${customer}`

    const tgRes = await fetch(`https://telegram.org{token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    })

    const tgData = await tgRes.json()

    if (!tgRes.ok) {
      console.error('Telegram API Error:', tgData)
      return NextResponse.json({ success: false, error: tgData.description }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('Proxy Error:', err.message)
    return NextResponse.json({ success: false, error: err.message }, { status: 500 })
  }
}
