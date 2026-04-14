import { NextResponse } from 'next/server';

// Максимально тупой роутер для проверки
export async function GET() {
    return NextResponse.json({ 
        message: "HELLO WORLD! Я ЖИВОЙ!",
        time: new Date().toISOString()
    });
}
