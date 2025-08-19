// src/lib/api.ts
import axios from 'axios';

// Pega a URL da API das variáveis de ambiente
// O Next.js expõe variáveis de ambiente que começam com NEXT_PUBLIC_
const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Verifica se a URL da API foi definida
if (!API_URL) {
  console.error('Variável de ambiente NEXT_PUBLIC_API_URL não definida.');
  throw new Error('NEXT_PUBLIC_API_URL is not defined in .env.local');
}

// Cria uma instância do Axios com a URL base da API
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Você pode adicionar interceptors aqui para, por exemplo,
// anexar o token de autenticação a cada requisição automaticamente.
// Isso será feito na próxima etapa.

export default api;