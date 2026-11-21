// Seed content based on the HBS institutional profile (hierank.org). Fee amounts are left null on purpose:
// the admissions team can fill them in via the admin API – the site shows "Contact admissions" until then.

const feeItems = (labels) => labels.map(([label, note]) => ({ label, note, amount: null }));

export const programmes = [
  {
    slug: 'mba', code: 'MBA', name: 'Master of Business Administration', level: 'PG', order: 1, isFlagship: true,
    tagline: 'Strategic leadership through case-method learning and live corporate immersion.',
    overview:
      'A rigorous two-year full-time management degree engineered to cultivate strategic decision-makers, financial architects and enterprise leaders. The programme bridges management theory with real boardroom execution through case studies, simulations and an eight-week corporate internship.',
    duration: '2 Years Full-Time', semesters: 4,
    affiliation: { university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow', collegeCode: '733', approvedBy: 'AICTE, Ministry of Education, Govt. of India' },
    eligibility: [
      'Graduation in any discipline from a recognised university with a minimum of 50% marks (45% for reserved categories).',
      'Valid scorecard in CAT / MAT / CMAT / XAT / CUET or the Hierank Management Aptitude Test.',
      'Final-year students may apply provisionally, subject to submission of the final degree certificate.',
    ],
    requiredDocuments: ['10th & 12th mark sheets', 'Graduation degree & transcripts', 'Valid entrance scorecard', 'Migration & character certificate', 'Government photo ID (Aadhaar / Passport)', '4 passport-size photographs'],
    selectionProcess: ['Online Application', 'Aptitude / Academic Evaluation', 'Personal Interview & GD', 'Letter of Acceptance & Enrolment'],
    specialisations: [
      { name: 'Finance', description: 'Capital markets, corporate valuation, mergers & acquisitions and risk management.', courses: [
        { code: 'FIN-401', title: 'Corporate Valuation & M&A' }, { code: 'FIN-402', title: 'Derivatives & Risk Management' },
        { code: 'FIN-403', title: 'Portfolio & Wealth Strategy' }, { code: 'FIN-404', title: 'FinTech & Digital Banking' } ] },
      { name: 'Marketing', description: 'Brand strategy, consumer analytics, digital marketing and sales leadership.', courses: [
        { code: 'MKT-401', title: 'Brand Strategy & Management' }, { code: 'MKT-402', title: 'Consumer Behaviour & Analytics' },
        { code: 'MKT-403', title: 'Digital & Performance Marketing' }, { code: 'MKT-404', title: 'Sales & Channel Management' } ] },
      { name: 'Human Resources', description: 'Talent strategy, organisational design, labour law and people analytics.', courses: [
        { code: 'HRM-401', title: 'Talent Acquisition & Management' }, { code: 'HRM-402', title: 'Organisational Development' },
        { code: 'HRM-403', title: 'Compensation & Benefits' }, { code: 'HRM-404', title: 'People Analytics' } ] },
      { name: 'International Business', description: 'Global trade frameworks, cross-cultural management and emerging markets.', courses: [
        { code: 'INB-401', title: 'International Trade & Policy' }, { code: 'INB-402', title: 'Cross-Cultural Management' },
        { code: 'INB-403', title: 'Global Supply Chains' }, { code: 'INB-404', title: 'Export-Import Management' } ] },
      { name: 'Operations', description: 'Process excellence, supply chain, logistics and quality systems.', courses: [] },
      { name: 'Information Technology', description: 'Enterprise systems, business analytics and digital transformation.', courses: [] },
    ],
    progression: [
      { title: 'Semester I & II — Core Foundation', description: 'Managerial economics, financial accounting, organisational behaviour, quantitative methods and marketing management.' },
      { title: 'Summer — Corporate Internship (8 weeks)', description: 'Mandatory industry immersion evaluated by corporate mentors.' },
      { title: 'Semester III & IV — Specialisation', description: 'Major & minor electives, strategic management capstone and dissertation.' },
    ],
    outcomes: [
      { title: 'Analytical Rigour', description: 'Build data-backed strategies using analytics and business-intelligence tools.', icon: 'bar-chart-3' },
      { title: 'Global Perspective', description: 'Navigate trade frameworks, cross-cultural teams and emerging-market dynamics.', icon: 'globe' },
      { title: 'Executive Leadership', description: 'Lead teams through negotiation labs, simulations and live consulting projects.', icon: 'users' },
      { title: 'Ethical Governance', description: 'Embed accountability and sustainable value creation into every decision.', icon: 'shield-check' },
    ],
    fees: {
      currency: 'INR',
      items: feeItems([['Year 1 tuition & academic resources', 'Library, labs and case-study materials'], ['Year 2 tuition & specialisation labs', 'Placement readiness & capstone mentorship'], ['One-time registration & refundable deposit', '']]),
      scholarships: [
        { title: 'Entrance Percentile Award', description: 'For strong CAT / XAT / MAT percentiles.' },
        { title: 'Academic Excellence Grant', description: 'For high scores in graduation and Class XII.' },
        { title: 'Women in Leadership Fellowship', description: 'Dedicated grant for aspiring women managers.' },
      ],
    },
    admissionPhones: ['9650848777', '9910172577'], brochureUrl: 'https://www.hierank.org/images/new/E-Brochure.pdf',
  },
  {
    slug: 'mca', code: 'MCA', name: 'Master of Computer Applications', level: 'PG', order: 2,
    tagline: 'Engineering depth in cloud, AI and secure software systems.',
    overview:
      'A two-year postgraduate programme preparing software engineers and technology leaders. Students move from advanced programming and architecture to cloud, data science and cybersecurity tracks, with industry projects throughout.',
    duration: '2 Years Full-Time', semesters: 4,
    affiliation: { university: 'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow', collegeCode: '733', approvedBy: 'AICTE, Ministry of Education, Govt. of India' },
    eligibility: [
      'Bachelor’s degree (BCA / B.Sc. Computer Science / B.Sc. IT or equivalent) with Mathematics at 10+2 or graduation level.',
      'Minimum aggregate as prescribed by AKTU for the admission cycle.',
      'Valid entrance score as per university norms.',
    ],
    requiredDocuments: ['10th & 12th mark sheets', 'Graduation degree & transcripts', 'Entrance scorecard', 'Migration & character certificate', 'Government photo ID', '4 passport-size photographs'],
    selectionProcess: ['Online Application', 'Academic Evaluation', 'Personal Interview', 'Letter of Acceptance & Enrolment'],
    specialisations: [
      { name: 'Full-Stack & Cloud Architecture', description: 'Scalable web platforms, microservices and cloud-native delivery.', courses: [{ title: 'Cloud Computing & DevOps' }, { title: 'Advanced Web Engineering' }, { title: 'Distributed Systems' }] },
      { name: 'Artificial Intelligence & Data Science', description: 'Machine learning, data engineering and applied AI.', courses: [{ title: 'Machine Learning' }, { title: 'Big Data Analytics' }, { title: 'Deep Learning Applications' }] },
      { name: 'Cybersecurity & Digital Forensics', description: 'Secure design, network defence and incident response.', courses: [{ title: 'Network Security' }, { title: 'Ethical Hacking' }, { title: 'Digital Forensics' }] },
    ],
    progression: [
      { title: 'Semester I & II — Engineering Foundation', description: 'Advanced data structures, DBMS, operating systems, software engineering and web technologies.' },
      { title: 'Semester III — Track Electives', description: 'Cloud, AI & data science or cybersecurity specialisation with a live project.' },
      { title: 'Semester IV — Industry Project', description: 'Industry-mentored capstone and placement preparation.' },
    ],
    outcomes: [
      { title: 'Full-Stack & Cloud', description: 'Design and deploy production-grade cloud applications.', icon: 'cloud' },
      { title: 'AI & Data Science', description: 'Turn raw data into predictive, decision-ready models.', icon: 'brain-circuit' },
      { title: 'Cybersecurity', description: 'Protect systems with secure architecture and forensic practice.', icon: 'shield-check' },
      { title: 'Agile Leadership', description: 'Lead engineering teams with agile delivery practices.', icon: 'users' },
    ],
    fees: { currency: 'INR', items: feeItems([['Year 1 tuition & lab fees', ''], ['Year 2 tuition & project fees', ''], ['One-time registration & refundable deposit', '']]), scholarships: [{ title: 'Merit & Entrance Scholarship', description: 'Awarded on academic and entrance performance.' }] },
    admissionPhones: ['9650848777', '9910172577'], brochureUrl: 'https://www.hierank.org/images/new/E-Brochure.pdf',
  },
  {
    slug: 'bba', code: 'BBA', name: 'Bachelor of Business Administration', level: 'UG', order: 3,
    tagline: 'A three-year foundation in management, entrepreneurship and corporate readiness.',
    overview:
      'A three-year undergraduate programme covering business administration, corporate management and entrepreneurship, supported by industry visits, guest lectures, live projects and internships.',
    duration: '3 Years Full-Time', semesters: 6,
    affiliation: { university: 'Chaudhary Charan Singh University (CCSU), Meerut', collegeCode: '879', approvedBy: 'UGC' },
    eligibility: [
      '10+2 from a recognised board (CBSE, ISC or State Board) in any stream.',
      'Minimum 45% aggregate in Class 12 (40% for reserved categories as per university norms).',
      'Students appearing in Class 12 may apply provisionally.',
    ],
    requiredDocuments: ['Class 10 mark sheet & certificate', 'Class 12 mark sheet & passing certificate', 'Transfer / migration certificate', 'Character certificate', 'Government photo ID', '4 passport-size photographs'],
    selectionProcess: ['Online Application', 'Academic Evaluation', 'Personal Interview', 'Letter of Acceptance & Enrolment'],
    specialisations: [],
    progression: [
      { title: 'Year 1 — Business Foundations', description: 'Principles of management, business economics, accounting and communication.' },
      { title: 'Year 2 — Functional Depth', description: 'Marketing, finance, HR, operations and business research methods.' },
      { title: 'Year 3 — Applied Leadership', description: 'Entrepreneurship, strategy, summer internship and a live project.' },
    ],
    outcomes: [
      { title: 'Management Fundamentals', description: 'Core business skills across all functions.', icon: 'briefcase' },
      { title: 'Entrepreneurial Mindset', description: 'Business-plan competitions and incubation exposure.', icon: 'lightbulb' },
      { title: 'Corporate Exposure', description: 'Industry visits, guest lectures and internships.', icon: 'building-2' },
    ],
    fees: { currency: 'INR', items: feeItems([['Annual tuition fee', ''], ['One-time registration & refundable deposit', '']]), scholarships: [{ title: 'Merit Scholarship', description: 'Based on Class 12 performance.' }] },
    admissionPhones: ['9650848777', '9560822577'], brochureUrl: 'https://www.hierank.org/images/new/UG.pdf',
  },
  {
    slug: 'bca', code: 'BCA', name: 'Bachelor of Computer Applications', level: 'UG', order: 4,
    tagline: 'Software development, data and cybersecurity skills from day one.',
    overview:
      'A three-year undergraduate programme in software development, cloud computing, database systems, web technologies, data science, machine learning and cybersecurity — with placement-oriented training, as reflected in recruitments by Wipro and other IT majors.',
    duration: '3 Years Full-Time', semesters: 6,
    affiliation: { university: 'Chaudhary Charan Singh University (CCSU), Meerut', collegeCode: '879', approvedBy: 'UGC' },
    eligibility: [
      '10+2 from a recognised board with Mathematics / Computer Science as a core subject.',
      'Minimum 45% aggregate in Class 12 (40% for reserved categories).',
      'Strong interest in software engineering, analytics and enterprise systems.',
    ],
    requiredDocuments: ['Class 10 mark sheet & certificate', 'Class 12 mark sheet (with Maths / CS)', 'Transfer / migration certificate', 'Character certificate', 'Government photo ID', '4 passport-size photographs'],
    selectionProcess: ['Online Application', 'Academic Evaluation', 'Personal Interview', 'Letter of Acceptance & Enrolment'],
    specialisations: [],
    progression: [
      { title: 'Year 1 — Programming Foundations', description: 'C / Python, discrete maths, digital logic and computer organisation.' },
      { title: 'Year 2 — Systems & Web', description: 'Data structures, DBMS, operating systems, web technologies and software engineering.' },
      { title: 'Year 3 — Emerging Tech', description: 'Cloud computing, data science, machine learning, cybersecurity and a major project.' },
    ],
    outcomes: [
      { title: 'Software Development', description: 'Build reliable software with modern tooling.', icon: 'code-2' },
      { title: 'Cloud & Databases', description: 'Work with cloud platforms and database systems.', icon: 'database' },
      { title: 'Data & ML', description: 'Foundations in data science and machine learning.', icon: 'brain-circuit' },
      { title: 'Cybersecurity', description: 'Secure coding and systems protection basics.', icon: 'shield-check' },
    ],
    fees: { currency: 'INR', items: feeItems([['Annual tuition fee', ''], ['One-time registration & refundable deposit', '']]), scholarships: [{ title: 'Merit Scholarship', description: 'Based on Class 12 performance.' }] },
    admissionPhones: ['9650848777', '8527312704'], brochureUrl: 'https://www.hierank.org/images/new/UG.pdf',
  },
];

export const faculty = [
  { name: 'Prof. Rajesh Sahay', designation: 'Founder & Chairman', qualification: 'Former Director, Amity University; Senior Manager, HCL Ltd.; GTL Techno Campuses', department: 'Leadership', isLeadership: true, order: 1 },
  { name: 'Dr. Ashutosh Mishra', designation: 'Principal', department: 'Leadership', isLeadership: true, order: 2 },
  { name: 'Dr. Rajni Singh', designation: 'Director', department: 'Leadership', isLeadership: true, order: 3 },
  { name: 'Prof. S. Chandra Sekhar', designation: 'Professor', qualification: 'B.Tech, M.Tech (IIT Kanpur); Ph.D. (US); Ex-Professor IIM Lucknow; Former Chairman, CAT', department: 'Management', isLeadership: true, order: 4 },
  { name: 'Dr. Amit Kumar Srivastav', designation: 'Professor', department: 'Management', order: 5 },
  { name: 'Dr. Anand Kiran', designation: 'Associate Dean & HOD (IT)', department: 'IT', order: 6 },
  { name: 'Dr. Neetu Munjal', designation: 'Assistant Professor', department: 'Management', order: 7 },
  { name: 'Dr. Ajit Kumar', designation: 'Assistant Professor', department: 'Management', order: 8 },
  { name: 'Mr. Satish Kapoor', designation: 'Assistant Professor', department: 'Management', order: 9 },
  { name: 'Dr. Sanjay Tyagi', designation: 'Assistant Professor', department: 'Management', order: 10 },
  { name: 'Mr. Vipul Agarwal', designation: 'Assistant Professor & Training & Placement Officer', department: 'Placement', order: 11 },
];

export const placementStats = [
  {
    academicYear: '2024-25', highestPackageLPA: 18, averagePackageLPA: 5, minimumPackageLPA: 3.2,
    studentsPlaced: 500, hiringPartners: 108, isCurrent: true,
    sectorMix: [
      { sector: 'IT & Software', percent: 34 }, { sector: 'Banking & Finance', percent: 26 }, { sector: 'Consulting & Services', percent: 16 },
      { sector: 'Telecom & Retail', percent: 14 }, { sector: 'Others', percent: 10 },
    ],
  },
];

export const recruiters = [
  ['Wipro', 'IT'], ['TCS', 'IT'], ['Infosys', 'IT'], ['Capgemini', 'IT'], ['Accenture', 'IT'], ['American Express', 'Banking & Finance'],
  ['HSBC', 'Banking & Finance'], ['ICICI Bank', 'Banking & Finance'], ['HDFC Bank', 'Banking & Finance'], ['Airtel', 'Telecom'], ['Paytm', 'Fintech'],
  ['Reliance Retail', 'Retail'], ['Snapdeal', 'E-commerce'], ['TeamLease', 'Services'], ['Edelweiss', 'Banking & Finance'],
  ['Continental Mercantile', 'Services'], ['Bulls Eye Outsourcing', 'Services'],
].map(([name, sector], i) => ({ name, sector, order: i + 1 }));

export const news = [
  { title: 'HBS welcomes Ananta Business Services for the Recruitment Drive on 04 May 2026', category: 'placement', summary: 'Ananta Business Services visited the campus for a recruitment drive for final-year students.', eventDate: new Date('2026-05-04'), publishedAt: new Date('2026-05-02') },
  { title: 'Farewell 2026 – Rukhsat', category: 'event', summary: 'Hierank Business School bid farewell to the graduating batch at its annual farewell, Rukhsat.', publishedAt: new Date('2026-04-28') },
  { title: 'Hierank Business School to host Stock Market Simulation on April 22', category: 'workshop', summary: 'A hands-on stock market simulation for management and computer applications students.', eventDate: new Date('2026-04-22'), publishedAt: new Date('2026-04-15') },
  { title: 'Hierank Business School to organise Business Plan Competition 2026 on April 21', category: 'event', summary: 'Student teams pitch business plans to a panel of faculty and industry mentors.', eventDate: new Date('2026-04-21'), publishedAt: new Date('2026-04-10') },
].map((n) => ({ ...n, content: n.summary }));

export const testimonials = [
  { name: 'Prof. S. Chandra Sekhar', role: 'Ex-Professor, IIM Lucknow · Former Chairman, CAT', type: 'faculty', featured: true, order: 1,
    quote: 'I have taught at leading institutions like the IIMs and IITs and have visited Stanford, Manchester Business School, INSEAD and Hierank Business School, Noida.' },
  // Sample student voices – replace with verified testimonials before launch
  { name: 'Ananya Sharma', role: 'MBA Graduate', programme: 'MBA', type: 'alumni', featured: true, order: 2,
    quote: 'The case-method classes and mock interviews at the career centre gave me the confidence to face corporate panels.' },
  { name: 'Rohan Malhotra', role: 'MCA Graduate', programme: 'MCA', type: 'alumni', featured: true, order: 3,
    quote: 'Live projects and the placement cell’s preparation made the transition from classroom to company seamless.' },
];

export const campusItems = [
  { type: 'gallery', title: 'Case-Method Classrooms', description: 'Smart classrooms built for discussion-led learning.', order: 1 },
  { type: 'gallery', title: 'Library & Digital Archives', description: 'Print and digital resources for management and IT.', order: 2 },
  { type: 'gallery', title: 'Industrial Tours', description: 'Corporate and plant visits across NCR.', order: 3 },
  { type: 'gallery', title: 'Cultural Activities', description: 'Annual fests, nukkad natak and student showcases.', order: 4 },
  { type: 'gallery', title: 'Sports', description: 'Indoor and outdoor sports on a 2-acre Wi-Fi campus.', order: 5 },
  { type: 'club', title: 'Finance & Investment Cell', description: 'Market simulations, stock challenges and finance workshops.', icon: 'line-chart', order: 1 },
  { type: 'club', title: 'Consulting Guild', description: 'Case competitions and strategy projects with industry mentors.', icon: 'compass', order: 2 },
  { type: 'club', title: 'E-Cell & Venture Incubator', description: 'Business plan competitions and start-up mentoring.', icon: 'rocket', order: 3 },
  { type: 'club', title: 'Marketing & Cultural Forum', description: 'Brand activations, fests and cultural events.', icon: 'megaphone', order: 4 },
  { type: 'facility', title: 'Smart Classrooms', description: 'Projector-enabled, Wi-Fi classrooms.', icon: 'monitor-play', order: 1 },
  { type: 'facility', title: 'Digital Library', description: 'E-journals, databases and reading rooms.', icon: 'library', order: 2 },
  { type: 'facility', title: 'Computer & Analytics Labs', description: 'Modern labs for programming, analytics and projects.', icon: 'cpu', order: 3 },
  { type: 'facility', title: 'Cafeteria & Recreation', description: 'Student cafeteria and recreation spaces.', icon: 'coffee', order: 4 },
  { type: 'facility', title: 'Metro Connectivity', description: 'Next to Sector-63 Metro Station.', icon: 'train-front', order: 5 },
];

export const settings = {
  contact: {
    campusName: 'Hierank Business School',
    address: 'A-42, Institutional Area, Sector 62, Near Sector-63 Metro Station, Noida, Gautam Budh Nagar, Uttar Pradesh 201307, India',
    helpline: '+91-9650848777', whatsapp: '+91-8527167778',
    emails: ['info@hierank.org', 'placement@hierank.org'],
    desks: [
      { name: 'MBA & MCA Admissions', phones: ['9650848777', '9910172577'] },
      { name: 'BBA Admissions', phones: ['9650848777', '9560822577'] },
      { name: 'BCA Admissions', phones: ['9650848777', '8527312704'] },
      { name: 'Corporate Placement Cell', phones: ['9811987707', '9810494477'] },
    ],
    social: {
      facebook: 'https://www.facebook.com/HierankBusinessSchool',
      instagram: 'https://www.instagram.com/hierankbusinessschoolofficial/',
      linkedin: 'https://www.linkedin.com/company/hierankbusinessschool/',
      quora: 'https://www.quora.com/profile/Hierank-Business-School-3',
      pinterest: 'https://in.pinterest.com/hierankbusiness/',
    },
  },
  institute: { established: 2006, foundation: 'ABR Education Foundation', founder: 'Prof. Rajesh Sahay', campusAcres: 2 },
  notice: { text: 'Join our “Super 60 Batch” for assured placement support with Fortune 500 companies.', cycle: '2026', link: '/admissions' },
  importantDates: [],
  links: { payFee: 'https://www.hierank.org/direct-pay.php', moodle: 'http://122.186.21.122/moodle/', eBrochure: 'https://www.hierank.org/images/new/E-Brochure.pdf' },
};
