import { NextResponse } from 'next/server';

// Переключаем на Edge Runtime — это убирает 90% ошибок 500 на Vercel
export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    // ВАЖНО: Токен бота и ID чата
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";

    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🚀 ХЬЮСТОН, МЫ В ЭФИРЕ! Прокси на Edge Runtime сработал."
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: data.ok });
  } catch (error: any) {
    // Выводим ошибку, чтобы она была видна в логах Vercel
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "Edge Runtime готов к работе" });
}
