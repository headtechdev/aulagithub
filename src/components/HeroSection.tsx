import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils"; // Importar cn para combinar classes Tailwind

interface HeroSectionProps {
  title: React.ReactNode;
  subtitle: string;
  icon: LucideIcon;
  iconText: string;
  gradientFrom: string;
  gradientTo: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  icon: Icon,
  iconText,
  gradientFrom,
  gradientTo,
}) => {
  // Extrai o nome da cor (ex: 'green', 'blue', 'yellow') de 'from-green-50'
  const colorName = gradientFrom.split('-')[1]; 
  
  // Constrói as classes Tailwind dinamicamente
  const iconBgClass = `bg-${colorName}-100`;
  const iconTextColorClass = `text-${colorName}-700`;

  return (
    <section className={`text-center py-16 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg mb-12`}>
      <div className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mb-6",
        iconBgClass,
        iconTextColorClass
      )}>
        <Icon className="h-4 w-4 mr-2" /> {iconText}
      </div>
      <h1 className="text-5xl font-bold mb-6 leading-tight">
        {title}
      </h1>
      <p className="text-xl text-gray-700 max-w-3xl mx-auto">
        {subtitle}
      </p>
    </section>
  );
};

export default HeroSection;