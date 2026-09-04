export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return res.status(500).json({ error: 'Variables de entorno de Telegram no configuradas' });
  }

  try {
    const {
      eventId,
      nombre,
      telefono,
      departamento,
      ciudad,
      direccion,
      comboNombre,
      numPares,
      precio,
      notas
    } = req.body;

    const mensaje = `🛒 *NUEVO PEDIDO — MEDIAS DE GEL*

👤 *Cliente:* ${nombre || 'No especificado'}
📱 *Celular:* ${telefono || 'No especificado'}
📍 *Departamento:* ${departamento || 'No especificado'}
🏙️ *Ciudad:* ${ciudad || 'No especificado'}
🏠 *Dirección:* ${direccion || 'No especificado'}

📦 *Pack:* ${comboNombre || 'Pack Standby'}
🧦 *Pares:* ${numPares || '2'}
💰 *Total:* ${precio || 'Por definir'}
📝 *Notas:* ${notas || 'Sin notas'}

🆔 *ID Pedido:* \`${eventId || Date.now()}\`
💵 *Pago contra entrega*
⚠️ *Pendiente de confirmación por WhatsApp*`;

    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: mensaje,
        parse_mode: 'Markdown'
      })
    });

    const data = await response.json();

    if (!data.ok) {
      throw new Error(data.description || 'Error enviando mensaje a Telegram');
    }

    return res.status(200).json({ success: true, message: 'Pedido enviado a Telegram correctamente' });

  } catch (error) {
    console.error('Error en /api/pedido-medias:', error);
    return res.status(500).json({ error: error.message || 'Error interno del servidor' });
  }
}
