import {
  IconBattery2,
  IconCpu,
  IconCylinder,
  IconDeviceSdCard,
  IconRoute2,
  IconUsb,
  IconVideo,
} from '@tabler/icons-react'
import {
  Atom,
  Brain,
  BrainCircuit,
  CircuitBoard,
  Cpu,
  Dna,
  FileSearch,
  FlaskConical,
  Globe,
  Lightbulb,
  Link2,
  MemoryStick,
  RadioTower,
  Scan,
  ShieldCheck,
  Sparkles,
  Wrench,
} from 'lucide-react'

export const MODEL_URL = '/models/motherboard/maya2sketchfab.fbx'

const PART_MATCHERS = [
  { key: 'cpu', patterns: ['cpu', 'lga', 'pin'] },
  { key: 'gpu', patterns: ['gpu', 'graphics'] },
  { key: 'ram', patterns: ['ram', 'ddr', 'dimm', 'memory'] },
  { key: 'm2', patterns: ['m2', 'ssd', 'nvme', 'storage'] },
  { key: 'chipset', patterns: ['chipset', 'chip'] },
  { key: 'capacitors', patterns: ['capacitor'] },
  { key: 'power', patterns: ['power', 'psu', 'atx', 'eps', '24pin', '8pin', 'connector', 'pwm', 'battery', 'vrm'] },
  { key: 'io', patterns: ['io', 'usb', 'ethernet', 'audio', 'hdmi', 'displayport', 'type-c', 'type_c', 'pcie', 'port', 'lan', 'jack', 'antenna', 'video'] },
]

export function matchPartKey(name = '') {
  const n = String(name).toLowerCase()
  for (const m of PART_MATCHERS) {
    if (m.patterns.some((p) => n.includes(p))) return m.key
  }
  return 'board'
}

export function matchPart(mesh) {
  const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : []
  const matName = materials.map((m) => m.name || '').join(' ')
  const byMaterial = matchPartKey(matName)
  if (byMaterial !== 'board') return byMaterial
  return matchPartKey(mesh.name)
}

export const PART_ORDER = ['cpu', 'gpu', 'ram', 'chipset', 'm2', 'capacitors', 'power', 'io', 'board']

export const PART_DEFS = {
  cpu: {
    key: 'cpu',
    shortName: 'CPU',
    name: 'CPU — Central Processing Unit',
    icon: IconCpu,
    tagline: 'The brain of the computer',
    description:
      'The CPU is the processor that executes every instruction your software runs. It fetches, decodes, and processes billions of operations per second, acting as the command center for the whole system.',
    howItWorks:
      'Modern CPUs contain multiple cores, a control unit, and layers of ultra-fast cache memory right on the chip. Each core handles one instruction stream at a time, so more cores mean more work done in parallel. Chips like the Apple M2 pack around 24 billion transistors and boost past 5 GHz.',
    future:
      'Quantum CPUs will replace ordinary bits with qubits that can be 0 and 1 at the same time (superposition). That lets a quantum machine explore many solutions simultaneously — a 300-qubit computer could hold more states than there are atoms in the visible universe.',
  },
  gpu: {
    key: 'gpu',
    shortName: 'GPU',
    name: 'GPU — Graphics Processing Unit',
    icon: IconVideo,
    tagline: 'Parallel powerhouse for graphics and AI',
    description:
      'The GPU is a massively parallel processor built for graphics rendering. It crunches thousands of calculations at once, which also makes it ideal for machine learning and scientific simulations.',
    howItWorks:
      'Where a CPU has a few very fast cores, a GPU has thousands of small cores that split a task into tiny parallel chunks. The NVIDIA RTX 4090, for example, packs 16,384 CUDA cores — that parallelism is why GPUs train modern neural networks.',
    future:
      'GPUs are merging with dedicated AI accelerators and photonic links, so data moves between cores at the speed of light. Expect real-time deep learning, raytraced everything, and on-device assistants powered by trillion-parameter models.',
  },
  ram: {
    key: 'ram',
    shortName: 'RAM',
    name: 'RAM — Random Access Memory',
    icon: MemoryStick,
    tagline: 'The short-term working memory',
    description:
      'RAM is the temporary workspace where the CPU keeps the data and instructions it is using right now. It is extremely fast, but it forgets everything the moment the power goes off.',
    howItWorks:
      'RAM is volatile memory arranged in rows and columns of cells. Modern DDR5 modules run at speeds around 4800 MT/s, and typical desktops use 16–128 GB. Because it sits much closer to the CPU than storage, it feeds the processor data with almost no delay.',
    future:
      'Tomorrow\'s memory will blur the line between RAM and storage — optical RAM using light and DNA-based memory that could store data for millions of years are already being researched by labs like Microsoft and IBM.',
  },
  chipset: {
    key: 'chipset',
    shortName: 'Chipset',
    name: 'Chipset — The Traffic Controller',
    icon: IconRoute2,
    tagline: 'Routes data between every component',
    description:
      'The chipset is the motherboard\'s traffic controller. It manages the flow of data between the CPU, memory, storage, expansion cards, and every connected device.',
    howItWorks:
      'Modern chipsets like the Intel Z790 or AMD X670E provide high-speed PCIe 5.0 lanes (128 GB/s), USB ports, and chip-to-chip links. The chipset decides which device talks to the CPU when — without it, nothing could communicate.',
    future:
      'Chipsets will embed dedicated AI accelerators and neuromorphic logic that mimics the human brain, letting the platform itself optimize performance, predict workloads, and manage power automatically.',
  },
  m2: {
    key: 'm2',
    shortName: 'M.2 SSD',
    name: 'M.2 SSD — Ultra-Fast Storage',
    icon: IconDeviceSdCard,
    tagline: 'Permanent, lightning-fast storage',
    description:
      'The M.2 slot holds an NVMe solid-state drive — permanent storage that survives power loss. M.2 SSDs are small cards that screw directly onto the board and reach speeds traditional drives never could.',
    howItWorks:
      'SSDs use flash memory chips with no moving parts. NVMe drives talk directly to the CPU over PCIe, hitting read speeds around 7000 MB/s. That is why your computer boots in seconds — the OS lives on this tiny card.',
    future:
      'Storage is about to merge with memory. 3D XPoint and storage-class memory will erase the boundary between RAM and disk, while DNA storage promises to pack 10 TB into a single gram of material.',
  },
  capacitors: {
    key: 'capacitors',
    shortName: 'Capacitors',
    name: 'Capacitors — Voltage Stabilizers',
    icon: IconCylinder,
    tagline: 'Keep power smooth and stable',
    description:
      'Capacitors are small components that store a tiny charge and release it instantly. They smooth out the power flowing to the CPU and memory, filtering out electrical noise that would cause crashes.',
    howItWorks:
      'Every time the CPU suddenly demands more current, the capacitors nearby supply it faster than the power supply alone could. They act like mini-reservoirs, keeping voltage stable under rapid load changes.',
    future:
      'Supercapacitors are being developed that charge in seconds and hold enormous energy. They could one day replace batteries entirely, giving devices instant charging and near-limitless cycle life.',
  },
  power: {
    key: 'power',
    shortName: 'Power & Battery',
    name: 'Power Delivery & Battery',
    icon: IconBattery2,
    tagline: 'Feeds every component',
    description:
      'The power connectors carry electricity from the power supply into the motherboard. Voltage regulators on the board then convert it to the exact levels each component needs.',
    howItWorks:
      'A 24-pin ATX connector feeds the board, while an 8-pin EPS connector delivers dedicated power to the CPU. VRM (voltage regulator module) phases filter and stabilize that power under heavy load.',
    future:
      'Future systems may cut the cables entirely — wireless power delivery and supercapacitor-backed boards that store enough energy to ride out any surge or brownout.',
  },
  io: {
    key: 'io',
    shortName: 'I/O',
    name: 'I/O Ports & Expansion Slots',
        icon: Link2,
    tagline: 'The motherboard\'s connections',
    description:
      'I/O ports and expansion slots are how your motherboard talks to the outside world — USB for devices, Ethernet for the network, audio jacks for sound, and PCIe slots for GPUs and add-in cards.',
    howItWorks:
      'USB and PCIe are high-speed serial buses that carry data packets in both directions. PCIe 5.0 lanes run at 32 GT/s each, which is how a modern GPU or NVMe drive moves gigabytes every second.',
    future:
      'USB4 and PCIe 6.0 will push speeds even higher, while modular, hot-swappable components will let you upgrade parts without ever opening the case or rebooting.',
  },
  board: {
    key: 'board',
    shortName: 'Motherboard',
    name: 'The Motherboard',
    icon: CircuitBoard,
    tagline: 'The heart of computing',
    description:
      'This is the motherboard itself — a layered circuit board (PCB) that physically and electrically connects every component in the computer. It is the platform everything else plugs into.',
    howItWorks:
      'Copper traces etched across multiple layers carry power and data between components at nearly the speed of light. Sockets, slots, and pads lock each part in place, while the BIOS chip on the edge wakes the machine up at boot.',
    future:
      'The motherboard is evolving into the platform for quantum chips, photonic interconnects, and on-board AI. Expect 3D-stacked chips, self-healing circuits, and boards that reconfigure themselves for whatever task you throw at them.',
  },
}

export const FUTURE_ERAS = [
  {
    era: 'Near Future',
    period: '2025 – 2035',
    accent: 'pcb',
    items: [
      {
        title: 'Quantum Computing',
        icon: Atom,
        description:
          'IBM and Google are racing past 1,000 qubits. Error-corrected quantum machines will crack modern cryptography, design new drugs, and simulate materials no classical supercomputer can touch.',
      },
      {
        title: 'AI Hardware',
        icon: Cpu,
        description:
          'Specialized chips like Google TPUs and NVIDIA Grace Blackwell train neural networks 1,000× faster. AI accelerators become a standard part of every motherboard and phone.',
      },
      {
        title: 'Neuromorphic Chips',
        icon: BrainCircuit,
        description:
          'Intel Loihi and IBM TrueNorth mimic brain structure, running AI on a fraction of the power a normal CPU needs — a step toward chips that learn like neurons.',
      },
      {
        title: '6G Networks',
        icon: RadioTower,
        description:
          'Terabit-per-second links with near-zero latency and AI-native network management that optimizes itself in real time.',
      },
      {
        title: 'DNA Data Storage',
        icon: Dna,
        description:
          'Microsoft already stores 10 TB of data in a single gram of DNA. Future archives could hold all of humanity\'s data in a few kilograms of biological matter.',
      },
      {
        title: 'Post-Quantum Security',
        icon: ShieldCheck,
        description:
          'Quantum-safe cryptography will protect your data from quantum decryption attacks, keeping digital privacy alive in the quantum era.',
      },
    ],
  },
  {
    era: 'Mid Future',
    period: '2035 – 2050',
    accent: 'gold',
    items: [
      {
        title: 'Artificial General Intelligence',
        icon: Sparkles,
        description:
          'Machines with human-level reasoning, learning, and creativity are predicted by the 2040s (Ray Kurzweil\'s forecast). AI stops following rules and starts understanding.',
      },
      {
        title: 'Brain-Computer Interfaces',
        icon: Brain,
        description:
          'Neuralink-style BCIs move from restoring mobility to full thought-to-machine control, augmented memory, and even communication without speaking.',
      },
      {
        title: 'Optical Computing',
        icon: Lightbulb,
        description:
          'Processors that compute with light instead of electrons — potentially 100× faster, far cooler, and with near-zero signal loss between cores.',
      },
      {
        title: 'Quantum Internet',
    icon: IconUsb,
        description:
          'Unbreakable communication built on quantum entanglement. China\'s Micius satellite has already demonstrated the technology over 1,200 km.',
      },
      {
        title: 'Explainable AI',
        icon: FileSearch,
        description:
          'Regulators demand AI systems that show their reasoning. Transparent, auditable models replace the black-box decisions of today.',
      },
    ],
  },
  {
    era: 'Far Future',
    period: '2050+',
    accent: 'cyber',
    items: [
      {
        title: 'Self-Assembling Computers',
        icon: Wrench,
        description:
          'Nanobots assemble and repair hardware atom by atom — computers that grow, heal, and upgrade themselves like living organisms.',
      },
      {
        title: 'Bio-Computers',
        icon: FlaskConical,
        description:
          'Living cells engineered as processors run massively parallel computations on chemical energy, offering computing power in a petri dish.',
      },
      {
        title: 'Holographic Interfaces',
        icon: Scan,
        description:
          'Glasses-free holograms and neural displays replace screens entirely — the motherboard\'s descendants become invisible and everywhere.',
      },
      {
        title: 'The AI Job Shift',
        icon: Globe,
        description:
          'McKinsey projects that most jobs will involve AI collaboration. Creativity, judgment, and teaching become the core human skills of the new era.',
      },
    ],
  },
]
