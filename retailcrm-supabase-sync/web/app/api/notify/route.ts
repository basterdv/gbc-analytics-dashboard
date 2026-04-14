import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";

    const res = await fetch(`https://telegram.org{token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🚀 ХЬЮСТОН, У НАС ПОСТ! Прокси на Vercel принял запрос от CRM!"
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: data.ok });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Оставим GET, чтобы ты мог проверить доступность в браузере
export async function GET() {
  return NextResponse.json({ message: "GET работает, жду твой POST заказ" });
}
