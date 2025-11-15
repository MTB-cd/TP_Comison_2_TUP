import { useEffect, useState } from "react";
import api from "../Services/Api";

const useCustomLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerLibros = async () => {
    setLoading(true);
    try {
      const response = await api.get("/libros");
      setLibros(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al obtener libros:", err);
    } finally {
      setLoading(false);
    }
  };

  const traerLibrosporId = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/libros/${id}`);
      setLibros([response.data]);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al obtener libro:", err);
    } finally {
      setLoading(false);
    }
  };

  const crearLibro = async (nuevoLibro) => {
    setLoading(true);
    try {
      await api.post("/libros/crear", nuevoLibro);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al crear libro:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarLibro = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/libros/eliminar/${id}`);
      setLibros(libros.filter((lib) => lib.libro_id !== id));
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al eliminar libro:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editarLibro = async (id, libroActualizado) => {
    setLoading(true);
    try {
      await api.put(`/libros/editar/${id}`, libroActualizado);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al editar libro:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerLibros();
  }, []);

  return {
    libros,
    loading,
    error,
    obtenerLibros,
    traerLibrosporId,
    crearLibro,
    eliminarLibro,
    editarLibro,
  };
};

export default useCustomLibros;
