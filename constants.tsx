
import { Question, University, Profile, TechRole } from './types';

export const TECH_ROLES: TechRole[] = [
  {
    id: 'fullstack-engineer',
    title: 'Software Engineer (Fullstack)',
    description: 'Bâtisseur de solutions : crée des applications robustes et scalables du serveur à l\'interface.',
    icon: 'Code2',
    skills: ['React/Node.js', 'Bases de données', 'Architecture', 'Git'],
    salary: '150k - 1.2M CFA'
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Artiste du code : sculpte des interfaces web fluides, réactives et visuellement impeccables.',
    icon: 'Monitor',
    skills: ['Tailwind CSS', 'TypeScript', 'Performance Web', 'Next.js'],
    salary: '150k - 900k CFA'
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Ingénieur de l\'ombre : conçoit la logique complexe et les API qui propulsent les services.',
    icon: 'Server',
    skills: ['Python/Go', 'PostgreSQL', 'Microservices', 'Docker'],
    salary: '150k - 1.5M CFA'
  },
  {
    id: 'mobile-developer',
    title: 'Mobile App Developer',
    description: 'Architecte de poche : développe des expériences natives ou hybrides pour iOS et Android.',
    icon: 'Smartphone',
    skills: ['Flutter', 'React Native', 'Swift/Kotlin', 'UX Mobile'],
    salary: '150k - 1.1M CFA'
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Maître des nuages : orchestre des infrastructures virtuelles haute performance et sécurisées.',
    icon: 'Cloud',
    skills: ['AWS/GCP', 'Terraform', 'Kubernetes', 'Réseau'],
    salary: '350k - 2.5M CFA'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Pont de l\'agilité : automatise les déploiements pour garantir une livraison continue sans faille.',
    icon: 'Zap',
    skills: ['CI/CD', 'Ansible', 'Monitoring', 'Linux'],
    salary: '250k - 1.8M CFA'
  },
  {
    id: 'cybersecurity-expert',
    title: 'Expert Cybersécurité',
    description: 'Gardien numérique : anticipe les menaces et blinde l\'intégrité des infrastructures.',
    icon: 'ShieldAlert',
    skills: ['Pentesting', 'Firewalls', 'Cryptographie', 'Audit'],
    salary: '350k - 3.2M CFA'
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Alchimiste de la donnée : convertit les chiffres bruts en décisions stratégiques claires.',
    icon: 'BarChart',
    skills: ['SQL', 'Python', 'DataViz', 'Statistiques'],
    salary: '150k - 850k CFA'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Oracle moderne : utilise les maths et le code pour prédire le futur et extraire de la valeur.',
    icon: 'BrainCircuit',
    skills: ['Deep Learning', 'Pandas', 'Statistiques', 'R'],
    salary: '250k - 2.1M CFA'
  },
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Chef d\'orchestre stratégique : définit la vision produit et priorise l\'impact.',
    icon: 'Package',
    skills: ['User Stories', 'Agilité', 'Roadmap', 'Priorisation'],
    salary: '250k - 1.5M CFA'
  },
  {
    id: 'product-designer',
    title: 'Product Designer',
    description: 'Architecte de l\'expérience : conçoit des interfaces intuitives qui résolvent des problèmes réels.',
    icon: 'Palette',
    skills: ['UI/UX', 'Figma', 'Prototypage', 'User Testing'],
    salary: '150k - 1.0M CFA'
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    description: 'Voix de la marque : anime les réseaux et fédère des communautés engagées au quotidien.',
    icon: 'Share2',
    skills: ['Copywriting', 'Analytics', 'Social Ads', 'Content Strategy'],
    salary: '150k - 450k CFA'
  }
];

export const UNIVERSITIES: University[] = [
  { 
    id: 'epitech', 
    name: 'Epitech Bénin', 
    location: 'Rue 390, Haie Vive, Cotonou', 
    phone: '+229 91 46 46 46', 
    email: 'cotonou@epitech.bj', 
    specialties: ['Expertise Tech', 'Innovation', 'Projets'] 
  },
  { 
    id: 'ifri', 
    name: 'IFRI / EPAC', 
    location: 'Campus UAC, Abomey-Calavi', 
    phone: '+229 55 02 88 88', 
    email: 'contact@ifri.uac.bj', 
    specialties: ['IA', 'Cybersécurité', 'Génie Logiciel'] 
  },
  { 
    id: 'ads', 
    name: 'Africa Design School', 
    location: 'Zone Aéroport, Cotonou', 
    phone: '+229 53 50 14 26', 
    email: 'contact@africadesignschool.com', 
    specialties: ['UX/UI Design', 'Digital Design'] 
  },
  { 
    id: 'sciti', 
    name: 'SCITI', 
    location: 'Fidjrossè, Cotonou', 
    phone: '+229 61 00 00 24', 
    email: 'contact@sciti.bj', 
    specialties: ['Data Science', 'Digitalisation'] 
  },
  { 
    id: 'pigier', 
    name: 'Pigier Bénin', 
    location: 'Les Cocotiers, Cotonou', 
    phone: '+229 21 30 22 22', 
    email: 'pigier.benin@pigier.com', 
    specialties: ['Audit', 'Cloud', 'Marketing Digital'] 
  }
];

export const PROFILES: Record<string, Profile> = {
  Vision: {
    name: "Le Stratège Visionnaire",
    description: "Vous excellez dans l'anticipation des tendances et la définition de cap pour les équipes.",
    jobs: [
      { title: "Product Manager", match: 95, description: "Définit le 'Quoi' et le 'Pourquoi' pour maximiser l'impact utilisateur." },
      { title: "Data Analyst", match: 88, description: "Oracle moderne : utilise les maths et le code pour prédire le futur." },
      { title: "Software Engineer (Fullstack)", match: 82, description: "Bâtisseur de solutions : crée des applications du serveur à l'interface." }
    ],
    salaryRange: "250.000 - 1.500.000 CFA / mois",
    roadmap: [
      { year: 1, goal: "Compétences Business", milestones: ["Veille concurrentielle", "Lean Startup", "Anglais"] },
      { year: 2, goal: "Leadership", milestones: ["Management d'équipe", "Public Speaking", "Finance"] },
      { year: 3, goal: "Impact Global", milestones: ["Scale-up", "Levée de fonds", "Governance"] }
    ]
  },
  Tech: {
    name: "L'Architecte Technophile",
    description: "Votre force réside dans votre capacité à construire des systèmes complexes et robustes.",
    jobs: [
      { title: "Software Engineer (Fullstack)", match: 98, description: "Forgeron du code : conçoit et maintient le coeur battant des applications." },
      { title: "Expert Cybersécurité", match: 90, description: "Gardien numérique : anticipe les menaces et blinde les infrastructures." },
      { title: "DevOps Engineer", match: 85, description: "Maître de l'automatisation : assure la stabilité et la vitesse de déploiement." }
    ],
    salaryRange: "150.000 - 3.200.000 CFA / mois",
    roadmap: [
      { year: 1, goal: "Maîtrise du Code", milestones: ["Algorithmique", "Data Structures", "Architecture"] },
      { year: 2, goal: "Expertise Stack", milestones: ["Cloud Providers", "Microservices", "Security"] },
      { year: 3, goal: "Influence Technique", milestones: ["Mentoring", "Open Source", "Design System"] }
    ]
  },
  Ana: {
    name: "L'Analyste de Données",
    description: "Vous transformez le chaos des données en clarté stratégique.",
    jobs: [
      { title: "Data Analyst", match: 96, description: "Détecteur de signaux : révèle les tendances cachées derrière les chiffres." },
      { title: "Data Scientist", match: 92, description: "Optimisateur de performance : aligne les flux de données sur les revenus." },
      { title: "Cloud Architect", match: 88, description: "Architecte d'infrastructure : conçoit des environnements de données scalables." }
    ],
    salaryRange: "150.000 - 2.100.000 CFA / mois",
    roadmap: [
      { year: 1, goal: "Data Literacy", milestones: ["SQL", "Excel Expert", "Python"] },
      { year: 2, goal: "Advanced Analytics", milestones: ["DataViz", "Statistiques", "ETL"] },
      { year: 3, goal: "IA & ML", milestones: ["Machine Learning", "Big Data", "Data Storytelling"] }
    ]
  },
  Créa: {
    name: "Le Creative Designer",
    description: "Vous rendez la technologie belle, intuitive et centrée sur l'humain.",
    jobs: [
      { title: "Product Designer", match: 97, description: "Styliste d'usage : fusionne esthétique et utilité pour séduire l'utilisateur." },
      { title: "Frontend Developer", match: 91, description: "Artiste du code : sculpte des interfaces web fluides et réactives." },
      { title: "Community Manager", match: 84, description: "Voix de la marque : anime les réseaux et fédère des communautés." }
    ],
    salaryRange: "150.000 - 1.200.000 CFA / mois",
    roadmap: [
      { year: 1, goal: "Visual Design", milestones: ["UI Design", "Figma", "Typography"] },
      { year: 2, goal: "UX & Research", milestones: ["User Testing", "Personas", "Wireframing"] },
      { year: 3, goal: "Product Design", milestones: ["Design System", "Workshop Facilitation", "Motion"] }
    ]
  }
};
