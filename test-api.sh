#!/bin/bash

# 📡 Script de Testing de API - Rayos Cósmicos
# Úsalo para probar los endpoints sin instalar Postman

API_URL="http://localhost:8000/api"
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🌌 Testing API - Rayos Cósmicos${NC}\n"

# 1. Health Check
echo -e "${BLUE}1️⃣ Health Check${NC}"
echo "GET $API_URL/health"
curl -s "$API_URL/health" | json_pp
echo -e ""

# 2. Listar Sensores
echo -e "${BLUE}2️⃣ Listar Sensores${NC}"
echo "GET $API_URL/sensors"
curl -s "$API_URL/sensors" | json_pp
echo -e ""

# 3. Datos en Vivo
echo -e "${BLUE}3️⃣ Datos en Tiempo Real${NC}"
echo "GET $API_URL/data"
curl -s "$API_URL/data" | json_pp
echo -e ""

# 4. Datos Históricos
echo -e "${BLUE}4️⃣ Datos Históricos${NC}"
echo "GET $API_URL/data/historical?sensor_id=1&start_date=2026-03-20&end_date=2026-03-22"
curl -s "$API_URL/data/historical?sensor_id=1&start_date=2026-03-20&end_date=2026-03-22" | json_pp
echo -e ""

# 5. Estado de Sensor
echo -e "${BLUE}5️⃣ Estado de Sensor Específico${NC}"
echo "GET $API_URL/sensors/1/status"
curl -s "$API_URL/sensors/1/status" | json_pp
echo -e ""

# 6. POST - Ingestar Datos
echo -e "${BLUE}6️⃣ Ingestar Datos (POST)${NC}"
echo "POST $API_URL/ingest"
curl -s -X POST "$API_URL/ingest" \
  -H "Content-Type: application/json" \
  -d '{
    "sensor_id": 1,
    "value": 245,
    "unit": "CPM",
    "temperature": 21.3,
    "humidity": 45
  }' | json_pp
echo -e ""

# 7. Exportar CSV
echo -e "${BLUE}7️⃣ Exportar Datos (CSV)${NC}"
echo "GET $API_URL/data/export?format=csv&sensor_id=1"
curl -s "$API_URL/data/export?format=csv&sensor_id=1"
echo -e "\n"

# 8. Exportar JSON
echo -e "${BLUE}8️⃣ Exportar Datos (JSON)${NC}"
echo "GET $API_URL/data/export?format=json&sensor_id=1"
curl -s "$API_URL/data/export?format=json&sensor_id=1" | json_pp
echo -e ""

echo -e "${GREEN}✅ Testing completado!${NC}"
echo -e "\n📚 Para más información, consulta: docs/API.md"
