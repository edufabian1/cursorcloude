# 📱 Configuración de Notificaciones por Telegram

## 📋 Requisitos

- Cuenta de Telegram
- Bot de Telegram creado (gratis)
- Chat ID donde recibir las notificaciones

---

## 🤖 Paso 1: Crear un Bot de Telegram

1. **Abre Telegram** y busca `@BotFather`
2. **Inicia una conversación** con BotFather
3. **Envía el comando:** `/newbot`
4. **Sigue las instrucciones:**
   - Elige un nombre para tu bot (ej: "UVA Calculator Bot")
   - Elige un username para tu bot (debe terminar en `bot`, ej: `uva_calculator_bot`)
5. **BotFather te dará un TOKEN** que se ve así:
   ```
   123456789:ABCdefGHIjklMNOpqrsTUVwxyz
   ```
   **⚠️ GUARDA ESTE TOKEN, lo necesitarás después**

---

## 💬 Paso 2: Obtener tu Chat ID

Tienes dos opciones:

### Opción A: Enviar notificaciones a ti mismo (Recomendado)

1. **Busca tu bot** en Telegram (usa el username que creaste, ej: `@uva_calculator_bot`)
2. **Inicia una conversación** con tu bot
3. **Envía cualquier mensaje** a tu bot (ej: `/start`)
4. **Obtén tu Chat ID** usando uno de estos métodos:

   **Método 1: Usando @userinfobot**
   - Busca `@userinfobot` en Telegram
   - Inicia conversación y envía `/start`
   - Te mostrará tu ID de usuario (número)

   **Método 2: Usando la API de Telegram**
   - Abre en tu navegador: `https://api.telegram.org/botTU_TOKEN_AQUI/getUpdates`
   - Reemplaza `TU_TOKEN_AQUI` con el token de tu bot
   - Busca el campo `"chat":{"id":` - ese número es tu Chat ID

### Opción B: Crear un grupo

1. Crea un grupo en Telegram
2. Agrega tu bot al grupo
3. Obtén el Chat ID del grupo usando el mismo método anterior
4. El Chat ID de grupos es un número negativo (ej: `-123456789`)

---

## ⚙️ Paso 3: Configurar Variables de Entorno

1. **Crea un archivo `.env`** en la raíz del proyecto (junto a `package.json`)
2. **Agrega las siguientes líneas:**

```env
VITE_TELEGRAM_BOT_TOKEN=tu_token_aqui
VITE_TELEGRAM_CHAT_ID=tu_chat_id_aqui
```

**Ejemplo:**
```env
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_CHAT_ID=987654321
```

3. **Guarda el archivo**

**⚠️ IMPORTANTE:**
- El archivo `.env` NO debe subirse a GitHub (ya está en `.gitignore`)
- Usa el archivo `.env.example` como referencia
- Las variables deben empezar con `VITE_` para que Vite las exponga al frontend

---

## 🚀 Paso 4: Probar la Configuración

1. **Reinicia el servidor de desarrollo** si está corriendo:
   ```bash
   # Detén el servidor (Ctrl+C) y vuelve a iniciarlo
   npm run dev
   ```

2. **Abre la aplicación** en tu navegador
3. **Haz clic en "Calcular"**
4. **Deberías recibir una notificación en Telegram** con la cotización del UVA

---

## 🔍 Solución de Problemas

### No recibo notificaciones

1. **Verifica que el token sea correcto:**
   - Debe tener el formato: `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`
   - No debe tener espacios

2. **Verifica que el Chat ID sea correcto:**
   - Debe ser un número (puede ser negativo para grupos)
   - Asegúrate de haber enviado al menos un mensaje a tu bot

3. **Verifica la consola del navegador:**
   - Abre las herramientas de desarrollador (F12)
   - Ve a la pestaña "Console"
   - Busca errores relacionados con Telegram

4. **Prueba el bot manualmente:**
   - Abre: `https://api.telegram.org/botTU_TOKEN/getMe`
   - Debería mostrar información de tu bot

### Error: "Telegram no configurado"

- Verifica que el archivo `.env` exista en la raíz del proyecto
- Verifica que las variables empiecen con `VITE_`
- Reinicia el servidor de desarrollo después de crear/modificar `.env`

### El bot no responde

- Asegúrate de haber iniciado conversación con tu bot
- Envía `/start` a tu bot
- Verifica que el bot esté activo en BotFather

---

## 🔒 Seguridad

**⚠️ IMPORTANTE:** 
- El token del bot y el Chat ID estarán visibles en el código del frontend
- Esto es normal para aplicaciones frontend, pero significa que cualquiera puede ver estos valores
- Para mayor seguridad en producción, considera usar un backend intermedio

**Recomendaciones:**
- No compartas tu token públicamente
- Si el token se compromete, revócalo en BotFather y crea uno nuevo
- Usa el archivo `.env` para desarrollo local
- Para producción, configura las variables de entorno en tu plataforma de hosting

---

## 📝 Ejemplo de Mensaje

Cuando presiones "Calcular", recibirás un mensaje como este:

```
📊 Cotización UVA - Argentina

💰 Valor: $1,234.56
📅 Fecha: 20 de diciembre de 2024

Datos provistos por ArgentinaDatos.com
```

---

## ✅ Checklist

- [ ] Bot creado en @BotFather
- [ ] Token del bot guardado
- [ ] Chat ID obtenido
- [ ] Archivo `.env` creado con las variables
- [ ] Variables configuradas correctamente
- [ ] Servidor de desarrollo reiniciado
- [ ] Notificación recibida en Telegram

---

## 🆘 Ayuda Adicional

- **Documentación de Telegram Bot API:** https://core.telegram.org/bots/api
- **BotFather:** @BotFather en Telegram
- **User Info Bot:** @userinfobot en Telegram

