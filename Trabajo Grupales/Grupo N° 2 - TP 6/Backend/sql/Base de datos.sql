CREATE DATABASE IF NOT EXISTS biblioteco;
USE biblioteca;

-- Tabla: usuarios
CREATE TABLE usuarios (
    usuario_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre_usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    estado_usuario TINYINT NOT NULL DEFAULT 1,
    rol VARCHAR(255) NOT NULL,
    fecha_creacion_usuario DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_email (email),
    INDEX idx_estado_usuario (estado_usuario)
);

-- Tabla: libros
CREATE TABLE libros (
    libro_id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    autor VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    ejemplares_disponibles INT NOT NULL DEFAULT 0,
    INDEX idx_titulo (titulo),
    INDEX idx_autor (autor),
    INDEX idx_categoria (categoria)
);

-- Tabla: alumnos
CREATE TABLE alumnos (
    alumno_id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    curso VARCHAR(50) NOT NULL,
    dni VARCHAR(20) NOT NULL UNIQUE,
    usuario_id INT NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(usuario_id) ON DELETE CASCADE,
    INDEX idx_dni (dni),
    INDEX idx_curso (curso)
);

-- Tabla: prestamos
CREATE TABLE prestamos (
    prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT NOT NULL,
    libro_id INT NOT NULL,
    fecha_prestamo DATE NOT NULL,
    fecha_devolucion DATE,
    estado ENUM('prestado', 'devuelto', 'atrasado', 'perdido') NOT NULL DEFAULT 'prestado',
    FOREIGN KEY (alumno_id) REFERENCES alumnos(alumno_id) ON DELETE CASCADE,
    FOREIGN KEY (libro_id) REFERENCES libros(libro_id) ON DELETE CASCADE,
    INDEX idx_alumno_id (alumno_id),
    INDEX idx_libro_id (libro_id),
    INDEX idx_fecha_prestamo (fecha_prestamo),
    INDEX idx_estado (estado)
);

INSERT INTO libros (titulo, autor, categoria, ejemplares_disponibles) VALUES
('Cien años de soledad', 'Gabriel García Márquez', 'Ficción', 5),
('Don Quijote de la Mancha', 'Miguel de Cervantes', 'Clásicos', 3);

INSERT INTO usuarios (usuario_id, nombre_usuario, contrasena, email, estado_usuario, rol)
VALUES (3, 'admin', 'AdminSegura123!', 'admin@biblioteca.com', 1, 'admin');
-- AdminSegura123! --

UPDATE usuarios
SET contrasena = '$2b$10$fcZ5WhyiD75eJ5bnyUToa.OVn9xkfnr6eqo1xBenszFHgHqMJrlAm'
WHERE usuario_id = 3;