/**
 * Utilidad para enviar notificaciones a Telegram
 */

/**
 * Envía un mensaje a Telegram usando el bot configurado
 * @param {string} message - Mensaje a enviar
 * @returns {Promise<boolean>} - true si se envió correctamente, false en caso contrario
 */
export const sendTelegramNotification = async (message) => {
  const botToken = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const chatId = import.meta.env.VITE_TELEGRAM_CHAT_ID;

  // Verificar que las variables de entorno estén configuradas
  if (!botToken || !chatId) {
    console.warn('Telegram no configurado: faltan VITE_TELEGRAM_BOT_TOKEN o VITE_TELEGRAM_CHAT_ID');
    return false;
  }

  // Verificar que no sean valores de ejemplo
  if (botToken === 'tu_bot_token_aqui' || chatId === 'tu_chat_id_aqui') {
    console.warn('Telegram no configurado: usa valores reales en las variables de entorno');
    return false;
  }

  try {
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML', // Permite formato HTML básico
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('Error al enviar mensaje a Telegram:', errorData);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error al enviar notificación a Telegram:', error);
    return false;
  }
};

/**
 * Formatea un mensaje con la cotización del UVA
 * @param {number} valor - Valor del UVA
 * @param {string} fecha - Fecha de la cotización
 * @returns {string} - Mensaje formateado
 */
export const formatUVAMessage = (valor, fecha) => {
  const fechaFormateada = new Date(fecha + 'T00:00:00').toLocaleDateString('es-AR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const valorFormateado = new Intl.NumberFormat('es-AR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(valor);

  return `📊 <b>Cotización UVA - Argentina</b>

💰 <b>Valor:</b> $${valorFormateado}
📅 <b>Fecha:</b> ${fechaFormateada}

<i>Datos provistos por ArgentinaDatos.com</i>`;
};

