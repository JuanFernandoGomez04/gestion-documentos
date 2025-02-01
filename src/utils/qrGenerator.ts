import QRCode from 'qrcode';
import { supabase } from '../config/supabase';
import { signIn } from './auth';

const checkAuth = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session) {
    throw new Error('Usuario no autenticado');
  }
  return session;
};

export const generateQRCode = async (data: string): Promise<{ qrImageUrl: string; qrBase64: string }> => {
  try {
    await signIn('firmasjuanfernando@gmail.com', 'FirmasJuanFernandoGomez04');

    await checkAuth();

    const qrBase64 = await QRCode.toDataURL(JSON.stringify(data));

    const base64Data = qrBase64.split(',')[1];

    const buffer = Buffer.from(base64Data, 'base64');

    const filename = `qr-${Date.now()}.png`;

    const { data: uploadData, error } = await supabase
      .storage
      .from('gestion_documentos')
      .upload(filename, buffer, {
        contentType: 'image/png',
        cacheControl: '3600',
        upsert: false
      });

    if (error) {
      console.error("Error de subida:", error);
      if (error.message.includes('security policy')) {
        throw new Error('Error de permisos: Verifica que estés autenticado y tengas los permisos necesarios');
      }
      throw new Error(`Error al subir a Supabase: ${error.message}`);
    }

    const { data: { publicUrl } } = supabase
      .storage
      .from('gestion_documentos')
      .getPublicUrl(filename);
    
    return {
      qrImageUrl: publicUrl,
      qrBase64: qrBase64
    };
  } catch (error: any) {

    if (error.message.includes('no autenticado')) {
      throw new Error('Debes iniciar sesión para subir archivos');
    }
    
    throw new Error(error.message || 'Error al generar código QR');
  }
};