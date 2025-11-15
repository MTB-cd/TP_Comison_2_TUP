import { Button, Form, Alert } from "react-bootstrap";
import { funcionLogin } from "../Hooks/UseAuth";
import { useAuthStore } from "../Store/UseAuthStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
    const [data, setData] = useState({
        usuario: '',
        contraseña: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const { setUser, setToken } = useAuthStore();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        });
        // Limpiar error al escribir
        if (error) setError(null);
    };

    const handleSubmit = async (e) => { 
        e.preventDefault();
        setError(null);
        
        // Validaciones básicas
        if (!data.usuario || !data.contraseña) {
            setError('Por favor, completa todos los campos');
            return;
        }
        
      
        
        setLoading(true);
        
        try {
            const response = await funcionLogin(data);
            
            // Guardar token y usuario en el store
            if (response.token) {
                setToken(response.token);
                localStorage.setItem('token', response.token);
            }
            
            if (response.user) {
                setUser(response.user);
                localStorage.setItem('user', JSON.stringify(response.user));
            }
            
            // Redirigir al dashboard o home
            navigate('/home');
            
        } catch (error) {
            console.error('Error en login:', error);
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               'Error al iniciar sesión. Por favor, verifica tus credenciales';
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    }

    



  return (
    <div>
      <Form onSubmit={handleSubmit}>
        {error && (
          <Alert variant="danger" dismissible onClose={() => setError(null)}>
            {error}
          </Alert>
        )}
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Usuario</Form.Label>
          <Form.Control 
            type="text" 
            name="usuario"
            placeholder="Ingresa tu usuario" 
            value={data.usuario}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Contraseña</Form.Label>
          <Form.Control 
            type="password" 
            name="contraseña"
            placeholder="Contraseña" 
            value={data.contraseña}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </Form.Group>

        <Button 
          variant="primary" 
          type="submit"
          disabled={loading}
        >
          {loading ? 'Iniciando sesión...' : 'Login'}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
