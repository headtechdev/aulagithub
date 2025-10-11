import { Card, CardContent } from "@/components/ui/card";
import { Bolt, Smartphone, Globe } from "lucide-react";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção 1: Transformamos ideias em aplicativos */}
      <section className="text-center py-16 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg mb-12">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-medium mb-6">
          <Bolt className="h-4 w-4 mr-2" /> Inovação em Desenvolvimento
        </div>
        <h1 className="text-5xl font-bold mb-6 leading-tight">
          Transformamos <span className="text-green-600">ideias</span> <span className="text-blue-600">em aplicativos</span>
        </h1>
        <p className="text-xl text-gray-700 max-w-3xl mx-auto">
          Especializados em desenvolvimento multiplataforma, criamos soluções tecnológicas que conectam sua empresa ao futuro digital.
        </p>
      </section>

      {/* Seção 2: Cards de Benefícios */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-xl mb-4">
              <Bolt className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Alta Performance</h3>
            <p className="text-gray-600">Código otimizado e experiência fluida</p>
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="bg-green-100 text-green-600 p-4 rounded-xl mb-4">
              <Smartphone className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Mobile First</h3>
            <p className="text-gray-600">Aplicativos nativos para iOS e Android</p>
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Multiplataforma</h3>
            <p className="text-gray-600">Soluções que funcionam em qualquer dispositivo</p>
          </CardContent>
        </Card>
      </section>

      {/* As imagens Home1, Home2, Home3, Home4 são representadas pelo texto e cards acima.
          Se houver conteúdo adicional nas imagens que não foi capturado, por favor, me avise! */}
    </div>
  );
};

export default Home;