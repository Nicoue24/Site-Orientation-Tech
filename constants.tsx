
import { Question, University, Profile, TechRole } from './types';

export const TECH_ROLES: TechRole[] = [
  // TECH & DEVELOPMENT
  {
    id: 'fullstack-engineer',
    title: 'Software Engineer (Fullstack)',
    description: 'Bâtisseur de solutions : crée des applications robustes et scalables du serveur à l\'interface.',
    icon: 'Code2',
    skills: ['React/Node.js', 'Bases de données', 'Architecture', 'Git'],
    salary: '500k - 2.0M CFA'
  },
  {
    id: 'frontend-developer',
    title: 'Frontend Developer',
    description: 'Artiste du code : sculpte des interfaces web fluides, réactives et visuellement impeccables.',
    icon: 'Monitor',
    skills: ['Tailwind CSS', 'TypeScript', 'Performance Web', 'Next.js'],
    salary: '400k - 1.2M CFA'
  },
  {
    id: 'backend-developer',
    title: 'Backend Developer',
    description: 'Ingénieur de l\'ombre : conçoit la logique complexe et les API qui propulsent les services.',
    icon: 'Server',
    skills: ['Python/Go', 'PostgreSQL', 'Microservices', 'Docker'],
    salary: '450k - 1.8M CFA'
  },
  {
    id: 'mobile-developer',
    title: 'Mobile App Developer',
    description: 'Architecte de poche : développe des expériences natives ou hybrides pour iOS et Android.',
    icon: 'Smartphone',
    skills: ['Flutter', 'React Native', 'Swift/Kotlin', 'UX Mobile'],
    salary: '400k - 1.5M CFA'
  },
  {
    id: 'cloud-architect',
    title: 'Cloud Architect',
    description: 'Maître des nuages : orchestre des infrastructures virtuelles haute performance et sécurisées.',
    icon: 'Cloud',
    skills: ['AWS/GCP', 'Terraform', 'Kubernetes', 'Réseau'],
    salary: '800k - 3.0M CFA'
  },
  {
    id: 'devops-engineer',
    title: 'DevOps Engineer',
    description: 'Pont de l\'agilité : automatise les déploiements pour garantir une livraison continue sans faille.',
    icon: 'Zap',
    skills: ['CI/CD', 'Ansible', 'Monitoring', 'Linux'],
    salary: '600k - 2.2M CFA'
  },
  {
    id: 'qa-tester',
    title: 'QA Engineer',
    description: 'Chasseur de bugs : garantit la qualité irréprochable du produit via des tests automatisés.',
    icon: 'Bug',
    skills: ['Selenium', 'Cypress', 'Tests Unitaires', 'Agilité'],
    salary: '350k - 900k CFA'
  },

  // DATA & AI
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    description: 'Alchimiste de la donnée : convertit les chiffres bruts en décisions stratégiques claires.',
    icon: 'BarChart',
    skills: ['SQL', 'Python', 'DataViz', 'Statistiques'],
    salary: '450k - 1.3M CFA'
  },
  {
    id: 'data-scientist',
    title: 'Data Scientist',
    description: 'Oracle moderne : utilise les maths et le code pour prédire le futur et extraire de la valeur.',
    icon: 'BrainCircuit',
    skills: ['Deep Learning', 'Pandas', 'Statistiques', 'R'],
    salary: '600k - 2.5M CFA'
  },
  {
    id: 'ml-engineer',
    title: 'Machine Learning Engineer',
    description: 'Ingénieur du futur : entraîne des modèles d\'IA pour automatiser l\'intelligence à grande échelle.',
    icon: 'Brain',
    skills: ['TensorFlow', 'PyTorch', 'Model Ops', 'Python'],
    salary: '700k - 3.5M CFA'
  },
  {
    id: 'data-engineer',
    title: 'Data Engineer',
    description: 'Plombier de la donnée : construit les pipelines qui transportent la donnée en temps réel.',
    icon: 'Database',
    skills: ['Spark', 'Airflow', 'Kafka', 'Data Warehousing'],
    salary: '550k - 2.0M CFA'
  },

  // DESIGN & CREATIVE
  {
    id: 'product-designer',
    title: 'Product Designer',
    description: 'Architecte de l\'expérience : conçoit des interfaces intuitives qui résolvent des problèmes réels.',
    icon: 'Palette',
    skills: ['UI/UX', 'Figma', 'Prototypage', 'User Testing'],
    salary: '400k - 1.1M CFA'
  },
  {
    id: 'ui-designer',
    title: 'UI Designer',
    description: 'Esthète du pixel : sublime l\'identité visuelle et l\'ergonomie graphique des interfaces.',
    icon: 'Layers',
    skills: ['Design Visuel', 'Design System', 'Adobe CC', 'Iconographie'],
    salary: '350k - 1.0M CFA'
  },
  {
    id: 'ux-researcher',
    title: 'UX Researcher',
    description: 'Explorateur d\'empathie : décode les besoins profonds pour orienter le design stratégique.',
    icon: 'Search',
    skills: ['Interviews', 'Analyse', 'Psychologie', 'Usability'],
    salary: '400k - 1.2M CFA'
  },
  {
    id: 'motion-designer',
    title: 'Motion Designer',
    description: 'Magicien du mouvement : donne vie aux interfaces via des animations et micro-interactions.',
    icon: 'Play',
    skills: ['After Effects', 'Lottie', 'Storyboarding', 'Video'],
    salary: '350k - 950k CFA'
  },

  // PRODUCT & MANAGEMENT
  {
    id: 'product-manager',
    title: 'Product Manager',
    description: 'Chef d\'orchestre stratégique : définit la vision produit et priorise l\'impact.',
    icon: 'Package',
    skills: ['User Stories', 'Agilité', 'Roadmap', 'Priorisation'],
    salary: '600k - 1.8M CFA'
  },
  {
    id: 'scrum-master',
    title: 'Scrum Master',
    description: 'Facilitateur d\'élite : lève les obstacles pour doper la productivité des équipes agiles.',
    icon: 'Timer',
    skills: ['Scrum', 'Kanban', 'Coaching', 'Communication'],
    salary: '500k - 1.4M CFA'
  },
  {
    id: 'cybersecurity-expert',
    title: 'Expert Cybersécurité',
    description: 'Gardien numérique : anticipe les menaces et blinde l\'intégrité des infrastructures.',
    icon: 'ShieldAlert',
    skills: ['Pentesting', 'Firewalls', 'Cryptographie', 'Audit'],
    salary: '600k - 2.5M CFA'
  },

  // BUSINESS & MARKETING
  {
    id: 'business-developer',
    title: 'Business Developer',
    description: 'Moteur de croissance : identifie et scelle les partenariats qui propulsent l\'entreprise.',
    icon: 'Briefcase',
    skills: ['Prospection', 'Pitch', 'Closing', 'Stratégie'],
    salary: '400k - 1.5M CFA'
  },
  {
    id: 'growth-hacker',
    title: 'Growth Marketer',
    description: 'Ingénieur de l\'acquisition : pirate les canaux de croissance via la data et l\'expérimentation.',
    icon: 'Zap',
    skills: ['Ads', 'Automation', 'SEO/SEA', 'Copywriting'],
    salary: '400k - 1.0M CFA'
  },
  {
    id: 'community-manager',
    title: 'Community Manager',
    description: 'Voix de la marque : anime les réseaux et fédère des communautés engagées au quotidien.',
    icon: 'Share2',
    skills: ['Copywriting', 'Analytics', 'Publicité', 'Creativity'],
    salary: '250k - 700k CFA'
  },
  {
    id: 'customer-success',
    title: 'Customer Success Manager',
    description: 'Garant de la valeur : s\'assure que chaque utilisateur atteint ses objectifs avec le produit.',
    icon: 'HeartHandshake',
    skills: ['Onboarding', 'Empathie', 'Support', 'Analyse Churn'],
    salary: '350k - 900k CFA'
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
    specialties: ['Audit', 'Cloud', 'Marketing'] 
  },
  { 
    id: 'hensa', 
    name: 'HENSA', 
    location: 'Sainte Rita, Cotonou', 
    phone: '+229 53 11 11 11', 
    email: 'info@hensa-univ.bj', 
    specialties: ['Management Numérique', 'Big Data'] 
  },
  { 
    id: 'eig', 
    name: 'EIG Bénin', 
    location: 'Face Stade de l\'Amitié, Cotonou', 
    phone: '+229 97 93 93 97', 
    email: 'contact@eig.bj', 
    specialties: ['Graphisme', 'Audiovisuel'] 
  },
  { 
    id: 'esgis', 
    name: 'ESGIS Bénin', 
    location: 'Akpakpa, Cotonou', 
    phone: '+229 21 33 00 00', 
    email: 'esgisbenin@esgis.org', 
    specialties: ['MIAGE', 'Systèmes & Réseaux'] 
  },
  { 
    id: 'uatm', 
    name: 'UATM GASA', 
    location: 'Gbégamey, Cotonou', 
    phone: '+229 21 30 00 00', 
    email: 'info@uatm-gasa.bj', 
    specialties: ['Génie Logiciel', 'Réseaux'] 
  },
  { 
    id: 'hecm', 
    name: 'HECM', 
    location: 'Jéricho, Cotonou', 
    phone: '+229 21 32 00 00', 
    email: 'contact@hecm.bj', 
    specialties: ['Marketing Digital', 'Communication'] 
  },
  { 
    id: 'isma', 
    name: 'ISMA', 
    location: 'Cadjehoun, Cotonou', 
    phone: '+229 21 30 00 00', 
    email: 'contact@isma-benin.org', 
    specialties: ['Audiovisuel', 'Journalisme'] 
  },
  { 
    id: 'ism_adonai', 
    name: 'ISM Adonaï', 
    location: 'Calavi / Cotonou', 
    phone: '+229 21 30 00 00', 
    email: 'contact@ism-adonai.bj', 
    specialties: ['Audit & Contrôle', 'Informatique'] 
  },
  { 
    id: 'ucao', 
    name: 'UCAO', 
    location: 'Zogbo, Cotonou', 
    phone: '+229 21 30 00 00', 
    email: 'info@ucaobenin.bj', 
    specialties: ['Informatique de Gestion'] 
  },
  { 
    id: 'insti', 
    name: 'INSTI Lokossa', 
    location: 'Lokossa', 
    phone: '+229 97 00 00 00', 
    email: 'contact@insti.uac.bj', 
    specialties: ['Maintenance', 'Génie Industriel'] 
  },
  { 
    id: 'enstic', 
    name: 'ENSTIC UAC', 
    location: 'Campus UAC, Calavi', 
    phone: '+229 21 36 00 00', 
    email: 'enstic@uac.bj', 
    specialties: ['Journalisme Numérique'] 
  },
  { 
    id: 'esae', 
    name: 'ESAE Bénin', 
    location: 'Hindé, Cotonou', 
    phone: '+229 21 32 00 00', 
    email: 'contact@esae.bj', 
    specialties: ['Gestion des Projets Tech'] 
  },
  { 
    id: 'iut_parakou', 
    name: 'IUT Parakou', 
    location: 'Parakou', 
    phone: '+229 97 00 00 00', 
    email: 'iut@up.bj', 
    specialties: ['Informatique de Gestion'] 
  },
  { 
    id: 'sup_management', 
    name: 'Sup\'Management', 
    location: 'Cadjehoun, Cotonou', 
    phone: '+229 21 30 00 00', 
    email: 'info@supmanagement.ma', 
    specialties: ['Management des SI'] 
  },
  { 
    id: 'gasa_formation', 
    name: 'GASA-FORMATION', 
    location: 'Akpakpa, Cotonou', 
    phone: '+229 21 33 00 00', 
    email: 'contact@gasa-formation.bj', 
    specialties: ['Maintenance Informatique'] 
  },
  { 
    id: 'estam', 
    name: 'ESTAM', 
    location: 'Agontinkon, Cotonou', 
    phone: '+229 21 30 00 00', 
    email: 'contact@estam.bj', 
    specialties: ['Génie Civil & Tech'] 
  }
];

export const PROFILES: Record<string, Profile> = {
  Vision: {
    name: "Le Stratège Visionnaire",
    description: "Vous excellez dans l'anticipation des tendances et la définition de cap pour les équipes.",
    jobs: [
      { title: "Product Manager", match: 95, description: "Définit le 'Quoi' et le 'Pourquoi' pour maximiser l'impact utilisateur." },
      { title: "CEO / Fondateur", match: 88, description: "Architecte d'organisations : transforme une idée en réalité scalable." },
      { title: "Consultant Stratégie", match: 82, description: "Navigateur du changement : guide les entreprises vers l'excellence numérique." }
    ],
    salaryRange: "400.000 - 1.500.000 CFA / mois",
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
      { title: "Software Engineer", match: 98, description: "Forgeron du code : conçoit et maintient le coeur battant des applications." },
      { title: "CTO", match: 90, description: "Visionnaire technique : arbitre les choix technologiques critiques." },
      { title: "DevOps Engineer", match: 85, description: "Maître de l'automatisation : assure la stabilité et la vitesse de déploiement." }
    ],
    salaryRange: "350.000 - 2.500.000 CFA / mois",
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
      { title: "Business Analyst", match: 92, description: "Optimisateur de performance : aligne les flux de données sur les revenus." },
      { title: "Data Scientist", match: 88, description: "Ingénieur du futur : crée des modèles prédictifs pour anticiper le marché." }
    ],
    salaryRange: "450.000 - 1.800.000 CFA / mois",
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
      { title: "UX Researcher", match: 91, description: "Explorateur d'empathie : décode les besoins profonds pour orienter le design." },
      { title: "Art Director", match: 84, description: "Chef de l'image : impose une signature visuelle forte et cohérente." }
    ],
    salaryRange: "300.000 - 1.200.000 CFA / mois",
    roadmap: [
      { year: 1, goal: "Visual Design", milestones: ["UI Design", "Figma", "Typography"] },
      { year: 2, goal: "UX & Research", milestones: ["User Testing", "Personas", "Wireframing"] },
      { year: 3, goal: "Product Design", milestones: ["Design System", "Workshop Facilitation", "Motion"] }
    ]
  }
};
