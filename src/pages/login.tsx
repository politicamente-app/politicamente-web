// src/pages/login.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Para redirecionar o usuário
import { useState } from 'react'; // Para gerenciar o estado dos inputs
import api from '../lib/api'; // Nosso cliente Axios configurado

const LoginPage = () => {
  const router = useRouter(); // Instancia o router para navegação
  const [email, setEmail] = useState(''); // Estado para o input de email
  const [password, setPassword] = useState(''); // Estado para o input de senha
  const [error, setError] = useState(''); // Estado para mensagens de erro

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão de recarregar a página
    setError(''); // Limpa mensagens de erro anteriores

    try {
      const formData = new URLSearchParams();
      formData.append('username', email); // Usa o email como username
      formData.append('password', password); // Adiciona a senha ao formData

      // Faz a requisição POST para o endpoint de login da sua API
      const response = await api.post('/auth/login', formData, { // <--- Adicionando o terceiro argumento
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded' // <--- Força o Content-Type
        }});

      // Se o login for bem-sucedido, a API deve retornar um token JWT
      const { access_token } = response.data;

      // Armazenar o token (por enquanto, em localStorage, para simplicidade)
      // Em produção, para maior segurança, preferimos HTTP-only cookies
      localStorage.setItem('politicamente_token', access_token);

      // Redireciona o usuário para a página principal (dashboard)
      router.push('/dashboard');

    } catch (err: any) {
      // Em caso de erro na requisição (ex: credenciais inválidas)
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Ocorreu um erro ao tentar fazer login. Tente novamente.');
      }
      console.error('Erro de login:', err);
    }
  };

  return (
    <>
      <Head>
        <title>PoliticaMente - Entrar</title>
        <meta name="description" content="Acesse sua conta no PoliticaMente." />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Acessar sua conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{' '}
              <Link href="/register" passHref legacyBehavior>
                <a className="font-medium text-blue-600 hover:text-blue-500">
                  crie uma nova conta
                </a>
              </Link>
            </p>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {error && ( // Mostra mensagem de erro se houver
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                <strong className="font-bold">Erro: </strong>
                <span className="block sm:inline">{error}</span>
              </div>
            )}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Endereço de E-mail
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço de E-mail"
                  value={email} // Conecta o input ao estado 'email'
                  onChange={(e) => setEmail(e.target.value)} // Atualiza o estado ao digitar
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Senha
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password} // Conecta o input ao estado 'password'
                  onChange={(e) => setPassword(e.target.value)} // Atualiza o estado ao digitar
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Esqueceu sua senha?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;