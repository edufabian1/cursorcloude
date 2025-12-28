# ⚙️ Configuración del Archivo .env para Desarrollo Local

## ❌ Problema Detectado

Tienes el archivo `.env.example` pero **falta el archivo `.env`** real con tus credenciales.

## ✅ Solución: Crear el Archivo .env

### Paso 1: Crear el archivo .env

Crea un archivo llamado `.env` (sin el `.example`) en la raíz del proyecto (mismo lugar donde está `package.json`).

### Paso 2: Agregar las Variables

Abre el archivo `.env` y agrega:

```env
VITE_TELEGRAM_BOT_TOKEN=tu_token_real_aqui
VITE_TELEGRAM_CHAT_ID=tu_chat_id_real_aqui
```

**Ejemplo real:**
```env
VITE_TELEGRAM_BOT_TOKEN=123456789:ABCdefGHIjklMNOpqrsTUVwxyz
VITE_TELEGRAM_CHAT_ID=987654321
```

## 📝 Formato Correcto del Chat ID

### ✅ CORRECTO (Solo números):
```env
VITE_TELEGRAM_CHAT_ID=987654321
VITE_TELEGRAM_CHAT_ID=-123456789
```

### ❌ INCORRECTO (Con @ o texto):
```env
VITE_TELEGRAM_CHAT_ID=@usuario
VITE_TELEGRAM_CHAT_ID=@987654321
VITE_TELEGRAM_CHAT_ID=usuario123
```

**El Chat ID debe ser:**
- Solo números (puede ser negativo para grupos)
- Sin el símbolo @
- Sin espacios
- Sin comillas

## 🔍 Cómo Obtener tu Chat ID Correcto

### Método 1: Usando @userinfobot (Más Fácil)

1. Busca `@userinfobot` en Telegram
2. Inicia conversación y envía `/start`
3. Te mostrará tu ID de usuario (ej: `123456789`)
4. **Usa ese número directamente, sin @**

### Método 2: Usando la API de Telegram

1. Abre en tu navegador: `https://api.telegram.org/botTU_TOKEN/getUpdates`
2. Reemplaza `TU_TOKEN` con el token de tu bot
3. Envía un mensaje a tu bot primero
4. Busca `"chat":{"id":` en la respuesta
5. El número después de `"id":` es tu Chat ID

**Ejemplo de respuesta:**
```json
{
  "ok": true,
  "result": [{
    "message": {
      "chat": {
        "id": 987654321,  ← Este es tu Chat ID
        "first_name": "Edu"
      }
    }
  }]
}
```

## 🚀 Paso 3: Reiniciar el Servidor

**IMPORTANTE:** Después de crear o modificar el archivo `.env`:

1. **Detén el servidor de desarrollo** (Ctrl+C en la terminal)
2. **Vuelve a iniciarlo:**
   ```bash
   npm run dev
   ```

Vite solo carga las variables de entorno al iniciar, por eso necesitas reiniciar.

## ✅ Verificación

1. Abre la aplicación en el navegador
2. Abre la consola del navegador (F12 → Console)
3. Haz clic en "Calcular"
4. Deberías ver:
   - Si está bien: mensaje de éxito en Telegram
   - Si falta algo: warning en consola

## 🔒 Seguridad

- El archivo `.env` está en `.gitignore` (no se sube a GitHub)
- **NUNCA** subas el archivo `.env` al repositorio
- Solo comparte el `.env.example` como plantilla

## 📋 Checklist

- [ ] Archivo `.env` creado en la raíz del proyecto
- [ ] `VITE_TELEGRAM_BOT_TOKEN` configurado con tu token real
- [ ] `VITE_TELEGRAM_CHAT_ID` configurado con tu ID (solo números, sin @)
- [ ] Sin espacios ni comillas en los valores
- [ ] Servidor de desarrollo reiniciado
- [ ] Probado haciendo clic en "Calcular"

## 🆘 Si No Funciona

1. **Verifica el formato del Chat ID:**
   - Debe ser solo números
   - Sin @ al inicio
   - Sin espacios

2. **Verifica que el bot esté activo:**
   - Abre: `https://api.telegram.org/botTU_TOKEN/getMe`
   - Debería mostrar información de tu bot

3. **Verifica que hayas iniciado conversación con el bot:**
   - Busca tu bot en Telegram
   - Envía `/start` o cualquier mensaje
   - Luego intenta de nuevo

4. **Revisa la consola del navegador:**
   - Abre F12 → Console
   - Busca errores o warnings relacionados con Telegram

