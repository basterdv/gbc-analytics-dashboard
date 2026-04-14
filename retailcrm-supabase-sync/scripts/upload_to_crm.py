import os
import json
import requests
from pathlib import Path
from dotenv import load_dotenv

# 1. Определяем пути
BASE_DIR = Path(__file__).parent.parent
ENV_PATH = BASE_DIR / '.env'
DATA_PATH = BASE_DIR / 'data' / 'mock_orders.json'

# 2. Загружаем .env и проверяем
if not ENV_PATH.exists():
    print(f"❌ Файл .env не найден по пути: {ENV_PATH}")
    exit(1)

load_dotenv(dotenv_path=ENV_PATH)

CRM_URL = os.getenv("CRM_URL")
CRM_KEY = os.getenv("CRM_KEY")

# Проверка содержимого переменных
if not CRM_URL or not CRM_KEY:
    print(f"❌ Ошибка: CRM_URL или CRM_KEY отсутствуют в {ENV_PATH}")
    print(f"Сейчас CRM_URL: {CRM_URL}")
    exit(1)


def upload_orders():
    # ... (код загрузки JSON)
    with open(DATA_PATH, 'r', encoding='utf-8') as f:
        orders = json.load(f)

    # Очищаем тип заказа, чтобы избежать ошибки справочника
    for order in orders:
        order.pop('orderType', None)

    payload = {
        'apiKey': CRM_KEY,
        'orders': json.dumps(orders)
    }

    endpoint = f"{CRM_URL.rstrip('/')}/api/v5/orders/upload"
    print(f"🚀 Отправка {len(orders)} заказов (ждем ответа)...")

    try:
        # Увеличиваем timeout до 60 секунд
        response = requests.post(endpoint, data=payload, timeout=60)
        print("✅ Ответ CRM:", response.json())
    except Exception as e:
        print(f"❌ Ошибка: {e}")


if __name__ == "__main__":
    upload_orders()
