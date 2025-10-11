import { CheckCircle2 } from "lucide-react";

const QuemSomos = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção 1: Quem Somos */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-12">
        <h1 className="text-5xl font-bold mb-4 leading-tight">
          Quem <span className="text-green-600">Somos</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          A Headtechdev é uma empresa especializada em consultoria e desenvolvimento de softwares, com foco em aplicativos multiplataformas de alta qualidade.
        </p>
      </section>

      {/* Seção 2: Nossa História e Diferenciais */}
      <section className="flex flex-col md:flex-row gap-12 items-start mb-12">
        <div className="md:w-2/3">
          <h2 className="text-4xl font-bold mb-6">Nossa História</h2>
          <p className="text-lg text-gray-700 mb-4">
            Fundada com a visão de democratizar o acesso à tecnologia, a Headtechdev nasceu da paixão por criar soluções inovadoras que fazem a diferença na vida das pessoas e empresas.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Nossa equipe é composta por desenvolvedores experientes e consultores especializados, unidos pelo objetivo comum de entregar excelência em cada projeto que desenvolvemos.
          </p>
          <p className="text-lg text-gray-700">
            Acreditamos que a tecnologia deve ser acessível, intuitiva e poderosa. Por isso, focamos no desenvolvimento de aplicativos multiplataformas que atendem às necessidades específicas de cada cliente.
          </p>
        </div>
        <div className="md:w-1/3 bg-gray-50 p-8 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-6">O que nos diferencia</h3>
          <ul className="space-y-4 text-lg text-gray-800">
            <li className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-green-500 mr-3" /> Expertise em desenvolvimento multiplataforma
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-yellow-500 mr-3" /> Abordagem consultiva personalizada
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-blue-500 mr-3" /> Foco na experiência do usuário
            </li>
            <li className="flex items-center">
              <CheckCircle2 className="h-6 w-6 text-purple-500 mr-3" /> Suporte contínuo e evolução constante
            </li>
          </ul>
        </div>
      </section>

      {/* Seção 3: Nossos Valores */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4">Nossos <span className="text-green-600">Valores</span></h2>
        <p className="text-lg text-gray-700 mb-10">
          Os princípios que guiam cada decisão e ação da nossa empresa
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-green-100 text-green-600 p-4 rounded-xl inline-flex mb-4">
              <span className="text-3xl">☐</span> {/* Placeholder for icon */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Transparência</h3>
            <p className="text-gray-600">Comunicação clara e honesta em todos os processos</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl inline-flex mb-4">
              <span className="text-3xl">☐</span> {/* Placeholder for icon */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Agilidade</h3>
            <p className="text-gray-600">Entregas rápidas sem comprometer a qualidade</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-xl inline-flex mb-4">
              <span className="text-3xl">☐</span> {/* Placeholder for icon */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Colaboração</h3>
            <p className="text-gray-600">Trabalho em equipe com clientes e parceiros</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="bg-purple-100 text-purple-600 p-4 rounded-xl inline-flex mb-4">
              <span className="text-3xl">☐</span> {/* Placeholder for icon */}
            </div>
            <h3 className="text-xl font-semibold mb-2">Evolução</h3>
            <p className="text-gray-600">Aprendizado contínuo e melhoria constante</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuemSomos;