import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BusquedaAlumno from "./BusquedaAlumno";
import useCustomAlumnos from "../../Hooks/useCustomAlumnos";
import "../../Styles/Alumnos/Alumnos.css";

const Alumnos = () => {
  const {
    alumnos,
    obtenerAlumnos,
    crearAlumno,
    editarAlumno,
    eliminarAlumno,
  } = useCustomAlumnos();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [formAlumno, setFormAlumno] = useState({ nombre: "", curso: "", dni: "" });
  const [idAlumnoEditar, setIdAlumnoEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const [openModalNuevo, setOpenModalNuevo] = useState(false);
  const [openModalVer, setOpenModalVer] = useState(false);

  useEffect(() => {
    obtenerAlumnos();
  }, []);

  const mostrarMensaje = (msg, tipo) => {
    setMensaje(msg);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleChange = (e) => {
    setFormAlumno({ ...formAlumno, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formAlumno.nombre.trim() || !formAlumno.curso.trim() || !formAlumno.dni.trim()) {
      mostrarMensaje("Todos los campos son obligatorios.", "danger");
      return;
    }

    const existeDNI = alumnos.some(
      (al) => al.dni === formAlumno.dni && al.alumno_id !== idAlumnoEditar
    );

    if (existeDNI) return mostrarMensaje("El DNI ya está registrado.", "danger");

    const result = await Swal.fire({
      title: idAlumnoEditar ? "¿Guardar cambios?" : "¿Crear nuevo alumno?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, confirmar",
      cancelButtonText: "Cancelar",
    });

    if (!result.isConfirmed) {
      mostrarMensaje("Operación cancelada.", "info");
      return;
    }

    try {
      if (idAlumnoEditar) {
        await editarAlumno(idAlumnoEditar, formAlumno);
        mostrarMensaje("Alumno actualizado.", "success");
      } else {
        await crearAlumno(formAlumno);
        mostrarMensaje("Alumno creado.", "success");
      }

      await obtenerAlumnos();
      setFormAlumno({ nombre: "", curso: "", dni: "" });
      setIdAlumnoEditar(null);
      setOpenModalNuevo(false);

    } catch {
      mostrarMensaje("Ocurrió un error al guardar.", "danger");
      setOpenModalNuevo(false);
    }
  };

  const handleEditAlumno = (al) => {
    Swal.fire({
      title: "¿Editar alumno?",
      text: al.nombre,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
    }).then((res) => {
      if (res.isConfirmed) {
        setFormAlumno({ ...al });
        setIdAlumnoEditar(al.alumno_id);
        setOpenModalNuevo(true);
      }
    });
  };

  const handleNuevoAlumno = () => {
    setFormAlumno({ nombre: "", curso: "", dni: "" });
    setIdAlumnoEditar(null);
    setOpenModalNuevo(true);
  };

  const handleVerAlumno = (al) => {
    setFormAlumno({ ...al });
    setOpenModalVer(true);
  };

  const handleDeleteAlumno = (id) => {
    Swal.fire({
      title: "¿Eliminar alumno?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await eliminarAlumno(id);
          mostrarMensaje("Alumno eliminado.", "success");
          await obtenerAlumnos();
        } catch {
          mostrarMensaje("Ocurrió un error al eliminar.", "danger");
        }
      }
    });
  };

  const resultado = alumnos.filter((al) => {
    const t = terminoBusqueda.toLowerCase();
    return (
      al.nombre.toLowerCase().includes(t) ||
      al.curso.toLowerCase().includes(t) ||
      al.dni.toLowerCase().includes(t)
    );
  });

  return (
    <>
      <BusquedaAlumno setTerminoBusqueda={setTerminoBusqueda} />

      {mensaje && <div className={`alert alert-${tipoMensaje} mt-3`}>{mensaje}</div>}

      <div className="card shadow-lg mt-3">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h5 className="m-0">Alumnos</h5>
          <button className="btn btn-light btn-sm" onClick={handleNuevoAlumno}>
            + Nuevo Alumno
          </button>
        </div>

        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Curso</th>
                <th>DNI</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {resultado.map((al) => (
                <tr key={al.alumno_id}>
                  <td>{al.alumno_id}</td>
                  <td>{al.nombre}</td>
                  <td>{al.curso}</td>
                  <td>{al.dni}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEditAlumno(al)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleVerAlumno(al)}
                    >
                      Ver
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteAlumno(al.alumno_id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL NUEVO / EDITAR */}
      {openModalNuevo && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5>{idAlumnoEditar ? "Editar Alumno" : "Nuevo Alumno"}</h5>
              <button className="btn-close" onClick={() => setOpenModalNuevo(false)}></button>
            </div>

            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                <label>Nombre</label>
                <input name="nombre" className="form-control mb-3" value={formAlumno.nombre} onChange={handleChange} />

                <label>Curso</label>
                <input name="curso" className="form-control mb-3" value={formAlumno.curso} onChange={handleChange} />

                <label>DNI</label>
                <input name="dni" className="form-control mb-3" value={formAlumno.dni} onChange={handleChange} />

                <button className="btn btn-success w-100">
                  {idAlumnoEditar ? "Actualizar" : "Guardar"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* MODAL VER */}
      {openModalVer && (
        <div className="custom-modal-overlay">
          <div className="custom-modal">
            <div className="custom-modal-header">
              <h5>Datos del Alumno</h5>
              <button className="btn-close" onClick={() => setOpenModalVer(false)}></button>
            </div>

            <div className="custom-modal-body">
              <p><b>Nombre:</b> {formAlumno.nombre}</p>
              <p><b>Curso:</b> {formAlumno.curso}</p>
              <p><b>DNI:</b> {formAlumno.dni}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Alumnos;
