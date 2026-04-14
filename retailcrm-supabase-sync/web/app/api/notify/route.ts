import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { sum, customer } = await req.json()
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE"
    const chatId = "481948421"

    const text = `🔥 VIP заказ из CRM!\n💰 Сумма: ${sum} ₸\n👤 Клиент: ${customer}`

    await fetch(`https://telegram.org{token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: chatId, text })
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
