import { useEffect, useState } from "react";
import api from "../Services/Api";

const useCustomAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const obtenerAlumnos = async () => {
    setLoading(true);
    try {
      const response = await api.get("/alumnos");
      setAlumnos(response.data);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al obtener alumnos:", err);
    } finally {
      setLoading(false);
    }
  };

  const traerAlumnosporId = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/alumnos/${id}`);
      setAlumnos([response.data]);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al obtener alumno:", err);
    } finally {
      setLoading(false);
    }
  };

  const crearAlumno = async (nuevoAlumno) => {
    setLoading(true);
    try {
      await api.post("/alumnos/crear", nuevoAlumno);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al crear alumno:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const eliminarAlumno = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/alumnos/eliminar/${id}`);
      setAlumnos(alumnos.filter((al) => al.alumno_id !== id));
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al eliminar alumno:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const editarAlumno = async (id, alumnoActualizado) => {
    setLoading(true);
    try {
      await api.put(`/alumnos/editar/${id}`, alumnoActualizado);
      setError(null);
    } catch (err) {
      setError(err);
      console.error("Error al editar alumno:", err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  return {
    alumnos,
    loading,
    error,
    obtenerAlumnos,
    traerAlumnosporId,
    crearAlumno,
    eliminarAlumno,
    editarAlumno,
  };
};

export default useCustomAlumnos;
