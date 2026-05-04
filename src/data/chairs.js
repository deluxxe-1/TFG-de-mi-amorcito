// Chair SVG designs - each is a different style
export const chairs = [
  {
    id: 'adirondack',
    name: 'Adirondack',
    color: '#8B6F47',
    render: (color = '#8B6F47') => `
      <g>
        <!-- Seat -->
        <rect x="30" y="55" width="60" height="8" rx="3" fill="${color}" />
        <!-- Back slats -->
        <rect x="32" y="15" width="10" height="45" rx="2" fill="${color}" opacity="0.9" />
        <rect x="45" y="10" width="10" height="50" rx="2" fill="${color}" />
        <rect x="58" y="15" width="10" height="45" rx="2" fill="${color}" opacity="0.9" />
        <!-- Arms -->
        <rect x="20" y="45" width="15" height="5" rx="2" fill="${color}" opacity="0.8" />
        <rect x="85" y="45" width="15" height="5" rx="2" fill="${color}" opacity="0.8" transform="translate(-20, 0)" />
        <!-- Front legs -->
        <rect x="32" y="60" width="6" height="30" rx="2" fill="${color}" opacity="0.85" />
        <rect x="62" y="60" width="6" height="30" rx="2" fill="${color}" opacity="0.85" />
        <!-- Back legs -->
        <rect x="35" y="55" width="5" height="35" rx="2" fill="${color}" opacity="0.7" transform="rotate(-8, 37, 55)" />
        <rect x="60" y="55" width="5" height="35" rx="2" fill="${color}" opacity="0.7" transform="rotate(8, 62, 55)" />
      </g>
    `
  },
  {
    id: 'rocking',
    name: 'Mecedora',
    color: '#5a4530',
    render: (color = '#5a4530') => `
      <g>
        <!-- Rocker base -->
        <path d="M15 92 Q60 80 105 92" stroke="${color}" stroke-width="4" fill="none" stroke-linecap="round" />
        <!-- Legs -->
        <line x1="35" y1="60" x2="30" y2="88" stroke="${color}" stroke-width="4" stroke-linecap="round" />
        <line x1="75" y1="60" x2="80" y2="88" stroke="${color}" stroke-width="4" stroke-linecap="round" />
        <!-- Seat -->
        <rect x="30" y="55" width="50" height="6" rx="3" fill="${color}" />
        <!-- Back -->
        <path d="M32 55 Q55 5 78 55" stroke="${color}" stroke-width="3" fill="none" />
        <line x1="43" y1="20" x2="40" y2="55" stroke="${color}" stroke-width="3" stroke-linecap="round" />
        <line x1="55" y1="15" x2="55" y2="55" stroke="${color}" stroke-width="3" stroke-linecap="round" />
        <line x1="67" y1="20" x2="70" y2="55" stroke="${color}" stroke-width="3" stroke-linecap="round" />
        <!-- Arms -->
        <path d="M30 40 Q25 42 22 50" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" />
        <path d="M80 40 Q85 42 88 50" stroke="${color}" stroke-width="3" fill="none" stroke-linecap="round" />
      </g>
    `
  },
  {
    id: 'bench',
    name: 'Banco de Jardín',
    color: '#6d8a5e',
    render: (color = '#6d8a5e') => `
      <g>
        <!-- Seat planks -->
        <rect x="15" y="55" width="90" height="5" rx="2" fill="${color}" />
        <rect x="15" y="48" width="90" height="5" rx="2" fill="${color}" opacity="0.9" />
        <!-- Back planks -->
        <rect x="18" y="18" width="84" height="5" rx="2" fill="${color}" opacity="0.85" />
        <rect x="18" y="26" width="84" height="5" rx="2" fill="${color}" opacity="0.9" />
        <rect x="18" y="34" width="84" height="5" rx="2" fill="${color}" opacity="0.95" />
        <!-- Side supports -->
        <rect x="18" y="15" width="5" height="75" rx="2" fill="${color}" opacity="0.8" />
        <rect x="97" y="15" width="5" height="75" rx="2" fill="${color}" opacity="0.8" />
        <!-- Legs -->
        <rect x="22" y="58" width="5" height="32" rx="2" fill="${color}" opacity="0.7" />
        <rect x="93" y="58" width="5" height="32" rx="2" fill="${color}" opacity="0.7" />
        <!-- Cross brace -->
        <line x1="25" y1="78" x2="96" y2="78" stroke="${color}" stroke-width="3" opacity="0.5" />
      </g>
    `
  },
  {
    id: 'hammock',
    name: 'Hamaca',
    color: '#d4956a',
    render: (color = '#d4956a') => `
      <g>
        <!-- Posts -->
        <rect x="10" y="10" width="5" height="80" rx="2" fill="#8B6F47" />
        <rect x="105" y="10" width="5" height="80" rx="2" fill="#8B6F47" />
        <!-- Rope tops -->
        <circle cx="12" cy="12" r="3" fill="#8B6F47" />
        <circle cx="108" cy="12" r="3" fill="#8B6F47" />
        <!-- Hammock fabric -->
        <path d="M12 15 Q60 75 108 15" stroke="${color}" stroke-width="2" fill="${color}" opacity="0.6" />
        <path d="M12 15 Q60 80 108 15" stroke="${color}" stroke-width="1" fill="none" opacity="0.3" />
        <!-- Hammock lines -->
        <line x1="12" y1="15" x2="35" y2="52" stroke="${color}" stroke-width="1" opacity="0.5" />
        <line x1="12" y1="15" x2="50" y2="60" stroke="${color}" stroke-width="1" opacity="0.5" />
        <line x1="108" y1="15" x2="85" y2="52" stroke="${color}" stroke-width="1" opacity="0.5" />
        <line x1="108" y1="15" x2="70" y2="60" stroke="${color}" stroke-width="1" opacity="0.5" />
        <!-- Decorative fringes -->
        <line x1="30" y1="45" x2="28" y2="55" stroke="${color}" stroke-width="1" opacity="0.4" />
        <line x1="90" y1="45" x2="92" y2="55" stroke="${color}" stroke-width="1" opacity="0.4" />
      </g>
    `
  },
  {
    id: 'stump',
    name: 'Tronco',
    color: '#7a5c3a',
    render: (color = '#7a5c3a') => `
      <g>
        <!-- Stump body -->
        <ellipse cx="60" cy="85" rx="30" ry="8" fill="${color}" opacity="0.7" />
        <rect x="30" y="45" width="60" height="40" rx="5" fill="${color}" />
        <!-- Top surface -->
        <ellipse cx="60" cy="45" rx="30" ry="10" fill="${color}" />
        <ellipse cx="60" cy="45" rx="28" ry="9" fill="${color}" opacity="0.8" />
        <!-- Tree rings -->
        <ellipse cx="60" cy="45" rx="20" ry="6" fill="none" stroke="${color}" stroke-width="1" opacity="0.3" />
        <ellipse cx="60" cy="45" rx="12" ry="4" fill="none" stroke="${color}" stroke-width="1" opacity="0.3" />
        <ellipse cx="60" cy="45" rx="5" ry="2" fill="${color}" opacity="0.5" />
        <!-- Bark texture -->
        <line x1="35" y1="50" x2="35" y2="80" stroke="${color}" stroke-width="1" opacity="0.2" />
        <line x1="50" y1="52" x2="50" y2="82" stroke="${color}" stroke-width="1" opacity="0.2" />
        <line x1="70" y1="52" x2="70" y2="82" stroke="${color}" stroke-width="1" opacity="0.2" />
        <line x1="85" y1="50" x2="85" y2="80" stroke="${color}" stroke-width="1" opacity="0.2" />
        <!-- Mushrooms -->
        <ellipse cx="88" cy="70" rx="5" ry="2" fill="#d4a574" />
        <rect x="87" y="70" width="3" height="5" rx="1" fill="#c49a6c" />
      </g>
    `
  }
]
