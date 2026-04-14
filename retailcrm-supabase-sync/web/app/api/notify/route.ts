import { NextResponse } from 'next/server';

export async function GET() {
    return NextResponse.json({ message: "HELLO WORLD! Теперь путь верный!" });
}

export async function POST(req: Request) {
    try {
        const body = await req.json().catch(() => ({}));
        const sum = body.sum || '0';
        const customer = body.customer || 'Клиент';

        const token = "8601000549:AAFAvJPNXOe9Vu5FRiXz70TSvmLpe4sVGdE";
        const chatId = "481948421";
        const text = `🔥 VIP заказ!\n💰 Сумма: ${sum} ₸\n👤 Клиент: ${customer}`;

        await fetch(`https://telegram.org{token}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: chatId, text })
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
