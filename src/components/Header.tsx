import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { useTheme } from "next-themes";
import { ThemeToggle } from "./ThemeToggle";

const Header = () => {
  const { theme } = useTheme();

  // 'logo.png' é o logo claro (para fundos escuros)
  // 'Logo-Head-Dark-1.png' é o logo escuro (para fundos claros)
  const logoSrc = theme === "dark" ? "/logo.png" : "/Logo-Head-Dark-1.png";
  const logoAlt = "Headtechdev Logo";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <img src={logoSrc} alt={logoAlt} className="h-8" />
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link to="/">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Home
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/quem-somos">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Quem Somos
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link to="/missao-visao">
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Missão e Visão
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <ThemeToggle />
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
};

export default Header;