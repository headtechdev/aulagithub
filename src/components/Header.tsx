import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
// import { useTheme } from "next-themes"; // Removido
// import { ThemeToggle } from "./ThemeToggle"; // Removido

const Header = () => {
  // const { theme } = useTheme(); // Removido

  // O logo será sempre a versão escura (para fundos claros)
  const logoSrc = "/Logo-Head-Dark-1.png";
  const logoAlt = "Headtechdev Logo";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoSrc} alt={logoAlt} className="h-12" /> {/* Alterado de h-10 para h-12 */}
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-base")}> {/* Adicionado text-base */}
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/quem-somos">
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-base")}> {/* Adicionado text-base */}
                  Quem Somos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/missao-visao">
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-base")}> {/* Adicionado text-base */}
                  Missão e Visão
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/tic-tac-toe"> {/* Novo link para o jogo da velha */}
                <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "text-base")}>
                  Jogo da Velha
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            {/* <NavigationMenuItem> */}
              {/* <ThemeToggle /> */} {/* Removido */}
            {/* </NavigationMenuItem> */}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;