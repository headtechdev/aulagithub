import React from "react";
import { LucideIcon } from "lucide-react";

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
  return (
    <section className={`text-center py-16 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-lg mb-12`}>
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-opacity-20 text-sm font-medium mb-6"
           style={{ backgroundColor: `var(--${gradientFrom.split('-')[1]}-100)`, color: `var(--${gradientFrom.split('-')[1]}-700)` }}>
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