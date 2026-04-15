import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  try {
    const token = "8601000549:AAFAvJPNxOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";

    // Сначала проверим бота через getMe
    const testRes = await fetch(`https://telegram.org{token}/getMe`);
    const testData = await testRes.json();

    if (!testData.ok) {
      return NextResponse.json({ success: false, error: "Ошибка токена", details: testData });
    }

    // Если токен ок, отправляем сообщение
    const res = await fetch(`https://telegram.org{token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: "✅ Токен исправлен! Бот работает через Vercel."
      }),
    });

    const data = await res.json();
    return NextResponse.json({ success: data.ok, info: data.result });

  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
