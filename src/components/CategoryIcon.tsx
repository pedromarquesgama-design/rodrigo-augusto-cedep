import React from 'react';
import {
  Bike,
  Car,
  PackageCheck,
  Truck,
  Cog,
  Cylinder,
  Sparkles,
  Flame,
  ThermometerSnowflake,
  Droplets,
  Wind,
  Layers,
  Filter,
  Wrench,
  PaintBucket,
  Box,
} from 'lucide-react';

interface CategoryIconProps {
  iconName: string;
  className?: string;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ iconName, className = 'w-6 h-6' }) => {
  switch (iconName) {
    case 'Bike':
      return <Bike className={className} aria-hidden="true" />;
    case 'Car':
      return <Car className={className} aria-hidden="true" />;
    case 'PackageCheck':
      return <PackageCheck className={className} aria-hidden="true" />;
    case 'Truck':
      return <Truck className={className} aria-hidden="true" />;
    case 'Cog':
      return <Cog className={className} aria-hidden="true" />;
    case 'Cylinder':
      return <Cylinder className={className} aria-hidden="true" />;
    case 'Sparkles':
      return <Sparkles className={className} aria-hidden="true" />;
    case 'Flame':
      return <Flame className={className} aria-hidden="true" />;
    case 'ThermometerSnowflake':
      return <ThermometerSnowflake className={className} aria-hidden="true" />;
    case 'Droplets':
      return <Droplets className={className} aria-hidden="true" />;
    case 'Wind':
      return <Wind className={className} aria-hidden="true" />;
    case 'Layers':
      return <Layers className={className} aria-hidden="true" />;
    case 'Filter':
      return <Filter className={className} aria-hidden="true" />;
    case 'Wrench':
      return <Wrench className={className} aria-hidden="true" />;
    case 'PaintBucket':
      return <PaintBucket className={className} aria-hidden="true" />;
    default:
      return <Box className={className} aria-hidden="true" />;
  }
};

