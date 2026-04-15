// import { NextResponse } from 'next/server';

// export const runtime = 'edge';

// export async function POST(req: Request) {
//   try {
//     const token = "8601000549:AAFAvJPNxOe9Vu5FRiXz70TSvmLpe4sVGdE";
//     const chatId = "481948421";

//     // Сначала проверим бота через getMe
//     const testRes = await fetch(`https://api.telegram.org/bot${token}/getMe`);
//     const testData = await testRes.json();

//     if (!testData.ok) {
//       return NextResponse.json({ success: false, error: "Ошибка токена", details: testData });
//     }

//     // Если токен ок, отправляем сообщение
//     const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         chat_id: chatId,
//         text: "✅ Токен исправлен! Бот работает через Vercel."
//       }),
//     });

//     const data = await res.json();
//     return NextResponse.json({ success: data.ok, info: data.result });

//   } catch (error: any) {
//     return NextResponse.json({ success: false, error: error.message }, { status: 500 });
//   }
// }

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Пробуем прочитать входящий JSON
    const body = await req.json().catch(() => ({}));
    const sum = body.sum || '0';
    const customer = body.customer || 'Клиент';

    const token = "8601000549:AAFAvJPNxOe9Vu5FRiXz70TSvmLpe4sVGdE";
    const chatId = "481948421";
    const message = `🚀 VIP заказ из CRM!\n💰 Сумма: ${sum} ₸\n👤 Клиент: ${customer}`;

    // 2. Отправляем в Telegram
    const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    });

    const tgData = await tgRes.json();

    // 3. ВСЕГДА возвращаем валидный JSON объект
    return NextResponse.json({
      status: "success",
      telegram_ok: tgData.ok || false
    });

  } catch (error: any) {
    console.error("Ошибка в роуте:", error.message);
    return NextResponse.json({
      status: "error",
      message: error.message
    }, { status: 500 });
  }
}

// Добавим GET для теста в браузере
export async function GET() {
  return NextResponse.json({ message: "Эндпоинт готов принимать POST" });
}
