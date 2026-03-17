import api from './api';

const sendMessage = (data) => api.post('/contact', data);

const contactService = {
  sendMessage,
};

export default contactService;