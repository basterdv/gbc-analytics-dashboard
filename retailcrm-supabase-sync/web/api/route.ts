import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";

    // Прямой запрос к Telegram
    const res = await fetch(`https://telegram.org{token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: "🎯 ПРОВЕРКА GET: Если ты это видишь, значит Vercel работает!"
      }),
    });

    const data = await res.json();
    return NextResponse.json({ 
      message: "Запрос отправлен в Telegram", 
      tg_response: data 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
