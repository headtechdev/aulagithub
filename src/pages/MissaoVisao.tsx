import { Heart, Rocket, Lightbulb, Users, Eye, Globe, Bolt } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import HeroSection from "@/components/HeroSection"; // Importando o novo componente

const MissaoVisao = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Seção 1: Nossa Missão - Usando HeroSection */}
      <HeroSection
        icon={Heart}
        iconText="Nossa Missão"
        title={
          <>
            Transformar o <span className="text-green-600">Mundo</span>{" "}
            <span className="text-yellow-600">através da Tecnologia</span>
          </>
        }
        subtitle="Nossa missão é desenvolver soluções tecnológicas inovadoras que simplificam processos, conectam pessoas e impulsionam o crescimento dos nossos clientes."
        gradientFrom="from-green-50"
        gradientTo="to-yellow-50"
      />

      {/* Seção 2: Pilares da Missão */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="bg-green-100 text-green-600 p-4 rounded-xl mb-4">
              <Rocket className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Inovação Constante</h3>
            <p className="text-gray-600">Estamos sempre na vanguarda da tecnologia, explorando novas ferramentas e metodologias, para criar soluções que superam expectativas e antecipam necessidades futuras do mercado.</p>
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="bg-yellow-100 text-yellow-600 p-4 rounded-xl mb-4">
              <Heart className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Foco no Cliente</h3>
            <p className="text-gray-600">Cada projeto é único e merece atenção personalizada. Trabalhamos lado a lado com nossos clientes para entender suas necessidades e entregar soluções que realmente fazem a diferença em seus negócios.</p>
          </CardContent>
        </Card>
        <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardContent className="flex flex-col items-center justify-center p-0">
            <div className="bg-blue-100 text-blue-600 p-4 rounded-xl mb-4">
              <Lightbulb className="h-8 w-8" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Excelência Técnica</h3>
            <p className="text-gray-600">Comprometemo-nos com a mais alta qualidade em código, design e experiência do usuário. Nossa equipe segue as melhores práticas da indústria para garantir produtos robustos e escaláveis.</p>
          </CardContent>
        </Card>
      </section>

      {/* Seção 3: Nossa Visão - Usando HeroSection */}
      <HeroSection
        icon={Eye}
        iconText="Nossa Visão"
        title={
          <>
            Ser Referência em <span className="text-blue-600">Inovação</span>
          </>
        }
        subtitle="Nossa visão é ser reconhecida como a principal referência em desenvolvimento de aplicativos multiplataformas, liderando a transformação digital das empresas através de soluções inovadoras e de alta qualidade."
        gradientFrom="from-blue-50"
        gradientTo="to-purple-50"
      />

      {/* Seção 4: Pilares da Visão */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold mb-4">Pilares da Nossa <span className="text-blue-600">Visão</span></h2>
        <p className="text-lg text-gray-700 mb-10">
          Os fundamentos que nos guiam rumo ao futuro que queremos construir
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="bg-green-100 text-green-600 p-4 rounded-xl inline-flex mb-4">
                <Users className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Impacto Social</h3>
              <p className="text-gray-600">Utilizar nossa expertise tecnológica para criar soluções que gerem impacto social positivo. Queremos contribuir para um mundo mais conectado, eficiente e sustentável através da tecnologia.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-xl inline-flex mb-4">
                <Eye className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Liderança de Mercado</h3>
              <p className="text-gray-600">Tornar-nos a primeira escolha quando empresas pensam em desenvolvimento multiplataforma. Queremos definir padrões de qualidade e ser referência em excelência técnica e atendimento.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="bg-blue-100 text-blue-600 p-4 rounded-xl inline-flex mb-4">
                <Globe className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Alcance Global</h3>
              <p className="text-gray-600">Expandir nossa presença para além das fronteiras nacionais, levando soluções brasileiras de qualidade para o mundo todo. Queremos ser reconhecidos internacionalmente pela excelência em desenvolvimento multiplataforma.</p>
            </CardContent>
          </Card>
          <Card className="text-center p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardContent className="flex flex-col items-center justify-center p-0">
              <div className="bg-purple-100 text-purple-600 p-4 rounded-xl inline-flex mb-4">
                <Bolt className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Inovação Contínua</h3>
              <p className="text-gray-600">Estar sempre na vanguarda tecnológica, antecipando tendências e desenvolvendo soluções que definem o futuro do desenvolvimento de software. Investimos continuamente em pesquisa e desenvolvimento.</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default MissaoVisao;