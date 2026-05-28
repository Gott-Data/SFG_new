export interface ProjectData {
  slug: string;
  title: string;
  subtitle?: string;
  description: string;
  imageUrl?: string;
  category: "direct" | "partner";
  country: string;
  partnerName?: string;
  partnerSince?: string;
  partnerLogoUrl?: string;
  goalAmount: number;
  raisedAmount: number;
  status: string;
  featured: boolean;
}

export const projectsData: ProjectData[] = [
  // ── SFG Direct Projects ──────────────────────────────────
  {
    slug: "general-support-fund",
    title: "General Support Fund",
    subtitle: "Fuel Our Pro Bono Mission",
    description:
      "Your donation to the General Support Fund directly powers SFG's ability to take on more pro bono projects and provide sliding-scale services to organizations around the world. This fund covers operational costs, travel for in-person clinics, platform development, and the behind-the-scenes work that makes every partner project possible.\n\nBy supporting this fund, you enable us to say 'yes' to more organizations who need help but can't afford it — expanding our reach and deepening our impact across every community we serve.",
    imageUrl: "/images/projects/general-support-fund/hero.jpg",
    category: "direct",
    country: "Global",
    goalAmount: 10000000,
    raisedAmount: 3200000,
    status: "active",
    featured: true,
  },
  {
    slug: "youth-sports-portland",
    title: "Youth Sports Academy",
    subtitle: "Portland, Oregon",
    description:
      "Providing free after-school sports programs for underserved youth in Portland. We combine athletic training with mentorship, digital literacy workshops, and health education to build confident, capable young leaders. Our program serves over 200 youth annually across 5 community centers.",
    imageUrl: "/images/projects/youth-sports-portland/hero.jpg",
    category: "direct",
    country: "United States",
    goalAmount: 7500000,
    raisedAmount: 4230000,
    status: "active",
    featured: true,
  },
  {
    slug: "womens-health-fair",
    title: "Women's Health & Wellness Fair",
    subtitle: "Annual Community Event",
    description:
      "Free annual health fair providing medical screenings, wellness workshops, mental health resources, and fitness demonstrations for women in underserved communities. Last year we served 500+ women with free health screenings and connected 150 to ongoing care.",
    imageUrl: "/images/projects/womens-health-fair/hero.jpg",
    category: "direct",
    country: "United States",
    goalAmount: 3500000,
    raisedAmount: 2100000,
    status: "active",
    featured: false,
  },
  {
    slug: "data-skills-bootcamp",
    title: "Data & AI Skills Bootcamp",
    subtitle: "Closing the Digital Divide",
    description:
      "An intensive 12-week bootcamp providing hands-on data science and AI training to underrepresented individuals. Participants learn Python, data analysis, and machine learning fundamentals, with job placement support upon completion.",
    imageUrl: "/images/projects/data-skills-bootcamp/hero.jpg",
    category: "direct",
    country: "United States",
    goalAmount: 6000000,
    raisedAmount: 3400000,
    status: "active",
    featured: false,
  },

  // ── Partner Projects ─────────────────────────────────────
  {
    slug: "we-united-nepal",
    title: "Atoot & The WE United Project",
    subtitle: "Kapilvastu + Kathmandu, Nepal | USA",
    description:
      "The WE United Project is a women-led initiative founded in Kathmandu, Nepal on the belief that female participation in sport contributes to a broader empowerment and equality for women & girls. The WE United Project uses physical activity as an empowering tool to build assets, provide access to resources, and develop agency.\n\nAtoot's mission is to avail educational and sporting opportunities to girls in Kapilvastu, Nepal by using Sports for Development (S4D) as a catalyst for empowerment and holistic youth development.\n\nSFG Service Provision: e-learning curriculum and platform development. Sport & data literacy development clinic in-person 2026 in Kathmandu, Nepal. Fundraising initiative to support WE United Project attendees travel to Boston for FIFA World Cup 2026.",
    imageUrl: "/images/projects/we-united-nepal/hero.jpg",
    category: "partner",
    country: "Nepal",
    partnerName: "Atoot & The WE United Project",
    partnerSince: "2022",
    partnerLogoUrl: "/images/projects/we-united-nepal/logo.png",
    goalAmount: 5000000,
    raisedAmount: 1850000,
    status: "active",
    featured: true,
  },
  {
    slug: "chipata-girls-zambia",
    title: "Chipata Girls F.C.",
    subtitle: "Chipata, Eastern Province, Zambia",
    description:
      "Chipata Girls Football Club is more than just a football team — it's a movement for gender equality and youth empowerment in Zambia. Based in Eastern Province, the club provides a safe and empowering space for girls to develop leadership skills, stay in school, and challenge harmful gender norms. Through football, mentorship, and life skills training, Chipata Girls F.C is helping to reduce early pregnancies, prevent school dropouts, and promote a new narrative for what girls can achieve.\n\nThe club's work contributes directly to multiple UN Sustainable Development Goals (SDGs), including Quality Education, Gender Equality, and Good Health & Wellbeing. Players not only compete at the national level but also serve as role models in their communities — proving that girls belong both on the pitch and in positions of leadership.\n\nSFG Service Provision: Fundraising Campaigns & Fund Development; Growth Strategy & Support; Educational Access Support; Website Development; Digital Transformation.",
    imageUrl: "/images/projects/chipata-girls-zambia/hero.jpg",
    category: "partner",
    country: "Zambia",
    partnerName: "Chipata Girls Football Club",
    partnerSince: "2024",
    partnerLogoUrl: "/images/projects/chipata-girls-zambia/logo.png",
    goalAmount: 4000000,
    raisedAmount: 2750000,
    status: "active",
    featured: true,
  },
  {
    slug: "fsmart-niger",
    title: "FSMART+ Africa 2030",
    subtitle: "Agadez, Niger",
    description:
      "The Football Smart Africa 2030 (F.SMART+) is an apolitical organization without discrimination or gender difference, which aims to contribute to the educational, sporting and socio-cultural emancipation of young girls and boys in the Agadez Niger Region. The aim is to contribute to the achievement of the United Nations SDG Sustainable Development Goals by using sport (football) as the catalyst.\n\nSince 2020, F.SMART+ has implemented the \"Second Chance Program\" on an annual basis, which acquires and distributes free school bags, notebooks, pens, pencils, slates, books, geometric sets and more to orphaned children and primary school students in the Agadez area.\n\nSFG Service Provision: Website Development; Digital Transformation; Fundraising Strategy & Fund Development; Non-Profit Management Support.",
    imageUrl: "/images/projects/fsmart-niger/hero.jpg",
    category: "partner",
    country: "Niger",
    partnerName: "F.SMART+ 2030 Africa Association",
    partnerSince: "2020",
    partnerLogoUrl: "/images/projects/fsmart-niger/logo.png",
    goalAmount: 3000000,
    raisedAmount: 980000,
    status: "active",
    featured: false,
  },
  {
    slug: "hip-football-usa",
    title: "H.I.P. – Head Impact Prevention",
    subtitle: "Ohio + Oregon, USA",
    description:
      "H.I.P. Football & M.D. founder, Tim Johnson, may look familiar if you're an American Football fan. Known for his exciting blocked punt for the touchdown in Super Bowl 37, Tim played for the NFL's Baltimore Ravens, Chicago Bears, and Oakland Raiders (USA), CFL's Calgary Stampeders (Canada), and NFL Europe's Rhein Fire (Germany).\n\nSince retiring from his stellar playing career, Tim has developed a non-contact approach to coaching and playing the sport. The H.I.P. Football model teaches players key football skills and movement in a two-hand touch format, preventing brain impact and preparing athletes to excel when they transition to full-contact teams and leagues.\n\nH.I.P. MD has developed a next-gen American Football Helmet, born from a desire to protect brain health and support the longevity of people who experience impact while on the field. The H.I.P. Helmet brought together biomimicking innovations and future integration of sensor technologies to monitor force impact, pulse, and electrical brain activity is on the product roadmap.\n\nSFG Service Provision: Fund Development & Market Expansion Strategy; Key Partner Capture; Website Development & Digital Transformation.",
    imageUrl: "/images/projects/hip-football-usa/hero.jpg",
    category: "partner",
    country: "United States",
    partnerName: "H.I.P. Head Impact Prevention, LLC",
    partnerSince: "2024",
    partnerLogoUrl: "/images/projects/hip-football-usa/logo.png",
    goalAmount: 5000000,
    raisedAmount: 1200000,
    status: "active",
    featured: false,
  },
];
