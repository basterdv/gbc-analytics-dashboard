import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";

    // Пытаемся получить данные из заказа, если они есть
    const body = await req.json().catch(() => ({}));
    const sum = body.sum || 'неизвестная сумма';

    // ВАЖНО: правильный URL с api. и /bot
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId, 
        text: `🚀 VIP заказ в RetailCRM! \n💰 Сумма: ${sum} ₸ \n✅ Прокси на Vercel работает!`
      }),
    });

    const data = await res.json();
    return NextResponse.json({ status: 'ok', sent: data.ok });
  } catch (error: any) {
    // Здесь была ошибка: нужно NextResponse и убедиться, что error.message существует
    return NextResponse.json({ error: error.message || 'Unknown error' }, { status: 500 });
  }
}

export async function GET() {
    return NextResponse.json({
        message: "Эндпоинт живой! Для уведомлений из CRM используй POST",
        status: "ready"
    });
}
