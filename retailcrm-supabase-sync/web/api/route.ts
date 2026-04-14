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
        text: "👋 ПРИВЕТ! Прокси на Vercel работает!"
      }),
    });

    const data = await res.json();
    return NextResponse.json({ status: 'ok', sent: data.ok });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
