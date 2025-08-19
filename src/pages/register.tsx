// src/pages/register.tsx
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router'; // Para redirecionar o usuário
import { useState } from 'react'; // Para gerenciar o estado dos inputs
import api from '../lib/api'; // Nosso cliente Axios configurado

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      // Faz a requisição POST para o endpoint de registro da sua API
      const response = await api.post('/auth/register', {
        name,
        email,
        password,
      });

      // Se o registro for bem-sucedido, a API pode retornar um token ou apenas sucesso
      // No seu politicamente-api, o registro já retorna o access_token, então podemos usá-lo.
      const { access_token } = response.data;
      localStorage.setItem('politicamente_token', access_token);

      // Redireciona o usuário para a página principal (dashboard)
      router.push('/dashboard');

    } catch (err: any) {
      if (err.response && err.response.data && err.response.data.detail) {
        setError(err.response.data.detail);
      } else {
        setError('Ocorreu um erro ao tentar registrar. Tente novamente.');
      }
      console.error('Erro de registro:', err);
    }
  };

  return (
    <>
      <Head>
        <title>PoliticaMente - Registrar</title>
        <meta name="description" content="Crie sua conta no PoliticaMente." />
      </Head>

      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Criar uma nova conta
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{' '}
              <Link href="/login" passHref legacyBehavior>
                <a className="font-medium text-blue-600 hover:text-blue-500">
                  acesse sua conta existente
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
                <label htmlFor="name" className="sr-only">
                  Nome Completo
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
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
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Endereço de E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  autoComplete="new-password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Registrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;