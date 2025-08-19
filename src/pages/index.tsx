// src/pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';

const HomePage = () => {
  return (
    <>
      <Head>
        <title>PoliticaMente - Sua Memória Cívica</title>
        <meta name="description" content="PoliticaMente: Registre seus votos e construa sua memória cívica." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen flex-col items-center justify-center p-24">
        <h1 className="text-5xl font-bold text-center mb-8">
          Bem-vindo ao <span className="text-blue-600">PoliticaMente</span>
        </h1>

        <p className="text-xl text-center mb-12 max-w-2xl">
          Registre seus votos, construa sua memória cívica e participe ativamente da democracia.
        </p>

        <div className="flex space-x-4">
          <Link href="/login" passHref legacyBehavior>
            <a className="px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition duration-300">
              Entrar
            </a>
          </Link>
          <Link href="/register" passHref legacyBehavior>
            <a className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg text-lg font-semibold hover:bg-blue-50 transition duration-300">
              Registrar
            </a>
          </Link>
        </div>
      </main>
    </>
  );
};

export default HomePage;