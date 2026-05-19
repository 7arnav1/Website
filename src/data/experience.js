export const experience = [
  {
    id: 'atrility',
    title: 'Software Development & Logistics Engineer',
    org: 'Atrility Medical',
    period: 'Sep 2025 – Present',
    bullets: [
      'Architected 1D U-Net ECG segmentation pipeline achieving 84.76% accuracy and 0.80 macro F1 (QRS 0.928, T Wave 0.949, P Wave 0.719); early stopping at epoch 14 with val loss 0.375.',
      'Built production training on Azure ML Foundry processing 300k+ hours across 70k+ files; cut iteration time from 3 days to under 12 hours by fixing OOM errors and rebuilding PyTorch DataLoader pipelines.',
      'Developed scalable pipelines converting raw CSV ECG data to Parquet and NPZ with schema validation; deployed as registered Azure ML endpoint with RBAC enabling 10× faster downstream analytics.',
      'Designed ECG labeling platform with Flask, Plotly, Azure Data Lake, and Cosmos DB for 4–5 clinicians daily; Azure AD auth and intelligent caching reduced annotation latency by 70%.',
      'Engineered RESTful APIs automating SOS and ShipStation logistics for 100–200 monthly shipments with 0% error rate through end-to-end validation and reconciliation.',
    ],
  },
  {
    id: 'regenmeds',
    title: 'Product Owner & Developer',
    org: 'RegenMeds Healthcare Data Platform (UW Capstone)',
    period: 'Jan 2026 – Present',
    bullets: [
      'Leading blockchain healthcare data provenance system with a team of 6; conducted 20+ stakeholder interviews to define requirements.',
      'Designing immutable ledger with smart contracts for Circle Health Coins; architecting full-stack on AWS with .NET C#, React, and PostgreSQL with HIPAA compliance across ingestion, storage, and retrieval.',
    ],
  },
  {
    id: 'sail',
    title: 'AI Research Intern',
    org: 'SAIL @ N+1 Institute (OpenAI / CDIS Sponsored)',
    period: 'Jun 2025 – Aug 2025',
    highlight: 'Competitive Selection',
    bullets: [
      'Engineered LLM prompt techniques achieving consistent, reproducible model outputs.',
      'Built async Python pipelines using FastAPI with optimized inference for low-latency real-time AI responses.',
      'Collaborated with OpenAI-affiliated researchers on conversational AI workflows and evaluation frameworks.',
    ],
  },
  {
    id: 'ta',
    title: 'Teaching Assistant — CS540: Intro to AI',
    org: 'UW–Madison',
    period: 'Jan 2025 – May 2025',
    bullets: [
      'Mentored 500+ students on AI algorithms and ML concepts; led 20+ review sessions that improved average midterm performance by 15%.',
    ],
  },
];
