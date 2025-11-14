-- Crear esquema
CREATE SCHEMA IF NOT EXISTS biblioteca;
USE biblioteca;

-- Tabla usuarios
create table usuarios (
	usuario_id int auto_increment primary key,
    nombre_usuario varchar(50) not null,
    contraseña varchar(255) not null,
    email VARCHAR(255) NOT NULL,
    estado_usuario tinyint not null default 1,
    fecha_creacion_usuario datetime not null default current_timestamp
);

-- Tabla libros
CREATE TABLE libros (
    libro_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    categoria VARCHAR(100),
    ejemplares_disponibles INT NOT NULL DEFAULT 0
);

-- Tabla alumnos
CREATE TABLE alumnos (
    alumno_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    curso VARCHAR(50),
    dni VARCHAR(20) UNIQUE NOT NULL
);

-- Tabla prestamos
CREATE TABLE prestamos (
    prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT NOT NULL,
    libro_id INT NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    estado ENUM('prestado', 'devuelto') DEFAULT 'prestado',
    FOREIGN KEY (alumno_id) REFERENCES alumnos(alumno_id) ON DELETE CASCADE,
    FOREIGN KEY (libro_id) REFERENCES libros(libro_id) ON DELETE CASCADE
);

-- Inserts de ejemplo para libros
INSERT INTO libros (titulo, autor, categoria, ejemplares_disponibles) VALUES
('Cien Años de Soledad', 'Gabriel García Márquez', 'Novela', 5),
('El Principito', 'Antoine de Saint-Exupéry', 'Infantil', 3),
('1984', 'George Orwell', 'Distopía', 4),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Clásico', 2);

-- Inserts de ejemplo para alumnos
INSERT INTO alumnos (nombre, curso, dni) VALUES
('Nahuel Juarez', '5to A', '12345678'),
('María Pérez', '4to B', '87654321'),
('Juan Gómez', '6to A', '11223344'),
('Lucía Fernández', '5to C', '44332211');

-- Inserts de ejemplo para prestamos
INSERT INTO prestamos (alumno_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES
(1, 1, '2025-10-01', NULL, 'prestado'),
(2, 2, '2025-10-03', '2025-10-10', 'devuelto'),
(3, 3, '2025-10-05', NULL, 'prestado'),
(4, 4, '2025-10-07', '2025-10-12', 'devuelto');
