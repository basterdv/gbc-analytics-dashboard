import { NextResponse } from 'next/server';

export const runtime = 'edge'; // Переключаем на Edge для скорости и обхода таймаутов

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    
    const sum = body.sum || '0';
    const customer = body.customer || 'Клиент';
    
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";
    
    const message = `🔥 VIP заказ!\n💰 Сумма: ${sum} ₸\n👤 Клиент: ${customer}`;

    const response = await fetch(`https://telegram.org${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    return NextResponse.json({ ok: response.ok });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
