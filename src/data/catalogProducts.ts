import { CatalogProduct } from '../types';

export const catalogProducts: CatalogProduct[] = [
  {
    id: 'lock-001',
    name: 'LOCK,PAD,OPERATION,6MM,40MM,17.2MM,BRS',
    description: 'Brass padlock for operational use with 6mm shackle diameter',
    category: 'Locks & Security',
    inStock: true,
    specifications: ['6mm shackle diameter', '40mm width', '17.2mm height', 'Brass construction']
  },
  {
    id: 'lock-002',
    name: 'LOCK,PAD,SAFETY,6MM,40MM,17.2MM,BRS/RED',
    description: 'Safety padlock in brass/red finish for lockout/tagout procedures',
    category: 'Locks & Security',
    inStock: true,
    specifications: ['6mm shackle diameter', '40mm width', '17.2mm height', 'Brass/Red finish', 'Safety rated']
  },
  {
    id: 'lock-003',
    name: 'LOCK,CYLINDER,BRS,17WDX45DPX33MM HT',
    description: 'Brass cylinder lock with specific dimensions',
    category: 'Locks & Security',
    inStock: true,
    specifications: ['17mm width', '45mm depth', '33mm height', 'Brass construction']
  },
  {
    id: 'key-001',
    name: 'KEY,MASTER,BRS,47MMX2MM THK',
    description: 'Master key in brass construction',
    category: 'Keys & Accessories',
    inStock: true,
    specifications: ['47mm length', '2mm thickness', 'Brass construction', 'Master key type']
  },
  {
    id: 'oil-001',
    name: 'OIL,INSUL,TRANSFORMER,0.19 SPGR,30KV',
    description: 'Transformer insulating oil with specific gravity 0.19',
    category: 'Electrical Fluids',
    inStock: true,
    specifications: ['0.19 specific gravity', '30KV rating', 'Transformer grade', 'Insulating properties']
  },
  {
    id: 'cable-001',
    name: 'CABLE,PWR,600V/1KV,CU,1C,35MM2,XLPE',
    description: 'Single core copper power cable with XLPE insulation',
    category: 'Power Cables',
    inStock: true,
    specifications: ['600V/1KV rating', 'Copper conductor', '35mm² cross-section', 'XLPE insulation']
  },
  {
    id: 'cable-002',
    name: 'CABLE,PWR,600V/1KV,CU,1C,120MM2,XLPE',
    description: 'Single core copper power cable 120mm² with XLPE insulation',
    category: 'Power Cables',
    inStock: true,
    specifications: ['600V/1KV rating', 'Copper conductor', '120mm² cross-section', 'XLPE insulation']
  },
  {
    id: 'cable-003',
    name: 'CABLE,PWR,600V/1KV,AL,4C,70MM2,XLPE',
    description: '4-core aluminum power cable with XLPE insulation',
    category: 'Power Cables',
    inStock: true,
    specifications: ['600V/1KV rating', 'Aluminum conductor', '4-core', '70mm² cross-section', 'XLPE insulation']
  },
  {
    id: 'cable-004',
    name: 'CABLE,PWR,15KV,CU,3C,300/35MM2,XPLE,ARM',
    description: '15KV armored copper power cable, 3-core',
    category: 'High Voltage Cables',
    inStock: true,
    specifications: ['15KV rating', 'Copper conductor', '3-core', '300/35mm²', 'Armored construction']
  },
  {
    id: 'joint-001',
    name: 'JOINT KIT,STR,1KV,4X70MM2,AL,UAR',
    description: 'Straight joint kit for 1KV aluminum cables',
    category: 'Cable Accessories',
    inStock: true,
    specifications: ['1KV rating', '4x70mm²', 'Aluminum conductor', 'Straight joint', 'UAR type']
  },
  {
    id: 'term-001',
    name: 'TERM KIT,STR,15KV,3X185/35MM2,CU',
    description: 'Straight termination kit for 15KV copper cables',
    category: 'Cable Accessories',
    inStock: true,
    specifications: ['15KV rating', '3x185/35mm²', 'Copper conductor', 'Straight termination']
  },
  {
    id: 'connector-001',
    name: 'CONNECTOR,LUG,35MM2 CU,(1)M10 BLT HL',
    description: 'Copper cable lug connector with bolt hole',
    category: 'Electrical Connectors',
    inStock: true,
    specifications: ['35mm² capacity', 'Copper construction', 'M10 bolt hole', 'Single bolt']
  },
  {
    id: 'insulator-001',
    name: 'INSULATOR,POST,PORC,13.8KV,152MM D,552MM',
    description: 'Porcelain post insulator for 13.8KV applications',
    category: 'Insulators',
    inStock: true,
    specifications: ['13.8KV rating', '152mm diameter', '552mm height', 'Porcelain construction']
  },
  {
    id: 'pole-001',
    name: 'POLE,PWR,DIST,OC10,STL,10M LG',
    description: 'Steel distribution pole, 10 meters length',
    category: 'Poles & Structures',
    inStock: true,
    specifications: ['Steel construction', '10m length', 'Distribution class', 'OC10 type']
  },
  {
    id: 'switch-001',
    name: 'SWITCH,OHD,VERTICAL,13.8KV,3P,400A',
    description: 'Overhead vertical switch for 13.8KV systems',
    category: 'Switching Equipment',
    inStock: true,
    specifications: ['13.8KV rating', '3-pole', '400A capacity', 'Vertical mounting', 'Overhead type']
  },
  {
    id: 'panel-001',
    name: 'PANEL,DIST,1600A,4-400A CB',
    description: 'Distribution panel with 1600A main and 4x400A circuit breakers',
    category: 'Distribution Panels',
    inStock: true,
    specifications: ['1600A main capacity', '4x400A circuit breakers', 'Distribution type']
  },
  {
    id: 'transformer-001',
    name: 'TFMR,PD,500KVA,13.8KX400/231V,95KVB',
    description: 'Pad-mounted distribution transformer 500KVA',
    category: 'Transformers',
    inStock: true,
    specifications: ['500KVA capacity', '13.8KV primary', '400/231V secondary', '95KV BIL', 'Pad-mounted']
  },
  {
    id: 'capacitor-001',
    name: 'CAPACITOR BANK,450KVAR,15KV,95KV BIL,FX',
    description: 'Fixed capacitor bank for power factor correction',
    category: 'Capacitors',
    inStock: true,
    specifications: ['450KVAR capacity', '15KV rating', '95KV BIL', 'Fixed type']
  },
  {
    id: 'arrester-001',
    name: 'ARRESTER,SURGE,15KV,345MM CRP,5KA OPR',
    description: 'Surge arrester for 15KV systems',
    category: 'Protection Equipment',
    inStock: true,
    specifications: ['15KV rating', '345mm creepage', '5KA operation', 'Surge protection']
  },
  {
    id: 'meter-001',
    name: 'METER,KWH,3×20(100)A,3P,220/127&380/220V',
    description: 'Three-phase energy meter for revenue metering',
    category: 'Metering Equipment',
    inStock: true,
    specifications: ['3-phase', '20(100)A rating', '220/127 & 380/220V', 'kWh measurement']
  }
];

export const productCategories = [
  'All Categories',
  'Locks & Security',
  'Keys & Accessories',
  'Electrical Fluids',
  'Power Cables',
  'High Voltage Cables',
  'Cable Accessories',
  'Electrical Connectors',
  'Insulators',
  'Poles & Structures',
  'Switching Equipment',
  'Distribution Panels',
  'Transformers',
  'Capacitors',
  'Protection Equipment',
  'Metering Equipment'
];