// src/pages/dashboard.tsx
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const router = useRouter();
  const [userName, setUserName] = useState("usuário"); // Para exibir o nome do usuário

  useEffect(() => {
    // Verifica se há um token. Se não houver, redireciona para o login.
    const token = localStorage.getItem("politicamente_token");
    if (!token) {
      router.push("/login");
    }
    // TODO: No futuro, vamos buscar o nome do usuário da API usando o token
    // Por enquanto, fica uma mensagem genérica
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("politicamente_token"); // Remove o token
    router.push("/login"); // Redireciona para o login
  };

  return (
    <>
      <Head>
        <title>PoliticaMente - Dashboard</title>
        <meta name="description" content="Dashboard do PoliticaMente." />
      </Head>

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-lg text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Olá, {userName}!
          </h1>
          <p className="mt-2 text-xl text-gray-600">
            Bem-vindo ao PoliticaMente.
          </p>
          <p className="text-lg text-gray-500">
            Seu acesso foi validado com sucesso.
          </p>
          <div className="mt-6 flex flex-col space-y-4">
            <Link href="#" passHref legacyBehavior>
              {" "}
              {/* Link temporário */}
              <a className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
                Registrar Novo Voto (Em Breve)
              </a>
            </Link>
            <Link href="#" passHref legacyBehavior>
              {" "}
              {/* Link temporário */}
              <a className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300">
                Ver Histórico de Votos (Em Breve)
              </a>
            </Link>
            <button
              onClick={handleLogout}
              className="mt-8 px-6 py-3 bg-red-600 text-white rounded-lg text-lg font-semibold hover:bg-red-700 transition duration-300"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
