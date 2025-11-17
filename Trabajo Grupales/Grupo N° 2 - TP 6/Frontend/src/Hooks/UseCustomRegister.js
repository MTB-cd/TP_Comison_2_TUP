import { useState } from 'react';
import api from '../Services/Api';

const useCustomRegister = () => {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  // Datos del alumno
  const [nombreAlumno, setNombreAlumno] = useState('');
  const [curso, setCurso] = useState('');
  const [dni, setDni] = useState('');

  const [loading, setLoading] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [error, setError] = useState(null);

  const validar = () => {
    if (!usuario.trim() || !password.trim() || !email.trim() || !nombreAlumno.trim() || !curso.trim() || !dni.trim()) {
      setError('Todos los campos son obligatorios');
      return false;
    }

    if (usuario.length > 50) {
      setError('El nombre de usuario supera 50 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email inválido');
      return false;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    if (dni.length < 6 || dni.length > 20) {
      setError('DNI inválido');
      return false;
    }

    setError(null);
    return true;
  };

  const registrarUsuario = async () => {
    if (!validar()) return;

    setLoading(true);
    setMensaje(null);
    setError(null);

    try {
      const response = await api.post('/auth/register', {
        usuario,
        contraseña: password,
        email,
        nombreAlumno,
        curso,
        dni
      });

      setMensaje(response.data.message || 'Registro exitoso');

      // Limpiar campos
      setUsuario('');
      setPassword('');
      setEmail('');
      setNombreAlumno('');
      setCurso('');
      setDni('');

      return { success: true, data: response.data };
    } catch (err) {
      const msg = err.response?.data?.message || 'Error de red o servidor';
      setError(msg);
      console.error('Error al registrar usuario:', err);
      return { success: false, error: msg };
    } finally {
      setLoading(false);
    }
  };

  const limpiarMensajes = () => {
    setMensaje(null);
    setError(null);
  };

  return {
    usuario,
    setUsuario,
    password,
    setPassword,
    email,
    setEmail,

    nombreAlumno,
    setNombreAlumno,
    curso,
    setCurso,
    dni,
    setDni,

    loading,
    mensaje,
    error,
    registrarUsuario,
    limpiarMensajes
  };
};

export default useCustomRegister;
