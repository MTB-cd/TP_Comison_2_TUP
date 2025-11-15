const BusquedaAlumno = ({ setTerminoBusqueda }) => {
  return (
    <div className="container my-3">
      <div className="row justify-content-center">
        <div className="col-md-6 col-sm-8">
          <input
            type="text"
            placeholder="🔍 Buscar por nombre, apellido o DNI"
            className="form-control shadow-sm"
            onChange={(e) => setTerminoBusqueda(e.target.value)}
            style={{
              borderRadius: "0.5rem",
              padding: "0.75rem",
              fontSize: "1rem",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BusquedaAlumno;
