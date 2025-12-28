import { useState } from 'react';
import { DollarSign, RefreshCw, Send } from 'lucide-react';
import { sendTelegramNotification, formatUVAMessage } from '../utils/telegram';

export default function UVACalculator() {
  const [uvaValue, setUvaValue] = useState(null);
  const [fecha, setFecha] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [telegramStatus, setTelegramStatus] = useState(null);

  const fetchUVAValue = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Usar proxy en desarrollo, API directa en producción
      const apiUrl = import.meta.env.DEV 
        ? '/api/v1/finanzas/indices/uva'
        : 'https://api.argentinadatos.com/v1/finanzas/indices/uva';
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
        mode: 'cors',
      });
      
      if (!response.ok) {
        throw new Error(`Error al consultar la API: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const today = new Date().toISOString().split('T')[0];
        const todayData = data.find(item => item.fecha === today);
        
        let valorFinal, fechaFinal;
        
        if (todayData) {
          valorFinal = todayData.valor;
          fechaFinal = todayData.fecha;
        } else {
          const latestData = data[data.length - 1];
          valorFinal = latestData.valor;
          fechaFinal = latestData.fecha;
          setError('No hay datos para hoy. Mostrando el valor más reciente.');
        }
        
        setUvaValue(valorFinal);
        setFecha(fechaFinal);
        
        // Enviar notificación a Telegram
        setTelegramStatus('enviando');
        const message = formatUVAMessage(valorFinal, fechaFinal);
        const sent = await sendTelegramNotification(message);
        setTelegramStatus(sent ? 'enviado' : 'error');
        
        // Limpiar el estado después de 3 segundos
        if (sent) {
          setTimeout(() => setTelegramStatus(null), 3000);
        }
      } else {
        throw new Error('No se encontraron datos en la respuesta');
      }
    } catch (err) {
      console.error('Error al consultar API:', err);
      if (err.message.includes('CORS') || err.message.includes('Failed to fetch')) {
        setError('Error de conexión: La API no permite peticiones desde el navegador (CORS). Intenta desde un servidor o usa un proxy.');
      } else {
        setError(err.message);
      }
      setUvaValue(null);
      setFecha(null);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('es-AR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(num);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('es-AR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
            <DollarSign className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Valor UVA</h1>
          <p className="text-gray-600">Argentina Datos</p>
        </div>

        {uvaValue && (
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 mb-6 text-white">
            <p className="text-sm opacity-90 mb-2">Valor actual del UVA</p>
            <p className="text-4xl font-bold mb-3">
              ${formatNumber(uvaValue)}
            </p>
            {fecha && (
              <p className="text-sm opacity-90">
                Fecha: {formatDate(fecha)}
              </p>
            )}
          </div>
        )}

        {error && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-yellow-800 text-sm">{error}</p>
          </div>
        )}

        {telegramStatus === 'enviando' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-600 animate-pulse" />
            <p className="text-blue-800 text-sm">Enviando notificación a Telegram...</p>
          </div>
        )}

        {telegramStatus === 'enviado' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <Send className="w-4 h-4 text-green-600" />
            <p className="text-green-800 text-sm">✓ Notificación enviada a Telegram</p>
          </div>
        )}

        {telegramStatus === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 flex items-center gap-2">
            <Send className="w-4 h-4 text-red-600" />
            <p className="text-red-800 text-sm">No se pudo enviar la notificación. Verifica la configuración de Telegram.</p>
          </div>
        )}

        {!uvaValue && !loading && !error && (
          <div className="bg-gray-50 rounded-xl p-8 mb-6 text-center">
            <p className="text-gray-500">
              Haz clic en "Calcular" para consultar el valor actual del UVA
            </p>
          </div>
        )}

        <button
          onClick={fetchUVAValue}
          disabled={loading}
          className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <RefreshCw className="w-5 h-5 animate-spin" />
              Consultando...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              Calcular
            </>
          )}
        </button>

        <div className="mt-6 text-center text-xs text-gray-500">
          <p>Datos provistos por ArgentinaDatos.com</p>
        </div>
      </div>
    </div>
  );
}
