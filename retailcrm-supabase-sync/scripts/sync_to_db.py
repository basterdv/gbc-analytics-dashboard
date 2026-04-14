import os
import requests
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()

# Инициализация
CRM_URL = os.getenv("CRM_URL").rstrip('/')
CRM_KEY = os.getenv("CRM_KEY")
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_SERVICE_KEY")  # Берем именно Service Role Key

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def sync_orders():
    print("🔄 Начинаю синхронизацию RetailCRM -> Supabase...")

    # 1. Тянем заказы из CRM (последние 50)
    try:
        response = requests.get(
            f"{CRM_URL}/api/v5/orders",
            params={'apiKey': CRM_KEY, 'limit': 50}
        )
        response.raise_for_status()
        orders = response.json().get('orders', [])
    except Exception as e:
        print(f"❌ Ошибка CRM: {e}")
        return

    # 2. Форматируем данные под нашу SQL-таблицу
    prepared_data = []
    for o in orders:
        prepared_data.append({
            "crm_id": o.get('id'),
            "customer_name": f"{o.get('firstName', '')} {o.get('lastName', '')}".strip(),
            "total_sum": float(o.get('totalSumm', 0)),
            "status": o.get('status'),
            "utm_source": (o.get('customFields') or {}).get('utm_source', 'direct'),
            "created_at": o.get('createdAt')
        })

    # 3. UPSERT в Supabase (обновит, если ID совпадает, или создаст новый)
    if prepared_data:
        try:
            result = supabase.table("orders").upsert(prepared_data).execute()
            print(f"✅ Успешно! В базе теперь {len(prepared_data)} заказов.")
        except Exception as e:
            print(f"❌ Ошибка Supabase: {e}")


if __name__ == "__main__":
    sync_orders()
