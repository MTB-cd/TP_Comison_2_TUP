import api from '../Services/Api';

export const funcionLogin = async (credentials) => {
  
    const response = await api.post('/auth/login', credentials)
return response.data;
};
    