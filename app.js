const panels = [...document.querySelectorAll('.view-panel')];
const navItems = [...document.querySelectorAll('.nav-item')];
const breadcrumb = document.querySelector('#breadcrumb-current');
const sidebar = document.querySelector('.sidebar');
const toast = document.querySelector('#toast');
const landing = document.querySelector('#landing-screen');
const app = document.querySelector('#app');
const signin = document.querySelector('#signin-screen');
const demoModal = document.querySelector('#demo-modal');
const demoScenes = [...document.querySelectorAll('.demo-scene')];
const demoCaptions = [
  'Complete your profile to understand your starting point.',
  'Get a clear learning path built around your goals.',
  'Discover opportunities matched to your growing edge.',
];
const careerVideo = {
  title: 'When a skill gap becomes a missed opportunity.',
  description: 'An AI-generated awareness guide showing how learning gaps can affect a career — and how to turn them into a clear plan.',
  captions: [
    'Without the right skills, a strong application can be missed.',
    'A clear skill map shows exactly what to learn next.',
    'Small, consistent learning steps create better opportunities.',
  ],
  scenes: [
    ['01', 'SEE THE GAP EARLY', 'Potential is not the same as readiness.', 'A qualification opens the door, but practical skills help you move through it.', '<div class="scene-visual gap-visual"><span>!</span><div><b>Role match</b><strong>42%</strong><u><i></i></u></div></div>'],
    ['02', 'TURN CONFUSION INTO CLARITY', 'Know what to learn next.', 'PathFinder compares your current skills with real role requirements and highlights your priority gaps.', '<div class="scene-visual learning-visual"><span>✦</span><div><b>Priority skill</b><strong>Cloud fundamentals</strong><u><i></i></u></div></div>'],
    ['03', 'BUILD YOUR NEXT CHAPTER', 'Your result can improve.', 'Practice the right skills, track your progress and apply with more confidence.', '<div class="scene-visual role-visual"><i>↑</i><span><b>Readiness improved</b><strong>64% · Keep going</strong></span><em>→</em></div>'],
  ],
};
const careerPreviewScenes = [
  ['Potential is not the same as readiness.', 'A qualification opens the door, but practical skills help you move through it.'],
  ['Know what to learn next.', 'PathFinder turns confusing skill gaps into a clear learning plan.'],
  ['Your result can improve.', 'Small, consistent learning steps create stronger opportunities.'],
];
let careerPreviewIndex = 0;
let careerPreviewTimer;
let demoIndex = 0;
let demoTimer;
let demoPlaying = false;
const assessmentModal = document.querySelector('#assessment-modal');
const assessmentContent = document.querySelector('#assessment-content');
const assessmentQuestions = [
  { question: 'How comfortable are you building a responsive web page?', options: ['I am just starting', 'I can build with guidance', 'I can build independently', 'I can lead this work'] },
  { question: 'How do you usually approach a new technical problem?', options: ['I look for an example', 'I break it into smaller tasks', 'I compare multiple solutions', 'I design a scalable approach'] },
  { question: 'Which learning outcome matters most right now?', options: ['Understand the basics', 'Build a portfolio project', 'Prepare for interviews', 'Become job-ready'] },
];
let assessmentIndex = 0;
let assessmentAnswers = [];
let currentView = 'overview';
let previousView = 'overview';
let currentRole = 'Student';
let industryOpportunities = [
  { title: 'Frontend Engineer Intern', type: 'Internship', location: 'Bengaluru / Remote', skills: ['React', 'TypeScript'], applicants: 18, status: 'Active' },
  { title: 'Product Data Analyst', type: 'Full-time', location: 'Remote', skills: ['SQL', 'Python', 'Analytics'], applicants: 9, status: 'Active' },
];
const candidateMatches = [
  { initials: 'RK', name: 'Riya Kapoor', education: 'B.Tech Computer Science · 2026', score: 96, skills: 'React · TypeScript · Git' },
  { initials: 'AM', name: 'Aditya Menon', education: 'B.Sc. IT · 2025', score: 91, skills: 'JavaScript · SQL · AWS' },
  { initials: 'NS', name: 'Nisha Shah', education: 'BCA · 2026', score: 87, skills: 'React · Figma · Communication' },
];
const industryApplicants = [
  ['Riya Kapoor', 'Frontend Engineer Intern', '96%', 'Shortlisted', 'Applied today'],
  ['Aditya Menon', 'Product Data Analyst', '91%', 'Review', 'Applied yesterday'],
  ['Nisha Shah', 'Frontend Engineer Intern', '87%', 'Interview', 'Applied Sep 8'],
];

const opportunities = [
  { company: 'Zepto', logo: 'z', logoClass: 'zepto', title: 'Frontend Developer Intern', type: 'Internship', location: 'Bengaluru / Remote', stipend: '₹35k / month', match: 92, skills: ['React', 'TypeScript', '+2 skills'] },
  { company: 'Razorpay', logo: 'r', logoClass: 'razorpay', title: 'Product Design Intern', type: 'Internship', location: 'Bengaluru', stipend: '₹40k / month', match: 86, skills: ['Figma', 'UX research', '+1 skill'] },
  { company: 'CRED', logo: 'C', logoClass: 'cred', title: 'Software Engineer Intern', type: 'Internship', location: 'Mumbai / Remote', stipend: '₹45k / month', match: 81, skills: ['Java', 'Spring Boot', '+3 skills'] },
  { company: 'Myntra', logo: 'm', logoClass: 'myntra', title: 'Frontend Engineer', type: 'Full-time', location: 'Bengaluru', stipend: '₹14–18 LPA', match: 78, skills: ['React', 'GraphQL', '+2 skills'] },
  { company: 'PhonePe', logo: 'p', logoClass: 'phonepe', title: 'Product Analyst', type: 'Full-time', location: 'Remote', stipend: '₹12–16 LPA', match: 74, skills: ['SQL', 'Analytics', '+2 skills'] },
];

const applications = [
  ['Frontend Developer Intern', 'Zepto', 'In review', 'Applied Sep 8', '92%'],
  ['Product Design Intern', 'Razorpay', 'Interview', 'Interview Sep 12', '86%'],
  ['Software Engineer Intern', 'CRED', 'In review', 'Applied Sep 4', '81%'],
  ['Product Analyst', 'PhonePe', 'Selected', 'Offer received Sep 2', '74%'],
  ['UX Engineer Intern', 'Myntra', 'Interview', 'Interview Sep 15', '79%'],
  ['SDE Intern', 'Groww', 'In review', 'Applied Aug 28', '72%'],
];

const streamSkills = {
  'Information Technology': ['HTML & CSS', 'JavaScript', 'React', 'SQL', 'Cloud basics', 'Communication'],
  'Computer Science': ['Data structures', 'Algorithms', 'Python', 'Java', 'System design', 'Git'],
  'Data Science': ['Python', 'Statistics', 'SQL', 'Machine learning', 'Data visualisation', 'Excel'],
  'Artificial Intelligence & Machine Learning': ['Python', 'Machine learning', 'Deep learning', 'TensorFlow', 'Statistics', 'Linear algebra'],
  'Cyber Security': ['Network security', 'Linux', 'Ethical hacking', 'Python', 'Cryptography', 'Risk assessment'],
  'Electronics & Communication': ['Digital electronics', 'Embedded systems', 'C/C++', 'IoT', 'MATLAB', 'Communication systems'],
  'Mechanical Engineering': ['CAD design', 'Thermodynamics', 'Manufacturing', 'AutoCAD', 'Materials science', 'Project management'],
  'Civil Engineering': ['AutoCAD', 'Structural analysis', 'Surveying', 'Construction management', 'Geotechnical engineering', 'Project management'],
  'Electrical Engineering': ['Circuit design', 'Power systems', 'MATLAB', 'Embedded systems', 'Control systems', 'Project management'],
  Commerce: ['Accounting', 'Financial analysis', 'Excel', 'Business communication', 'Taxation', 'Economics'],
  Management: ['Marketing', 'Business strategy', 'Excel', 'Leadership', 'Market research', 'Communication'],
  'Arts & Humanities': ['Writing', 'Communication', 'Research', 'Content strategy', 'Public speaking', 'Critical thinking'],
  'Life Sciences': ['Biology', 'Research methods', 'Biostatistics', 'Laboratory skills', 'Scientific writing', 'Data analysis'],
  'Other / Undecided': ['Communication', 'Problem solving', 'Excel', 'Research', 'Project management', 'Digital literacy'],
};

const roleConfig = {
  Student: {
    welcome: 'Build skills and find your next opportunity.',
    action: 'Complete profile',
    overview: 'Overview',
    opportunity: 'Opportunities',
    applications: 'My applications',
    skills: 'Skills & learning',
    portfolio: 'Digital portfolio',
    profile: 'My profile',
    focus: 'Your readiness, learning path and matched opportunities in one place.',
  },
  Industry: {
    welcome: 'Find the people who can move your work forward.',
    action: 'Post an opportunity',
    overview: 'Talent overview',
    opportunity: 'Post opportunities',
    applications: 'Applicant pipeline',
    skills: 'Required skills',
    portfolio: 'Talent showcase',
    profile: 'Company profile',
    focus: 'Define the skills you need, discover matched candidates and manage your hiring pipeline.',
  },
  College: {
    welcome: 'Grow your academic and industry network.',
    action: 'Explore collaborations',
    overview: 'My overview',
    opportunity: 'Academic opportunities',
    applications: 'My applications',
    skills: 'Areas of expertise',
    portfolio: 'Academic profile',
    profile: 'My profile',
    focus: 'Discover faculty internships, FDPs, training, consultancy and research opportunities.',
  },
  'Institution / Admin': {
    welcome: 'Turn student data into better outcomes.',
    action: 'View analytics',
    overview: 'Institution overview',
    opportunity: 'Industry partners',
    applications: 'Placement tracking',
    skills: 'Skill-gap analytics',
    portfolio: 'Institution reports',
    profile: 'Institution profile',
    focus: 'Monitor student readiness, internships, placements and industry skill demand.',
  },
};

function showView(view, remember = true) {
  if (remember && view !== currentView) previousView = currentView;
  const activeNav = navItems.find((item) => item.dataset.view === view);
  panels.forEach((panel) => panel.classList.toggle('active', panel.id === `${view}-view`));
  navItems.forEach((item) => item.classList.toggle('active', item.dataset.view === view));
  breadcrumb.textContent = activeNav?.querySelector('span:nth-child(2)')?.textContent || 'Overview';
  sidebar.classList.remove('open');
  currentView = view;
  if (view === 'opportunities' && currentRole === 'Student') renderOpportunities();
  if (view === 'applications' && currentRole === 'Student') renderApplications('all');
}

function applyRole(role) {
  currentRole = role;
  const config = roleConfig[role] || roleConfig.Student;
  const navLabels = [config.overview, config.opportunity, config.applications, config.skills, config.portfolio, config.profile, 'Messages'];
  document.querySelectorAll('.nav-item').forEach((item, index) => {
    const label = item.querySelector('span:nth-child(2)');
    if (label) label.textContent = navLabels[index];
  });
  document.querySelector('#complete-profile').innerHTML = `<span>＋</span> ${config.action}`;
  document.querySelector('.welcome-row .muted').textContent = config.welcome;
  document.querySelector('.readiness-copy p').textContent = config.focus;
  document.querySelector('.breadcrumb strong').textContent = config.overview;
  if (role === 'Industry') renderIndustryWorkspace();
  if (role === 'College' || role === 'Institution / Admin') renderEducationWorkspace(role);
}

function renderEducationWorkspace(role) {
  const overview = document.querySelector('#overview-view');
  const opportunitiesView = document.querySelector('#opportunities-view');
  const applicationsView = document.querySelector('#applications-view');
  const skillsView = document.querySelector('#skills-view');
  const portfolioView = document.querySelector('#portfolio-view');
  const profileView = document.querySelector('#profile-view');
  if (!overview || !opportunitiesView || !applicationsView || !skillsView || !portfolioView || !profileView) return;
  const isCollege = role === 'College';
  const title = isCollege ? 'Good morning, faculty team' : 'Good morning, institution team';
  const eyebrow = isCollege ? 'Faculty workspace' : 'Institution workspace';
  const subtitle = isCollege
    ? 'Coordinate faculty expertise, industry connections and learner outcomes.'
    : 'Turn readiness data into stronger placement and training outcomes.';
  const stats = isCollege
    ? [['Learners supported', '248', '↑ 16 this term'], ['Industry connections', '18', '↑ 4 this month'], ['Active initiatives', '12', '3 need updates'], ['Placement readiness', '76%', '↑ 9% this term']]
    : [['Students tracked', '1,284', '↑ 8% this term'], ['Placement readiness', '72%', '↑ 11% this year'], ['Skill gaps mapped', '36', 'Across 8 departments'], ['Partner organisations', '42', '↑ 6 this quarter']];
  const actions = isCollege
    ? [['✦', 'Faculty expertise', 'Keep teaching areas and availability current.', 'Update expertise'], ['↗', 'Industry collaboration', 'Review requests for FDPs, projects and consultancy.', 'Explore connections']]
    : [['◇', 'Skill-gap report', 'Prioritise the capabilities employers are requesting now.', 'View analytics'], ['✓', 'Placement progress', 'Monitor cohorts, offers and intervention needs.', 'Open tracker']];
  overview.innerHTML = `<div class="welcome-row"><div><p class="eyebrow">${eyebrow}</p><h1>${title} <span class="wave">✦</span></h1><p class="muted">${subtitle}</p></div><button class="button button-primary" data-action="workspace-action"><span>＋</span> ${isCollege ? 'Add collaboration' : 'Create report'}</button></div>
    <div class="metrics-grid">${stats.map(([label, value, note]) => `<article class="metric-card"><div class="metric-top"><span>${label}</span><span class="metric-icon orange">✦</span></div><div class="metric-value">${value}</div><p class="metric-note positive">${note}</p></article>`).join('')}</div>
    <div class="dashboard-grid"><article class="card readiness-card"><div class="card-heading"><div><p class="eyebrow">Priority overview</p><h2>${isCollege ? 'Support your learner network' : 'Institution readiness snapshot'}</h2></div><button class="text-button" data-view-link="${isCollege ? 'opportunities' : 'skills'}">View details <span>→</span></button></div><p class="next-step-copy">${isCollege ? 'Connect faculty capability with student projects, training programmes and relevant industry opportunities.' : 'Use department-level readiness and demand signals to focus interventions where they will improve placement outcomes.'}</p><div class="next-step-action"><span class="sparkle">✦</span><div><strong>${isCollege ? '8 collaboration requests' : '14 departments need attention'}</strong><p>Updated from your latest workspace activity</p></div><button class="arrow-button" data-action="workspace-action">Review <span>→</span></button></div></article><article class="card next-step-card"><div class="card-heading"><div><p class="eyebrow">Recommended actions</p><h2>Keep outcomes moving</h2></div><span class="next-step-icon">→</span></div>${actions.map(([icon, heading, copy, action]) => `<div class="role-action-row"><span class="role-action-icon">${icon}</span><div><strong>${heading}</strong><p>${copy}</p></div><button class="text-button" data-action="workspace-action">${action}</button></div>`).join('')}</article></div>
    <section class="card opportunities-card"><div class="card-heading opportunities-heading"><div><p class="eyebrow">Recent activity</p><h2>${isCollege ? 'Network activity' : 'Outcome activity'}</h2></div><button class="text-button" data-view-link="messages">View all <span>→</span></button></div><div class="opportunity-list"><div class="activity-item"><span class="activity-icon orange">↗</span><div><strong>${isCollege ? 'New industry collaboration request' : 'Placement report refreshed'}</strong><p>${isCollege ? 'Razorpay · Product engineering workshop' : 'Computer Science · Readiness data updated'}</p></div><time>Today</time></div><div class="activity-item"><span class="activity-icon green">✓</span><div><strong>${isCollege ? 'Faculty profile published' : 'Training intervention completed'}</strong><p>${isCollege ? 'Your expertise is now visible to partner organisations.' : 'Cloud fundamentals cohort completed.'}</p></div><time>Yesterday</time></div></div></section>`;

  if (!isCollege) return;
  opportunitiesView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Faculty collaborations</p><h1>Connect expertise to impact</h1><p class="muted">Discover industry projects, FDPs, consultancy and research requests.</p></div><button class="button button-primary" data-action="workspace-action">＋ Add collaboration</button></div><div class="toolbar card"><label class="search-field"><span>⌕</span><input placeholder="Search collaborations..." /></label><select aria-label="Collaboration type"><option>All collaboration types</option><option>Industry project</option><option>FDP / training</option><option>Research</option></select></div><section class="card opportunities-card"><div class="card-heading"><div><p class="eyebrow">Matched to your expertise</p><h2>Open collaboration requests</h2></div></div><div class="opportunity-list"><article class="opportunity-row"><div class="company-logo zepto">R</div><div class="opportunity-info"><div class="opportunity-title"><h3>Product engineering workshop</h3><span class="match-badge">92% fit</span></div><p>Razorpay <span>•</span> Bengaluru / Remote <span>•</span> Starts Oct 14</p><div class="opportunity-tags"><span>Web development</span><span>Industry training</span></div></div><button class="button button-outline" data-action="workspace-action">Review</button></article><article class="opportunity-row"><div class="company-logo cred">C</div><div class="opportunity-info"><div class="opportunity-title"><h3>Applied data research project</h3><span class="match-badge">84% fit</span></div><p>CRED <span>•</span> Remote <span>•</span> 12-week project</p><div class="opportunity-tags"><span>Data analytics</span><span>Research mentor</span></div></div><button class="button button-outline" data-action="workspace-action">Review</button></article></div></section>`;
  applicationsView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Learner outcomes</p><h1>Support your students</h1><p class="muted">Track advisees, interventions and placement readiness from one workspace.</p></div><button class="button button-outline" data-action="workspace-action">↓ Export learner report</button></div><div class="application-stats"><div class="mini-stat"><strong>248</strong><span>Students supported</span></div><div class="mini-stat"><strong class="teal-text">76%</strong><span>Placement ready</span></div><div class="mini-stat"><strong class="purple-text">32</strong><span>Need mentoring</span></div><div class="mini-stat"><strong class="orange-text">18</strong><span>Placed this term</span></div></div><div class="card application-card"><div class="card-heading"><div><p class="eyebrow">Attention queue</p><h2>Students needing support</h2></div><button class="text-button" data-action="workspace-action">View all <span>→</span></button></div><div class="faculty-learner-row"><span class="avatar">RK</span><div><strong>Riya Kapoor</strong><p>B.Tech CSE · Missing interview readiness skills</p></div><span class="match-badge">68% ready</span><button class="button button-outline" data-action="workspace-action">Message</button></div><div class="faculty-learner-row"><span class="avatar purple-avatar">AM</span><div><strong>Aditya Menon</strong><p>B.Sc. IT · Needs a project mentor</p></div><span class="match-badge">61% ready</span><button class="button button-outline" data-action="workspace-action">Assign</button></div></div>`;
  skillsView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Faculty expertise</p><h1>Make your expertise discoverable</h1><p class="muted">Help industry and learners find the areas where you can contribute.</p></div><button class="button button-primary" data-action="workspace-action">Save expertise</button></div><div class="skill-overview-grid"><div class="card skill-score"><p class="eyebrow">Profile visibility</p><div class="large-score">92<span>%</span></div><div class="progress-track"><span style="width:92%"></span></div><p class="muted">Your expertise profile is highly discoverable</p></div><div class="card skill-score"><p class="eyebrow">Industry demand</p><div class="large-score">18</div><p class="muted">Open requests match your teaching areas</p></div><div class="card skill-score"><p class="eyebrow">Active mentorships</p><div class="large-score">12</div><p class="muted">Learners currently linked to you</p></div></div><div class="card skill-list"><div class="card-heading"><div><p class="eyebrow">Areas of expertise</p><h2>Teaching and collaboration skills</h2></div><button class="text-button" data-action="workspace-action">＋ Add area</button></div><div class="skill-item"><span>Web development & React</span><span class="skill-level advanced">Advanced</span></div><div class="skill-item"><span>Industry project mentorship</span><span class="skill-level advanced">Advanced</span></div><div class="skill-item"><span>Data analytics</span><span class="skill-level intermediate">Intermediate</span></div><div class="skill-item"><span>Curriculum design</span><span class="skill-level intermediate">Intermediate</span></div></div>`;
  portfolioView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Faculty portfolio</p><h1>Showcase your academic impact</h1><p class="muted">Give partners and learners a clear view of your work.</p></div><button class="button button-primary" data-action="workspace-action">Save profile</button></div><div class="card portfolio-card"><div class="portfolio-cover"></div><div class="portfolio-identity"><span class="avatar profile-avatar">PF</span><div><h2>Dr. Priya Faculty</h2><p>Associate Professor · Computer Science</p></div></div><p class="portfolio-about">I help learners connect strong technical foundations with real-world industry projects, research and career outcomes.</p><div class="portfolio-tags"><span>Web systems</span><span>Mentorship</span><span>Applied research</span></div><div class="card-heading portfolio-heading"><div><p class="eyebrow">Academic impact</p><h2>Projects and contributions</h2></div><button class="text-button" data-action="workspace-action">＋ Add item</button></div><div class="portfolio-item"><span class="project-icon">⌘</span><div><strong>Industry-ready curriculum lab</strong><p>Curriculum · Supported 120 learners across two cohorts</p></div></div><div class="portfolio-item"><span class="project-icon orange-project">✦</span><div><strong>Applied computing research group</strong><p>Research · 4 active student projects</p></div></div></div>`;
  profileView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Faculty profile</p><h1>Keep your academic profile current</h1><p class="muted">Complete profiles attract better learners and collaboration requests.</p></div><button class="button button-primary" data-action="workspace-action">Save changes</button></div><div class="profile-layout"><div class="card profile-form"><div class="profile-hero"><span class="avatar profile-avatar">PF</span><div><h2>Dr. Priya Faculty</h2><p>Associate Professor · Computer Science</p></div><span class="profile-status">● Available for collaboration</span></div><div class="form-grid"><label>Full name<input value="Dr. Priya Faculty" /></label><label>Designation<input value="Associate Professor" /></label><label>College<input value="Indian Institute of Technology, Delhi" /></label><label>Department<input value="Computer Science & Engineering" /></label><label>Phone number<input value="+91 98765 43210" /></label><label>Preferred collaboration<input value="Projects, FDPs, research" /></label></div><label class="full-label">About your work<textarea rows="4">I help learners connect strong technical foundations with real-world industry projects, research and career outcomes.</textarea></label></div><div class="card completion-card"><p class="eyebrow">Profile strength</p><div class="completion-ring">92%</div><h3>Profile is discoverable</h3><p class="muted">Add publications and availability to improve collaboration matches.</p><button class="button button-outline" data-action="workspace-action">Add publication</button></div></div>`;
}

function renderIndustryWorkspace() {
  const overview = document.querySelector('#overview-view');
  const opportunitiesView = document.querySelector('#opportunities-view');
  const applicationsView = document.querySelector('#applications-view');
  const skillsView = document.querySelector('#skills-view');
  const portfolioView = document.querySelector('#portfolio-view');
  const profileView = document.querySelector('#profile-view');
  if (!overview || !opportunitiesView || !applicationsView || !skillsView || !portfolioView || !profileView) return;

  overview.innerHTML = `<div class="welcome-row"><div><p class="eyebrow">Recruiter workspace</p><h1>Good morning, hiring team <span class="wave">✦</span></h1><p class="muted">Build your pipeline with skill-matched, placement-ready talent.</p></div><button class="button button-primary industry-post-trigger"><span>＋</span> Post an opportunity</button></div>
    <div class="metrics-grid"><article class="metric-card"><div class="metric-top"><span>Active postings</span><span class="metric-icon purple">↗</span></div><div class="metric-value">${industryOpportunities.length}</div><p class="metric-note positive">↑ 1 <span>this month</span></p></article><article class="metric-card"><div class="metric-top"><span>Matched candidates</span><span class="metric-icon blue">◇</span></div><div class="metric-value">42</div><p class="metric-note positive">↑ 18 <span>this week</span></p></article><article class="metric-card"><div class="metric-top"><span>Applications</span><span class="metric-icon orange">✎</span></div><div class="metric-value">27</div><p class="metric-note"><b>12</b> <span>need review</span></p></article><article class="metric-card"><div class="metric-top"><span>Time to shortlist</span><span class="metric-icon green">◎</span></div><div class="metric-value">2.4<span class="metric-unit">d</span></div><p class="metric-note positive">↓ 18% <span>faster this month</span></p></article></div>
    <div class="dashboard-grid"><article class="card readiness-card"><div class="card-heading"><div><p class="eyebrow">Talent discovery</p><h2>Top matched candidates</h2></div><button class="text-button industry-candidates-link">View all <span>→</span></button></div><div class="candidate-list">${candidateMatches.slice(0, 2).map(candidateMarkup).join('')}</div></article><article class="card next-step-card"><div class="card-heading"><div><p class="eyebrow">Hiring momentum</p><h2>Keep your pipeline moving</h2></div><span class="next-step-icon">→</span></div><p class="next-step-copy">Review your newest applicants and schedule interviews before your shortlist goes cold.</p><div class="next-step-action"><span class="sparkle">✦</span><div><strong>12 applications need review</strong><p>Across ${industryOpportunities.length} active postings</p></div><button class="arrow-button industry-applicants-link">Review <span>→</span></button></div></article></div>
    <section class="card opportunities-card"><div class="card-heading opportunities-heading"><div><p class="eyebrow">Your hiring activity</p><h2>Active opportunities</h2></div><button class="text-button industry-post-trigger">＋ New posting</button></div><div class="opportunity-list">${industryOpportunities.map(industryOpportunityMarkup).join('')}</div></section>`;

  opportunitiesView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Recruiter board</p><h1>Post and manage opportunities</h1><p class="muted">Define the skills you need and reach matched candidates.</p></div><button class="button button-primary industry-post-trigger">＋ Post opportunity</button></div><div class="card industry-post-card"><div class="card-heading"><div><p class="eyebrow">Create a listing</p><h2>Tell candidates what you need</h2></div><span class="form-status">Draft ready</span></div><form id="industry-post-form" class="industry-form"><label>Role title<input name="title" required placeholder="e.g. Backend Developer Intern" /></label><label>Opportunity type<select name="type"><option>Internship</option><option>Full-time</option></select></label><label>Location<input name="location" required placeholder="e.g. Bengaluru / Remote" /></label><label>Stipend / salary<input name="compensation" placeholder="e.g. ₹35k / month or ₹8–12 LPA" /></label><label class="full-label">Required skills<input name="skills" required placeholder="React, Node.js, SQL" /><small class="  form-hint">Separate skills with commas so PathFinder can match candidates.</small></label><label class="full-label">Role description<textarea name="description" rows="3" required placeholder="What will this person work on?"></textarea></label><button class="button button-primary" type="submit">Publish opportunity <span>→</span></button></form></div><section class="card opportunities-card"><div class="card-heading"><div><p class="eyebrow">Published by your team</p><h2>Your opportunities</h2></div></div><div id="industry-opportunity-list" class="opportunity-list">${industryOpportunities.map(industryOpportunityMarkup).join('')}</div></section>`;

  applicationsView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Applicant pipeline</p><h1>Manage applications</h1><p class="muted">Review, shortlist and move candidates through your hiring process.</p></div><button class="button button-outline industry-export">↓ Export pipeline</button></div><div class="application-stats"><div class="mini-stat"><strong>27</strong><span>Total applicants</span></div><div class="mini-stat"><strong class="teal-text">12</strong><span>Need review</span></div><div class="mini-stat"><strong class="purple-text">06</strong><span>Shortlisted</span></div><div class="mini-stat"><strong class="orange-text">03</strong><span>Interviews</span></div></div><div class="card application-card"><div class="filter-tabs"><button class="filter-tab active" data-industry-filter="all">All <span>27</span></button><button class="filter-tab" data-industry-filter="Review">Needs review <span>12</span></button><button class="filter-tab" data-industry-filter="Shortlisted">Shortlisted <span>6</span></button><button class="filter-tab" data-industry-filter="Interview">Interview <span>3</span></button></div><div id="industry-applicant-list">${industryApplicants.map(applicantMarkup).join('')}</div></div>`;

  skillsView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Required skills</p><h1>Define your talent needs</h1><p class="muted">See which skills are attracting candidates and tune your requirements.</p></div><button class="button button-primary industry-post-trigger">＋ Add skill requirement</button></div><div class="skill-overview-grid"><div class="card skill-score"><p class="eyebrow">Most requested</p><div class="large-score">React</div><p class="muted">Required in 68% of matched profiles</p></div><div class="card skill-score"><p class="eyebrow">Average match</p><div class="large-score">89<span>%</span></div><div class="progress-track"><span style="width:89%"></span></div><p class="muted">Across your active postings</p></div><div class="card skill-score"><p class="eyebrow">Skill coverage</p><div class="large-score">14</div><p class="muted">Skills mapped to your hiring needs</p></div></div><div class="card skill-list industry-skill-list"><div class="card-heading"><div><p class="eyebrow">Current requirements</p><h2>Skills by opportunity</h2></div></div>${industryOpportunities.map((item) => `<div class="skill-item"><span><strong>${item.title}</strong><small>${item.type} · ${item.applicants} applicants</small></span><span class="opportunity-tags">${item.skills.map((skill) => `<em>${skill}</em>`).join('')}</span></div>`).join('')}</div>`;
  portfolioView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Talent showcase</p><h1>Your employer profile</h1><p class="muted">Help candidates understand why they should build their future with your team.</p></div><button class="button button-primary industry-company-save">Save company profile</button></div><div class="card portfolio-card"><div class="portfolio-cover industry-cover"></div><div class="portfolio-identity"><span class="avatar profile-avatar">PF</span><div><h2>Pathfinder Labs</h2><p>Technology · Bengaluru · 1,200+ employees</p></div></div><p class="portfolio-about">We build products that make education and opportunity more accessible. Meet curious people, solve meaningful problems and grow with a team that values learning.</p><div class="portfolio-tags"><span>Learning culture</span><span>Flexible work</span><span>Mentorship</span></div><div class="card-heading portfolio-heading"><div><p class="eyebrow">What candidates see</p><h2>Hiring highlights</h2></div><button class="text-button industry-company-edit">Edit details</button></div><div class="portfolio-item"><span class="project-icon">✦</span><div><strong>Skill-first hiring</strong><p>We evaluate potential alongside experience and make every shortlist transparent.</p></div></div><div class="portfolio-item"><span class="project-icon orange-project">↗</span><div><strong>Early-career growth</strong><p>Structured mentorship, real ownership and a clear path from internship to full-time.</p></div></div></div>`;
  profileView.innerHTML = `<div class="page-header"><div><button class="back-page" data-back>← Back</button><p class="eyebrow">Company profile</p><h1>Make your team discoverable</h1><p class="muted">Keep your recruiter details current so candidates know who is hiring.</p></div><button class="button button-primary industry-profile-save">Save changes</button></div><div class="profile-layout"><div class="card profile-form"><div class="profile-hero"><span class="avatar profile-avatar">PF</span><div><h2>Pathfinder Labs</h2><p>Verified employer · Technology</p></div><span class="profile-status">● Hiring</span></div><div class="form-grid"><label>Company name<input value="Pathfinder Labs" /></label><label>Industry<input value="Education technology" /></label><label>Headquarters<input value="Bengaluru, India" /></label><label>Team size<select><option>500–1,500</option><option>100–500</option><option>1,500+</option></select></label></div><label class="full-label">About your company<textarea rows="4">We build products that make education and opportunity more accessible.</textarea></label></div><div class="card completion-card"><div class="completion-ring"><strong>92%</strong></div><h3>Profile strength</h3><p class="muted">Add your benefits and hiring process to reach more candidates.</p><button class="text-button industry-company-edit">Improve profile →</button></div></div>`;
  bindIndustryActions();
}

function candidateMarkup(candidate) {
  return `<div class="candidate-row"><span class="avatar avatar-small">${candidate.initials}</span><div><strong>${candidate.name}</strong><p>${candidate.education}</p><small>${candidate.skills}</small></div><span class="match-badge">${candidate.score}% match</span><button class="icon-button candidate-more" aria-label="Candidate actions">•••</button></div>`;
}

function industryOpportunityMarkup(item) {
  return `<article class="opportunity-row board-row"><div class="company-logo zepto">N</div><div class="opportunity-info"><div class="opportunity-title"><h3>${item.title}</h3><span class="match-badge">${item.status}</span></div><p>${item.type} <span>•</span> ${item.location} <span>•</span> ${item.applicants} applicants</p><div class="opportunity-tags">${item.skills.map((skill) => `<span>${skill}</span>`).join('')}</div></div><button class="button button-outline industry-manage">Manage <span>→</span></button></article>`;
}

function applicantMarkup([name, role, match, status, date]) {
  return `<div class="application-row industry-applicant-row"><span class="avatar avatar-small">${name.split(' ').map((part) => part[0]).join('')}</span><div class="application-role"><strong>${name}</strong><p>${role} <span>•</span> ${date}</p></div><span class="match-badge">${match} match</span><span class="status-pill ${status.toLowerCase().replace(' ', '-')}">${status}</span><button class="button button-outline applicant-action" data-applicant="${name}">${status === 'Interview' ? 'Schedule' : status === 'Shortlisted' ? 'Message' : 'Review'}</button></div>`;
}

function bindIndustryActions() {
  document.querySelectorAll('.industry-post-trigger').forEach((button) => button.addEventListener('click', () => {
    showView('opportunities');
    document.querySelector('#industry-post-form input[name="title"]')?.focus();
  }));
  document.querySelectorAll('.industry-candidates-link').forEach((button) => button.addEventListener('click', () => showView('skills')));
  document.querySelectorAll('.industry-applicants-link').forEach((button) => button.addEventListener('click', () => showView('applications')));
  document.querySelectorAll('.industry-manage').forEach((button) => button.addEventListener('click', () => showToast('Opening posting management tools.')));
  document.querySelectorAll('.candidate-more').forEach((button) => button.addEventListener('click', () => showToast('Candidate actions: view profile, shortlist, or message.')));
  document.querySelectorAll('.applicant-action').forEach((button) => button.addEventListener('click', () => showToast(`${button.dataset.applicant} moved to the next hiring step.`)));
  document.querySelector('.industry-export')?.addEventListener('click', () => showToast('Applicant pipeline report prepared.'));
  document.querySelector('.industry-company-save')?.addEventListener('click', () => showToast('Company profile saved.'));
  document.querySelector('.industry-company-edit')?.addEventListener('click', () => showToast('Company profile editor opened.'));
  document.querySelector('.industry-profile-save')?.addEventListener('click', () => showToast('Company profile changes saved.'));
  document.querySelector('#industry-post-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const skills = String(form.get('skills')).split(',').map((skill) => skill.trim()).filter(Boolean);
    industryOpportunities.unshift({ title: String(form.get('title')), type: String(form.get('type')), location: String(form.get('location')), skills, applicants: 0, status: 'Active' });
    renderIndustryWorkspace();
    showView('opportunities');
    showToast('Opportunity published. Matching candidates are now being notified.');
  });
  document.querySelectorAll('[data-industry-filter]').forEach((tab) => tab.addEventListener('click', () => {
    document.querySelectorAll('[data-industry-filter]').forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const filter = tab.dataset.industryFilter;
    document.querySelectorAll('.industry-applicant-row').forEach((row) => {
      row.classList.toggle('app-hidden', filter !== 'all' && !row.querySelector('.status-pill').textContent.includes(filter));
    });
  }));
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove('show'), 2600);
}

function renderAssessment() {
  const current = assessmentQuestions[assessmentIndex];
  const progress = ((assessmentIndex + 1) / assessmentQuestions.length) * 100;
  document.querySelector('#assessment-progress-bar').style.width = `${progress}%`;
  assessmentContent.innerHTML = `<p class="assessment-count">Question ${assessmentIndex + 1} of ${assessmentQuestions.length}</p><h3>${current.question}</h3><div class="assessment-options">${current.options.map((option, index) => `<button class="assessment-option ${assessmentAnswers[assessmentIndex] === index ? 'selected' : ''}" data-answer="${index}"><span>${String.fromCharCode(65 + index)}</span>${option}</button>`).join('')}</div><div class="assessment-actions">${assessmentIndex ? '<button class="back-button" id="assessment-back">← Previous</button>' : '<span></span>'}<button class="button button-primary" id="assessment-next">${assessmentIndex === assessmentQuestions.length - 1 ? 'See my result ✦' : 'Next question →'}</button></div>`;
  assessmentContent.querySelectorAll('.assessment-option').forEach((option) => option.addEventListener('click', () => {
    assessmentAnswers[assessmentIndex] = Number(option.dataset.answer);
    assessmentContent.querySelectorAll('.assessment-option').forEach((item) => item.classList.remove('selected'));
    option.classList.add('selected');
  }));
  assessmentContent.querySelector('#assessment-next').addEventListener('click', () => {
    if (assessmentAnswers[assessmentIndex] === undefined) return showToast('Choose an answer to continue.');
    if (assessmentIndex === assessmentQuestions.length - 1) {
      const readiness = 68 + assessmentAnswers.reduce((total, answer) => total + answer, 0);
      document.querySelector('#skills-view .large-score').innerHTML = `${readiness}<span>%</span>`;
      document.querySelector('#skills-view .blue-track span').style.width = `${readiness}%`;
      closeAssessment();
      showToast(`Assessment complete. Your readiness is now ${readiness}%.`);
      return;
    }
    assessmentIndex += 1;
    renderAssessment();
  });
  assessmentContent.querySelector('#assessment-back')?.addEventListener('click', () => {
    assessmentIndex -= 1;
    renderAssessment();
  });
}

function openAssessment() {
  assessmentIndex = 0;
  assessmentAnswers = [];
  assessmentModal.classList.remove('app-hidden');
  renderAssessment();
}

function closeAssessment() {
  assessmentModal.classList.add('app-hidden');
}

function renderDemoScene() {
  demoScenes.forEach((scene, index) => scene.classList.toggle('active', index === demoIndex));
  document.querySelectorAll('[data-guide-step]').forEach((step) => step.classList.toggle('active', Number(step.dataset.guideStep) === demoIndex));
  document.querySelector('#demo-caption-text').textContent = demoCaptions[demoIndex];
  document.querySelector('#demo-progress').style.width = `${((demoIndex + 1) / demoScenes.length) * 100}%`;
  document.querySelector('#demo-time').textContent = `0:0${(demoIndex + 1) * 4} / 0:12`;
}

function setDemoMode(mode) {
  const isCareer = mode === 'career';
  const scenes = isCareer ? careerVideo.scenes : [
    ['01', 'START WITH YOUR EDGE', 'Understand where you stand.', 'Complete your profile and map your skills against the roles you want.', '<div class="scene-visual dashboard-visual"><div class="mini-dashboard-top"><b>YOUR OVERVIEW</b><span>AS</span></div><strong>Good morning, NEXORA</strong><div class="mini-dashboard-metrics"><span><small>Profile</small><b>78%</b></span><span><small>Readiness</small><b>64%</b></span></div><u></u></div>'],
    ['02', 'SEE YOUR NEXT STEP', 'Turn gaps into a plan.', 'Get personalized learning recommendations based on real industry demand.', '<div class="scene-visual learning-visual"><span>✦</span><div><b>Recommended next step</b><strong>Cloud fundamentals</strong><u><i></i></u></div></div>'],
    ['03', 'FIND THE RIGHT FIT', 'Meet opportunities that match.', 'Discover roles that value the skills you are building, not just a keyword list.', '<div class="scene-visual role-visual"><i>z</i><span><b>Frontend Developer Intern</b><strong>92% match · Zepto</strong></span><em>→</em></div>'],
  ];
  document.querySelector('#demo-title').textContent = isCareer ? careerVideo.title : 'From potential to opportunity.';
  document.querySelector('.demo-heading p').textContent = isCareer ? careerVideo.description : 'A short visual walkthrough of how PathFinder helps you move forward.';
  document.querySelector('.demo-screen-top span').innerHTML = isCareer ? '<b>✦</b> PathFinder AI career guide' : '<b>P</b> PathFinder product preview';
  demoScenes.forEach((scene, index) => {
    const [number, eyebrow, heading, copy, visual] = scenes[index];
    scene.innerHTML = `<span class="scene-number">${number}</span><p class="eyebrow">${eyebrow}</p><h3>${heading}</h3><p>${copy}</p>${visual}`;
  });
  demoCaptions.splice(0, demoCaptions.length, ...(isCareer ? careerVideo.captions : [
    'Complete your profile to understand your starting point.',
    'Get a clear learning path built around your goals.',
    'Discover opportunities matched to your growing edge.',
  ]));
}

function renderCareerPreview() {
  const [title, copy] = careerPreviewScenes[careerPreviewIndex];
  const titleElement = document.querySelector('#career-preview-title');
  const copyElement = document.querySelector('#career-preview-copy');
  const progress = document.querySelector('#career-preview-progress');
  if (!titleElement || !copyElement || !progress) return;
  titleElement.classList.remove('preview-copy-in');
  copyElement.classList.remove('preview-copy-in');
  window.requestAnimationFrame(() => {
    titleElement.textContent = title;
    copyElement.textContent = copy;
    titleElement.classList.add('preview-copy-in');
    copyElement.classList.add('preview-copy-in');
  });
  progress.style.width = `${((careerPreviewIndex + 1) / careerPreviewScenes.length) * 100}%`;
}

function startCareerPreview() {
  renderCareerPreview();
  window.clearInterval(careerPreviewTimer);
  careerPreviewTimer = window.setInterval(() => {
    careerPreviewIndex = (careerPreviewIndex + 1) % careerPreviewScenes.length;
    renderCareerPreview();
  }, 4200);
}

function stopDemo() {
  window.clearInterval(demoTimer);
  demoPlaying = false;
  document.querySelector('#demo-play').textContent = '▶';
  document.querySelector('#demo-play').setAttribute('aria-label', 'Play walkthrough');
}

function startDemo() {
  window.clearInterval(demoTimer);
  demoPlaying = true;
  document.querySelector('#demo-play').textContent = 'Ⅱ';
  document.querySelector('#demo-play').setAttribute('aria-label', 'Pause walkthrough');
  demoTimer = window.setInterval(() => {
    demoIndex = (demoIndex + 1) % demoScenes.length;
    renderDemoScene();
  }, 4000);
}

function openDemo(event) {
  event?.preventDefault();
  setDemoMode('product');
  demoModal.classList.remove('app-hidden');
  demoIndex = 0;
  renderDemoScene();
  startDemo();
}

function openCareerVideo(event) {
  event?.preventDefault();
  setDemoMode('career');
  demoModal.classList.remove('app-hidden');
  demoIndex = 0;
  renderDemoScene();
  startDemo();
}

function closeDemo() {
  demoModal.classList.add('app-hidden');
  stopDemo();
}

function renderStreamSkills() {
  const picker = document.querySelector('#skill-picker');
  const stream = document.querySelector('#signin-stream')?.value || 'Information Technology';
  if (!picker) return;
  picker.innerHTML = (streamSkills[stream] || streamSkills['Other / Undecided'])
    .map((skill) => `<label><input type="checkbox" value="${skill}" /> <span>${skill}</span></label>`)
    .join('');
}

function enterApp(event) {
  event?.preventDefault();
  landing.style.display = 'none';
  app.classList.remove('app-hidden');
  window.scrollTo(0, 0);
}

function openSignin(event) {
  event?.preventDefault();
  closeDemo();
  landing.style.display = 'none';
  app.classList.add('app-hidden');
  signin.classList.remove('app-hidden');
  window.scrollTo(0, 0);
}

function closeSignin(event) {
  event?.preventDefault();
  signin.classList.add('app-hidden');
  landing.style.display = 'block';
}

function showLanding(event) {
  event?.preventDefault();
  app.classList.add('app-hidden');
  landing.style.display = 'block';
  window.scrollTo(0, 0);
}

function opportunityMarkup(role) {
  return `<article class="opportunity-row board-row"><div class="company-logo ${role.logoClass}">${role.logo}</div><div class="opportunity-info"><div class="opportunity-title"><h3>${role.title}</h3><span class="match-badge">${role.match}% match</span></div><p>${role.company} <span>•</span> ${role.location} <span>•</span> ${role.stipend}</p><div class="opportunity-tags">${role.skills.map((skill) => `<span>${skill}</span>`).join('')}</div></div><button class="button button-outline apply-button" data-role="${role.title}">View role <span>→</span></button></article>`;
}

function renderOpportunities() {
  const search = document.querySelector('#opportunity-search')?.value.toLowerCase() || '';
  const type = document.querySelector('#opportunity-type')?.value || 'all';
  const location = document.querySelector('#opportunity-location')?.value || 'all';
  const filtered = opportunities.filter((role) => {
    const searchable = `${role.title} ${role.company} ${role.skills.join(' ')}`.toLowerCase();
    return searchable.includes(search) && (type === 'all' || role.type === type) && (location === 'all' || role.location.includes(location));
  });
  const board = document.querySelector('#opportunity-board');
  if (!board) return;
  board.innerHTML = filtered.length ? filtered.map(opportunityMarkup).join('') : '<div class="no-results card"><span>⌕</span><strong>No matching roles</strong><p>Try a different search or filter.</p></div>';
  board.querySelectorAll('.apply-button').forEach((button) => button.addEventListener('click', () => showToast(`Opening ${button.dataset.role} details...`)));
}

function renderApplications(filter) {
  const list = document.querySelector('#application-list');
  if (!list) return;
  const filtered = filter === 'all' ? applications : applications.filter((application) => application[2] === filter);
  list.innerHTML = filtered.map(([role, company, status, date, match]) => `<div class="application-row"><span class="company-logo ${company === 'CRED' ? 'cred' : company === 'Razorpay' ? 'razorpay' : 'zepto'}">${company[0]}</span><div class="application-role"><strong>${role}</strong><p>${company} <span>•</span> ${date}</p></div><span class="match-badge">${match} match</span><span class="status-pill ${status.toLowerCase().replace(' ', '-')}">${status}</span><button class="icon-button application-more">•••</button></div>`).join('');
  list.querySelectorAll('.application-more').forEach((button) => button.addEventListener('click', () => showToast('Application actions: view details or withdraw.')));
}

navItems.forEach((item) => item.addEventListener('click', () => showView(item.dataset.view)));
document.querySelectorAll('[data-view-link]').forEach((link) => link.addEventListener('click', () => showView(link.dataset.viewLink)));
document.addEventListener('click', (event) => {
  const backButton = event.target.closest('[data-back]');
  if (backButton) showView(previousView, false);
  const viewLink = event.target.closest('[data-view-link]');
  if (viewLink && !viewLink.closest('#landing-screen')) showView(viewLink.dataset.viewLink);
  const workspaceAction = event.target.closest('[data-action="workspace-action"]');
  if (workspaceAction) showToast(currentRole === 'College' ? 'Collaboration workspace opened.' : 'Institution report workspace opened.');
});
document.querySelectorAll('[data-enter-app]').forEach((link) => link.addEventListener('click', enterApp));
document.querySelectorAll('[data-open-signin]').forEach((link) => link.addEventListener('click', openSignin));
document.querySelector('[data-open-demo]').addEventListener('click', openDemo);
document.querySelector('[data-open-career-video]').addEventListener('click', openCareerVideo);
document.querySelector('.demo-close').addEventListener('click', closeDemo);
document.querySelector('#demo-play').addEventListener('click', () => (demoPlaying ? stopDemo() : startDemo()));
demoModal.addEventListener('click', (event) => { if (event.target === demoModal) closeDemo(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeDemo(); });
document.querySelector('[data-close-signin]').addEventListener('click', closeSignin);
document.querySelector('[data-show-landing]').addEventListener('click', showLanding);
document.querySelector('.signin-next')?.addEventListener('click', (event) => {
const form = document.querySelector('#signin-form');
if (!form.reportValidity()) event.preventDefault();
});
document.querySelector('.back-button')?.addEventListener('click', () => {
  const currentStep = document.querySelector('.form-step.active');
  const previousStep = currentStep.dataset.step === '3' ? '2' : '1';
  currentStep.classList.remove('active');
  document.querySelector(`[data-step="${previousStep}"]`).classList.add('active');
});
document.querySelector('.qualification-next')?.addEventListener('click', () => {
  document.querySelector('[data-step="2"]')?.classList.remove('active');
  document.querySelector('[data-step="3"]')?.classList.add('active');
});
document.querySelector('#signin-stream')?.addEventListener('change', renderStreamSkills);
document.querySelectorAll('input[name="qualification"]').forEach((input) => input.addEventListener('change', () => {
  document.querySelectorAll('.qualification-picker label').forEach((label) => label.classList.toggle('selected', label.querySelector('input').checked));
}));
document.querySelectorAll('input[name="role"]').forEach((input) => input.addEventListener('change', () => {
  document.querySelectorAll('.role-picker label').forEach((label) => label.classList.toggle('selected', label.querySelector('input').checked));
  const selectedRole = document.querySelector('input[name="role"]:checked')?.value || 'Student';
  const isIndustry = selectedRole === 'Industry';
  const isOrganisation = selectedRole === 'Institution / Admin';
  const yearField = document.querySelector('#signin-year');
  const yearLabel = yearField?.closest('label');
  if (yearField && yearLabel) {
    yearField.required = true;
    yearLabel.firstChild.textContent = isIndustry ? 'Company founded year' : isOrganisation ? 'Accreditation / established year' : selectedRole === 'College' ? 'Institution established year' : 'Expected graduation year';
    yearField.innerHTML = isIndustry || isOrganisation || selectedRole === 'College'
      ? '<option value="">Choose a year</option><option>Before 2010</option><option>2010–2015</option><option>2016–2020</option><option>2021–2026</option>'
      : '<option value="">Choose a year</option><option>2025</option><option>2026</option><option>2027</option><option>2028</option><option>2029</option><option>2030</option>';
  }
}));
document.querySelector('#signin-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#signin-name').value.trim();
  const firstName = name.split(/\s+/)[0] || 'Ankush';
  const selectedSkills = [...document.querySelectorAll('.skill-picker input:checked')].map((input) => input.value);
  const qualification = document.querySelector('input[name="qualification"]:checked')?.value || 'B.Sc. IT';
  const stream = document.querySelector('#signin-stream')?.value || 'Information Technology';
  const role = document.querySelector('input[name="role"]:checked')?.value || 'Student';
  localStorage.setItem('pathfinderProfile', JSON.stringify({
    name,
    email: document.querySelector('#signin-email').value.trim(),
    phone: document.querySelector('#signin-phone').value.trim(),
    location: document.querySelector('#signin-location').value.trim(),
    organisation: document.querySelector('#signin-college').value.trim(),
    year: document.querySelector('#signin-year').value,
    qualification,
    stream,
    role,
  }));
  document.querySelectorAll('.profile-copy strong').forEach((element) => { element.textContent = name; });
  document.querySelector('.welcome-row h1').innerHTML = 'Good morning, NEXORA <span class="wave">✦</span>';
  const skillTags = document.querySelector('.readiness-card .skill-tags');
  if (selectedSkills.length) skillTags.innerHTML = selectedSkills.slice(0, 3).map((skill) => `<span>${skill}</span>`).join('');
  document.querySelector('.profile-copy small').textContent = role === 'Student' ? `${qualification} · ${stream}` : role;
  applyRole(role);
  signin.classList.add('app-hidden');
  app.classList.remove('app-hidden');
  showView('overview');
  showToast(`Welcome to PathFinder, ${firstName}. Your ${role.toLowerCase()} view is ready.`);
});
renderStreamSkills();
startCareerPreview();
const scrollRevealItems = document.querySelectorAll('.scroll-reveal, .benefit-grid article, .team-card, .trust-strip');
if ('IntersectionObserver' in window) {
  const scrollObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.16 });
  scrollRevealItems.forEach((item) => scrollObserver.observe(item));
} else {
  scrollRevealItems.forEach((item) => item.classList.add('is-visible'));
}
document.querySelector('.mobile-menu').addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelector('#complete-profile').addEventListener('click', () => showView(currentRole === 'Industry' ? 'opportunities' : 'profile'));
document.querySelector('#profile-action').addEventListener('click', () => showToast('Your profile changes have been saved.'));
document.querySelector('#opportunity-search').addEventListener('input', renderOpportunities);
document.querySelector('#opportunity-type').addEventListener('change', renderOpportunities);
document.querySelector('#opportunity-location').addEventListener('change', renderOpportunities);
document.querySelectorAll('.filter-tab').forEach((tab) => tab.addEventListener('click', () => {
  document.querySelectorAll('.filter-tab').forEach((item) => item.classList.remove('active'));
  tab.classList.add('active');
  renderApplications(tab.dataset.filter);
}));
document.querySelector('#send-message').addEventListener('click', () => {
  const input = document.querySelector('#message-input');
  if (!input.value.trim()) return showToast('Write a message before sending.');
  showToast('Message sent to Riya.');
  input.value = '';
});
document.querySelector('.modal-close').addEventListener('click', closeAssessment);
assessmentModal.addEventListener('click', (event) => { if (event.target === assessmentModal) closeAssessment(); });
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeAssessment(); });
document.querySelectorAll('.conversation').forEach((conversation) => conversation.addEventListener('click', () => {
  document.querySelectorAll('.conversation').forEach((item) => item.classList.remove('active'));
  conversation.classList.add('active');
  showToast(`Opened conversation with ${conversation.querySelector('strong').textContent}.`);
}));
document.querySelectorAll('.application-more').forEach((button) => button.addEventListener('click', () => showToast('Application actions: view details or withdraw.')));
document.querySelectorAll('#overview-view .apply-button').forEach((button) => button.addEventListener('click', () => showToast('Opening opportunity details...')));
document.querySelector('.topbar .icon-button[aria-label="Search"]').addEventListener('click', () => showView('opportunities'));
document.querySelector('.top-avatar').addEventListener('click', () => showView('profile'));
document.querySelectorAll('[data-top-action]').forEach((action) => action.addEventListener('click', () => {
  document.querySelector('#top-actions-menu').classList.add('app-hidden');
  document.querySelector('[data-top-more]')?.setAttribute('aria-expanded', 'false');
  if (action.dataset.topAction === 'settings') return showToast('Settings are ready to customize.');
  if (action.dataset.topAction === 'next') return showView(currentRole === 'Industry' ? 'opportunities' : 'skills');
}));
document.querySelector('[data-top-more]').addEventListener('click', (event) => {
  event.stopPropagation();
  const menu = document.querySelector('#top-actions-menu');
  const isHidden = menu.classList.toggle('app-hidden');
  event.currentTarget.setAttribute('aria-expanded', String(!isHidden));
});
document.querySelector('.help-card button').addEventListener('click', () => showToast('Support request started. Your placement team will respond soon.'));
document.querySelector('[data-footer-support]').addEventListener('click', () => showToast('Support request started. Your placement team will respond soon.'));
document.querySelector('.profile-chip').addEventListener('click', () => showView('profile'));
document.querySelector('#account-trigger').addEventListener('click', (event) => {
  event.stopPropagation();
  document.querySelector('#account-menu').classList.toggle('app-hidden');
});
document.querySelectorAll('[data-account-action]').forEach((action) => action.addEventListener('click', () => {
  const menu = document.querySelector('#account-menu');
  menu.classList.add('app-hidden');
  if (action.dataset.accountAction === 'profile') return showView('profile');
  if (action.dataset.accountAction === 'settings') return showToast('Account settings are ready to customize.');
  if (action.dataset.accountAction === 'logout') {
    app.classList.add('app-hidden');
    signin.classList.add('app-hidden');
    landing.style.display = 'block';
    showToast('You have been logged out safely.');
  }
}));
document.addEventListener('click', (event) => {
  if (!event.target.closest('#account-trigger') && !event.target.closest('#account-menu')) document.querySelector('#account-menu').classList.add('app-hidden');
  if (!event.target.closest('[data-top-more]') && !event.target.closest('#top-actions-menu')) {
    document.querySelector('#top-actions-menu').classList.add('app-hidden');
    document.querySelector('[data-top-more]')?.setAttribute('aria-expanded', 'false');
  }
});
document.querySelector('.profile-more').addEventListener('click', () => showToast('Profile actions: preview, share, or update visibility.'));
document.querySelector('#resume-input').addEventListener('change', (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
  if (!allowedTypes.includes(file.type) || file.size > 5 * 1024 * 1024) {
    event.target.value = '';
    return showToast('Upload a PDF or Word resume smaller than 5 MB.');
  }
  document.querySelector('#resume-name').textContent = `✓ ${file.name}`;
  localStorage.setItem('pathfinderResume', JSON.stringify({ name: file.name, size: file.size, uploadedAt: new Date().toISOString() }));
  showToast('Resume added to your profile.');
});
document.querySelector('#resume-remove').addEventListener('click', () => {
  document.querySelector('#resume-input').value = '';
  document.querySelector('#resume-name').textContent = 'No resume uploaded yet';
  localStorage.removeItem('pathfinderResume');
  showToast('Resume removed from your profile.');
});
const savedResume = JSON.parse(localStorage.getItem('pathfinderResume') || 'null');
if (savedResume?.name) document.querySelector('#resume-name').textContent = `✓ ${savedResume.name}`;
document.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => {
  const messages = { continue: 'Learning path opened.', 'all-courses': 'Showing all learning paths.', resume: 'Resume upload dialog opened.', export: 'Application report prepared.', saved: 'Showing your 3 saved roles.', message: 'New message composer opened.', 'portfolio-save': 'Your digital portfolio is saved.', 'portfolio-add': 'Portfolio item form opened.', 'portfolio-edit': 'Portfolio item actions opened.' };
  if (button.dataset.action === 'assessment') return openAssessment();
  if (button.dataset.action === 'resume') return document.querySelector('#resume-input').click();
  if (button.dataset.action === 'continue') {
    showView('skills');
    const firstCourse = document.querySelector('#skills-view .course-row');
    const progress = firstCourse?.querySelector('.course-progress span');
    if (progress) progress.style.width = `${Math.min(100, Number.parseInt(progress.style.width, 10) + 15)}%`;
    if (firstCourse) firstCourse.querySelector('.course-action').textContent = 'Continue →';
    showToast('Cloud fundamentals learning path opened.');
    return;
  }
  showToast(messages[button.dataset.action] || 'Action completed.');
}));
renderOpportunities();
