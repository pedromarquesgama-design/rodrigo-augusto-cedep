import React, { useState } from 'react';
import { Product } from '../types/product';
import { getCustomProductImage } from '../config/productImages';

interface ProductVisualProps {
  product: Product;
  selectedVariationLabel?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  selectedVariationLabel,
  size = 'md',
  className = '',
}) => {
  const [imgError, setImgError] = useState(false);
  const customImageUrl = getCustomProductImage(product.id, product.image);

  if (customImageUrl && !imgError) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${className}`}>
        <img
          src={customImageUrl}
          alt={`${product.brand} — ${product.name}`}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{ maxWidth: '220px', maxHeight: '220px' }}
          className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    );
  }

  const accent = product.accentColor || '#202C70';
  const primaryVisc =
    product.viscosities[0] ||
    (selectedVariationLabel && /\d+W-\d+|SAE\s*\d+|DOT\s*4|ATF|ISO/i.exec(selectedVariationLabel)?.[0]) ||
    '';

  const brandShort = product.brand.split('/')[0].trim().toUpperCase().slice(0, 13);
  const titleShort = product.name.split('/')[0].trim().slice(0, 18);
  const uid = product.id.replace(/[^a-zA-Z0-9]/g, '');

  const renderContainerSvg = () => {
    switch (product.containerStyle) {
      case 'oil-bottle-1l':
      case 'oil-bottle-4l': {
        const is4L = product.containerStyle === 'oil-bottle-4l';
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Embalagem ilustrativa ${product.brand} ${product.name}`}>
            <defs>
              <linearGradient id={`body-${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="45%" stopColor="#1E293B" />
                <stop offset="100%" stopColor="#0F172A" />
              </linearGradient>
              <linearGradient id={`accent-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={accent} />
                <stop offset="100%" stopColor="#17191D" />
              </linearGradient>
              <linearGradient id={`shine-${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Floor shadow */}
            <ellipse cx="110" cy="224" rx={is4L ? '64' : '54'} ry="8" fill="#0F172A" opacity="0.12" />
            {/* Cap */}
            <rect x={is4L ? '64' : '72'} y="18" width="34" height="18" rx="4" fill={accent} />
            <rect x={is4L ? '62' : '70'} y="33" width="38" height="6" rx="2" fill="#B91C1C" opacity="0.85" />
            {/* Neck & Bottle Body */}
            <path
              d={
                is4L
                  ? 'M66 39 L96 39 L106 58 L156 64 C168 66 176 76 176 88 L176 204 C176 214 168 220 158 220 L62 220 C52 220 44 214 44 204 L44 82 C44 68 54 58 66 52 Z'
                  : 'M74 39 L102 39 L112 60 L152 68 C162 70 168 78 168 90 L168 204 C168 214 160 220 150 220 L70 220 C60 220 52 214 52 204 L52 82 C52 68 62 56 74 48 Z'
              }
              fill={`url(#body-${uid})`}
              stroke="#475569"
              strokeWidth="1.5"
            />
            {/* Handle cutout */}
            <path
              d={
                is4L
                  ? 'M136 78 L156 80 C160 81 163 85 163 90 L163 132 C163 137 159 140 155 140 L136 140 C132 140 130 136 130 132 L130 85 C130 81 132 78 136 78 Z'
                  : 'M136 82 L151 84 C155 85 157 88 157 93 L157 132 C157 136 154 139 150 139 L136 139 C133 139 131 136 131 132 L131 88 C131 84 133 82 136 82 Z'
              }
              fill="#F8FAFC"
              stroke="#334155"
              strokeWidth="2"
            />
            {/* Specular highlight */}
            <path d="M58 68 L74 58 L74 212 L58 212 Z" fill={`url(#shine-${uid})`} />
            {/* Front Label */}
            <rect x="60" y="96" width={is4L ? '64' : '64'} height="106" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
            <rect x="60" y="96" width="64" height="28" rx="6" fill={`url(#accent-${uid})`} />
            <rect x="60" y="116" width="64" height="8" fill={accent} />
            {/* Brand text */}
            <text x="92" y="113" textAnchor="middle" fill="#FFFFFF" fontSize="9.5" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            {/* Product title */}
            <text x="92" y="139" textAnchor="middle" fill="#17191D" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort.slice(0, 14)}
            </text>
            {/* Viscosity / Spec Pill */}
            <rect x="67" y="149" width="50" height="22" rx="4" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
            <text x="92" y="164" textAnchor="middle" fill="#202C70" fontSize="10.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              {primaryVisc || (is4L ? 'LINHA 4L' : 'MOTOR OIL')}
            </text>
            {/* Gold oil drop accent */}
            <circle cx="92" cy="186" r="6" fill="#F59E0B" />
            <text x="92" y="199" textAnchor="middle" fill="#64748B" fontSize="6.5" fontWeight="600" fontFamily="Inter, sans-serif">
              {is4L ? '4 LITROS / 1L' : '1 LITRO'}
            </text>
          </svg>
        );
      }

      case 'heavy-bucket-20l':
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Balde 20L ${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="222" rx="68" ry="9" fill="#0F172A" opacity="0.14" />
            {/* Wire handle */}
            <path d="M46 72 C46 28 174 28 174 72" fill="none" stroke="#94A3B8" strokeWidth="3.5" />
            <rect x="94" y="30" width="32" height="9" rx="4.5" fill="#1E293B" />
            {/* Bucket lid */}
            <rect x="42" y="54" width="136" height="16" rx="5" fill={accent} />
            <rect x="46" y="68" width="128" height="7" fill="#0F172A" opacity="0.25" />
            {/* Bucket body */}
            <polygon points="48,74 172,74 160,218 60,218" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
            {/* Brand Header Band */}
            <polygon points="49,82 171,82 167,124 53,124" fill={accent} />
            <text x="110" y="108" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            {/* Product Name */}
            <text x="110" y="146" textAnchor="middle" fill="#17191D" fontSize="9.5" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort}
            </text>
            {/* Spec Badge */}
            <rect x="68" y="156" width="84" height="26" rx="5" fill="#17191D" />
            <text x="110" y="173" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              {primaryVisc || 'LINHA PESADA'}
            </text>
            <text x="110" y="202" textAnchor="middle" fill="#64748B" fontSize="8" fontWeight="700" fontFamily="Inter, sans-serif">
              BALDE 20L / INDUSTRIAL
            </text>
          </svg>
        );

      case 'spray-aerosol':
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Spray ${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="224" rx="42" ry="7" fill="#0F172A" opacity="0.12" />
            {/* Spray nozzle */}
            <rect x="96" y="20" width="28" height="18" rx="4" fill={accent} />
            <circle cx="118" cy="29" r="3" fill="#FFFFFF" />
            {/* Metallic dome */}
            <path d="M76 58 C76 42 90 36 110 36 C130 36 144 42 144 58 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
            {/* Rim */}
            <rect x="73" y="56" width="74" height="5" rx="2" fill="#94A3B8" />
            {/* Can cylinder */}
            <rect x="75" y="61" width="70" height="156" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="1.5" />
            {/* Color band */}
            <rect x="75" y="61" width="70" height="46" fill={accent} />
            <text x="110" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            {/* Diagonal dynamic stripe */}
            <polygon points="75,107 145,95 145,112 75,124" fill="#F59E0B" />
            {/* Label */}
            <text x="110" y="146" textAnchor="middle" fill="#FFFFFF" fontSize="8.5" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort.slice(0, 15)}
            </text>
            <rect x="83" y="158" width="54" height="20" rx="3" fill="#334155" />
            <text x="110" y="171" textAnchor="middle" fill="#38BDF8" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              AEROSSOL
            </text>
            <text x="110" y="202" textAnchor="middle" fill="#94A3B8" fontSize="7.5" fontWeight="600" fontFamily="Inter, sans-serif">
              USO TÉCNICO
            </text>
            {/* Bottom rim */}
            <rect x="73" y="215" width="74" height="5" rx="2" fill="#94A3B8" />
          </svg>
        );

      case 'additive-bottle':
      case 'coolant-bottle': {
        const isCoolant = product.containerStyle === 'coolant-bottle';
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Frasco ${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="224" rx="46" ry="7" fill="#0F172A" opacity="0.12" />
            {/* Cap */}
            <rect x="94" y="18" width="32" height="18" rx="4" fill={accent} />
            {/* Neck */}
            <path d="M97 36 L123 36 L130 62 L148 76 C154 81 156 88 156 96 L156 206 C156 214 150 220 142 220 L78 220 C70 220 64 214 64 206 L64 96 C64 88 66 81 72 76 L90 62 Z" fill={isCoolant ? '#F8FAFC' : '#1E293B'} stroke="#94A3B8" strokeWidth="1.5" />
            {/* Liquid level for coolant */}
            {isCoolant && (
              <rect x="66" y="88" width="88" height="130" rx="8" fill={accent} opacity="0.18" />
            )}
            {/* Main Label */}
            <rect x="72" y="86" width="76" height="114" rx="6" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
            <rect x="72" y="86" width="76" height="32" rx="6" fill={accent} />
            <text x="110" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            <text x="110" y="138" textAnchor="middle" fill="#17191D" fontSize="8.5" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort.slice(0, 15)}
            </text>
            <rect x="80" y="150" width="60" height="22" rx="4" fill="#EEF1FA" />
            <text x="110" y="164" textAnchor="middle" fill="#202C70" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              {isCoolant ? 'RADIADOR' : primaryVisc || 'ADITIVO'}
            </text>
            <text x="110" y="189" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="600" fontFamily="Inter, sans-serif">
              ALTA PERFORMANCE
            </text>
          </svg>
        );
      }

      case 'grease-pot':
      case 'wax-tin': {
        const isWax = product.containerStyle === 'wax-tin';
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Pote ${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="216" rx="66" ry="9" fill="#0F172A" opacity="0.13" />
            {/* Lid */}
            <rect x="44" y={isWax ? '82' : '58'} width="132" height="22" rx="6" fill={accent} />
            {/* Body */}
            <path
              d={
                isWax
                  ? 'M48 104 L172 104 L168 202 C168 210 160 214 152 214 L68 214 C60 214 52 210 52 202 Z'
                  : 'M48 80 L172 80 L164 206 C164 212 158 216 150 216 L70 216 C62 216 56 212 56 206 Z'
              }
              fill="#1E293B"
              stroke="#475569"
              strokeWidth="1.5"
            />
            {/* Label */}
            <rect x="58" y={isWax ? '116' : '96'} width="104" height={isWax ? '82' : '102'} rx="6" fill="#FFFFFF" />
            <rect x="58" y={isWax ? '116' : '96'} width="104" height="28" rx="6" fill={accent} />
            <text x="110" y={isWax ? '134' : '114'} textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            <text x="110" y={isWax ? '160' : '146'} textAnchor="middle" fill="#17191D" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort.slice(0, 16)}
            </text>
            <text x="110" y={isWax ? '182' : '174'} textAnchor="middle" fill="#202C70" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace">
              {isWax ? 'ESTÉTICA & BRILHO' : 'GRAXA / PASTA'}
            </text>
          </svg>
        );
      }

      case 'service-kit':
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Kit Revisão ${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="222" rx="76" ry="9" fill="#0F172A" opacity="0.14" />
            {/* Back Filter Box */}
            <rect x="34" y="54" width="76" height="148" rx="6" fill="#202C70" stroke="#1E3A8A" strokeWidth="1.5" />
            <rect x="42" y="68" width="60" height="22" rx="3" fill="#D9252A" />
            <text x="72" y="83" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              FILTROS
            </text>
            <text x="72" y="108" textAnchor="middle" fill="#E2E8F0" fontSize="7.5" fontWeight="600" fontFamily="Inter, sans-serif">
              ÓLEO + AR + CABINE
            </text>
            {/* Front Oil Bottle */}
            <rect x="122" y="42" width="26" height="14" rx="3" fill={accent} />
            <path d="M124 56 L146 56 L154 74 L182 80 C188 82 192 88 192 96 L192 206 C192 212 186 218 180 218 L114 218 C108 218 102 212 102 206 L102 88 C102 76 112 66 124 56 Z" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
            <rect x="112" y="102" width="68" height="94" rx="5" fill="#FFFFFF" />
            <rect x="112" y="102" width="68" height="26" rx="5" fill={accent} />
            <text x="146" y="119" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            <text x="146" y="146" textAnchor="middle" fill="#17191D" fontSize="8.5" fontWeight="800" fontFamily="Inter, sans-serif">
              KIT REVISÃO
            </text>
            <rect x="120" y="156" width="52" height="20" rx="3" fill="#FEF2F2" />
            <text x="146" y="169" textAnchor="middle" fill="#D9252A" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              3 A 6 LITROS
            </text>
            {/* Cylinder Oil Filter in foreground */}
            <rect x="52" y="132" width="46" height="84" rx="6" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
            <rect x="52" y="132" width="46" height="12" rx="3" fill="#1E293B" />
            <text x="75" y="176" textAnchor="middle" fill="#17191D" fontSize="8" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              FILTRO
            </text>
          </svg>
        );

      case 'filter-box':
      case 'wiper-blade':
      case 'tachograph-disc':
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`Peça ${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="222" rx="64" ry="8" fill="#0F172A" opacity="0.12" />
            {/* Box */}
            <rect x="48" y="38" width="110" height="174" rx="6" fill={accent} stroke="#1E293B" strokeWidth="1.5" />
            <rect x="56" y="48" width="94" height="154" rx="4" fill="#FFFFFF" />
            <rect x="56" y="48" width="94" height="36" rx="4" fill={accent} />
            <text x="103" y="71" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            {/* Cylindrical filter or disc graphic */}
            <circle cx="103" cy="128" r="28" fill="#F1F5F9" stroke={accent} strokeWidth="3" />
            <circle cx="103" cy="128" r="12" fill="#1E293B" />
            <text x="103" y="178" textAnchor="middle" fill="#17191D" fontSize="8.5" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort.slice(0, 16)}
            </text>
            <text x="103" y="193" textAnchor="middle" fill="#64748B" fontSize="7" fontWeight="600" fontFamily="JetBrains Mono, monospace">
              REPOSIÇÃO ORIGINAL
            </text>
          </svg>
        );

      case 'sealant-tube':
      case 'tape-roll': {
        const isTape = product.containerStyle === 'tape-roll';
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="222" rx="56" ry="8" fill="#0F172A" opacity="0.12" />
            {isTape ? (
              <>
                <circle cx="110" cy="126" r="68" fill="#1E293B" stroke={accent} strokeWidth="8" />
                <circle cx="110" cy="126" r="36" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />
                <text x="110" y="122" textAnchor="middle" fill={accent} fontSize="13" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
                  {brandShort}
                </text>
                <text x="110" y="138" textAnchor="middle" fill="#17191D" fontSize="7.5" fontWeight="700" fontFamily="Inter, sans-serif">
                  LINHA TÉCNICA
                </text>
              </>
            ) : (
              <>
                {/* Nozzle */}
                <polygon points="104,16 116,16 122,52 98,52" fill={accent} />
                {/* Tube */}
                <rect x="76" y="52" width="68" height="154" rx="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
                <rect x="76" y="52" width="68" height="42" rx="4" fill={accent} />
                <text x="110" y="78" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
                  {brandShort}
                </text>
                <text x="110" y="124" textAnchor="middle" fill="#17191D" fontSize="8.5" fontWeight="700" fontFamily="Inter, sans-serif">
                  {titleShort.slice(0, 15)}
                </text>
                <rect x="84" y="140" width="52" height="22" rx="4" fill="#17191D" />
                <text x="110" y="154" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="700" fontFamily="JetBrains Mono, monospace">
                  ALTA TEMP.
                </text>
                <rect x="72" y="204" width="76" height="10" rx="2" fill="#475569" />
              </>
            )}
          </svg>
        );
      }

      default:
        return (
          <svg viewBox="0 0 220 240" className="h-full w-full drop-shadow-md" role="img" aria-label={`${product.brand} ${product.name}`}>
            <ellipse cx="110" cy="222" rx="62" ry="8" fill="#0F172A" opacity="0.12" />
            <rect x="52" y="44" width="116" height="168" rx="10" fill="#1E293B" stroke="#475569" strokeWidth="2" />
            <rect x="62" y="56" width="96" height="144" rx="6" fill="#FFFFFF" />
            <rect x="62" y="56" width="96" height="36" rx="6" fill={accent} />
            <text x="110" y="79" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="800" fontFamily="Plus Jakarta Sans, sans-serif">
              {brandShort}
            </text>
            <text x="110" y="122" textAnchor="middle" fill="#17191D" fontSize="9" fontWeight="700" fontFamily="Inter, sans-serif">
              {titleShort.slice(0, 16)}
            </text>
            <rect x="74" y="138" width="72" height="24" rx="4" fill="#EEF1FA" />
            <text x="110" y="154" textAnchor="middle" fill="#202C70" fontSize="8.5" fontWeight="800" fontFamily="JetBrains Mono, monospace">
              {primaryVisc || 'LINHA PRO'}
            </text>
            <text x="110" y="184" textAnchor="middle" fill="#64748B" fontSize="7.5" fontWeight="600" fontFamily="Inter, sans-serif">
              CEDEP CATÁLOGO
            </text>
          </svg>
        );
    }
  };

  const sizeClasses = {
    sm: 'h-20 w-20 p-1.5',
    md: 'h-48 w-full p-3',
    lg: 'h-72 w-full p-6',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-b from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9] select-none ${sizeClasses} ${className}`}
    >
      {/* Subtle technical grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage: 'radial-gradient(#CBD5E1 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full w-full flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
        {renderContainerSvg()}
      </div>
    </div>
  );
};

