import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center md:items-start text-center md:text-left">
        <div className="mb-6 md:mb-0 md:w-1/3">
          <Link to="/" className="flex items-center justify-center md:justify-start mb-4">
            <img src="/logo.png" alt="Headtechdev Logo" className="h-8 invert" />
          </Link>
          <p className="text-sm max-w-xs mx-auto md:mx-0">
            Desenvolvemos aplicativos multiplataformas de alta qualidade, transformando ideias em soluções tecnológicas inovadoras.
          </p>
          <p className="text-xs mt-4">
            © 2024 Headtechdev. Todos os direitos reservados.
          </p>
        </div>

        <div className="mb-6 md:mb-0 md:w-1/3">
          <h3 className="text-lg font-semibold text-green-400 mb-4">Serviços</h3>
          <ul className="space-y-2 text-sm">
            <li>Desenvolvimento Mobile</li>
            <li>Aplicativos Web</li>
            <li>Consultoria Técnica</li>
            <li>Soluções Multiplataformas</li>
          </ul>
        </div>

        <div className="md:w-1/3">
          <h3 className="text-lg font-semibold text-yellow-400 mb-4">Contato</h3>
          <ul className="space-y-2 text-sm">
            <li>contato@headtechdev.com.br</li>
            <li>+55 (11) 95697-4700</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;