import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import BusquedaLibro from "./BusquedaLibro";
import useCustomLibros from "../../Hooks/useCustomLibros";
import "../../Styles/Libros/Libros.css";

const Libros = () => {
  const { libros, obtenerLibros, crearLibro, editarLibro, eliminarLibro } =
    useCustomLibros();

  const [terminoBusqueda, setTerminoBusqueda] = useState("");
  const [formLibro, setFormLibro] = useState({
    titulo: "",
    autor: "",
    categoria: "",
    ejemplares_disponibles: 0,
  });
  const [idLibroEditar, setIdLibroEditar] = useState(null);
  const [mensaje, setMensaje] = useState("");
  const [tipoMensaje, setTipoMensaje] = useState("");

  const [openModalNuevo, setOpenModalNuevo] = useState(false);
  const [openModalVer, setOpenModalVer] = useState(false);

  useEffect(() => {
    obtenerLibros();
  }, []);

  const mostrarMensaje = (msg, tipo) => {
    setMensaje(msg);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(""), 3000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormLibro({
      ...formLibro,
      [name]: name === "ejemplares_disponibles" ? parseInt(value) || 0 : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formLibro.titulo.trim() || !formLibro.autor.trim()) {
      mostrarMensaje("El título y autor son obligatorios.", "danger");
      return;
    }

    if (formLibro.ejemplares_disponibles < 0) {
      mostrarMensaje(
        "Los ejemplares disponibles no pueden ser negativos.",
        "danger"
      );
      return;
    }

    const result = await Swal.fire({
      title: idLibroEditar ? "¿Guardar cambios?" : "¿Crear nuevo libro?",
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
      if (idLibroEditar) {
        await editarLibro(idLibroEditar, formLibro);
        mostrarMensaje("Libro actualizado.", "success");
      } else {
        await crearLibro(formLibro);
        mostrarMensaje("Libro creado.", "success");
      }

      await obtenerLibros();
      setFormLibro({
        titulo: "",
        autor: "",
        categoria: "",
        ejemplares_disponibles: 0,
      });
      setIdLibroEditar(null);
      setOpenModalNuevo(false);
    } catch {
      mostrarMensaje("Ocurrió un error al guardar.", "danger");
      setOpenModalNuevo(false);
    }
  };

  const handleEditLibro = (lib) => {
    Swal.fire({
      title: "¿Editar libro?",
      text: lib.titulo,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, editar",
    }).then((res) => {
      if (res.isConfirmed) {
        setFormLibro({ ...lib });
        setIdLibroEditar(lib.libro_id);
        setOpenModalNuevo(true);
      }
    });
  };

  const handleNuevoLibro = () => {
    setFormLibro({
      titulo: "",
      autor: "",
      categoria: "",
      ejemplares_disponibles: 0,
    });
    setIdLibroEditar(null);
    setOpenModalNuevo(true);
  };

  const handleVerLibro = (lib) => {
    setFormLibro({ ...lib });
    setOpenModalVer(true);
  };

  const handleDeleteLibro = (id) => {
    Swal.fire({
      title: "¿Eliminar libro?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await eliminarLibro(id);
          mostrarMensaje("Libro eliminado.", "success");
          await obtenerLibros();
        } catch {
          mostrarMensaje("Ocurrió un error al eliminar.", "danger");
        }
      }
    });
  };

  const resultado = libros.filter((lib) => {
    const t = terminoBusqueda.toLowerCase();
    return (
      lib.titulo.toLowerCase().includes(t) ||
      lib.autor.toLowerCase().includes(t) ||
      (lib.categoria && lib.categoria.toLowerCase().includes(t))
    );
  });

  return (
    <>
      <BusquedaLibro setTerminoBusqueda={setTerminoBusqueda} />

      {mensaje && (
        <div className={`alert alert-${tipoMensaje} mt-3`}>{mensaje}</div>
      )}

      <div className="card shadow-lg mt-3">
        <div className="card-header bg-primary text-white d-flex justify-content-between">
          <h5 className="m-0">Libros</h5>
          <button className="btn btn-light btn-sm" onClick={handleNuevoLibro}>
            + Nuevo Libro
          </button>
        </div>

        <div className="card-body">
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Categoría</th>
                <th>Ejemplares</th>
                <th>Acciones</th>
              </tr>
            </thead>

            <tbody>
              {resultado.map((lib) => (
                <tr key={lib.libro_id}>
                  <td>{lib.libro_id}</td>
                  <td>{lib.titulo}</td>
                  <td>{lib.autor}</td>
                  <td>{lib.categoria || "N/A"}</td>
                  <td>{lib.ejemplares_disponibles}</td>

                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEditLibro(lib)}
                    >
                      Editar
                    </button>

                    <button
                      className="btn btn-sm btn-outline-secondary me-2"
                      onClick={() => handleVerLibro(lib)}
                    >
                      Ver
                    </button>

                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDeleteLibro(lib.libro_id)}
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
              <h5>{idLibroEditar ? "Editar Libro" : "Nuevo Libro"}</h5>
              <button
                className="btn-close"
                onClick={() => setOpenModalNuevo(false)}
              ></button>
            </div>

            <div className="custom-modal-body">
              <form onSubmit={handleSubmit}>
                <label>Título</label>
                <input
                  name="titulo"
                  className="form-control mb-3"
                  value={formLibro.titulo}
                  onChange={handleChange}
                />

                <label>Autor</label>
                <input
                  name="autor"
                  className="form-control mb-3"
                  value={formLibro.autor}
                  onChange={handleChange}
                />

                <label>Categoría</label>
                <input
                  name="categoria"
                  className="form-control mb-3"
                  value={formLibro.categoria}
                  onChange={handleChange}
                />

                <label>Ejemplares Disponibles</label>
                <input
                  name="ejemplares_disponibles"
                  type="number"
                  className="form-control mb-3"
                  value={formLibro.ejemplares_disponibles}
                  onChange={handleChange}
                  min="0"
                />

                <button className="btn btn-success w-100">
                  {idLibroEditar ? "Actualizar" : "Guardar"}
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
              <h5>Datos del Libro</h5>
              <button
                className="btn-close"
                onClick={() => setOpenModalVer(false)}
              ></button>
            </div>

            <div className="custom-modal-body">
              <p>
                <b>Título:</b> {formLibro.titulo}
              </p>
              <p>
                <b>Autor:</b> {formLibro.autor}
              </p>
              <p>
                <b>Categoría:</b> {formLibro.categoria || "N/A"}
              </p>
              <p>
                <b>Ejemplares Disponibles:</b>{" "}
                {formLibro.ejemplares_disponibles}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Libros;
