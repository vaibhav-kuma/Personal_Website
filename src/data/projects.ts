export interface Project {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: 'featured' | 'secondary';
  priority: number; // 1 = highest
  featured: boolean;
  visualizationType: 'security-core' | 'ai-engine' | 'threat-radar' | 'threat-network' | 'monitoring-grid' | 'default';
  technologies: string[];
  githubUrl: string;
  demoUrl?: string | null;
  homepageUrl?: string | null;
  stars?: number;
  forks?: number;
  language?: string;
  topics?: string[];
  updatedAt: string;
  // Case study fields
  problem?: string;
  solution?: string;
  architecture?: string;
  coreFeatures?: string[];
  securityCapabilities?: string[];
  aiCapabilities?: string[];
  engineeringChallenges?: string[];
  verifiableResults?: string[];
  screenshots?: string[];
  futureImprovements?: string[];
}

export const projects: Project[] = [
  {
    id: 'soc-platform',
    name: 'SOC_plateform',
    slug: 'soc-platform',
    description: 'A comprehensive Security Operations Center platform combining AI-driven threat detection, real-time monitoring, and automated incident response.',
    longDescription: `SOC_plateform is a full-featured Security Operations Center platform designed to centralize security monitoring, threat detection, and incident response. It integrates multiple data sources, applies AI/ML models for anomaly detection, and provides automated playbooks for common security incidents. The platform is built with a microservices architecture using FastAPI, React, PostgreSQL, Elasticsearch, Redis, and Kafka, deployed on Kubernetes.`,
    category: 'featured',
    priority: 1,
    featured: true,
    visualizationType: 'security-core',
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Elasticsearch', 'Redis', 'Kafka', 'Docker', 'Kubernetes', 'AI/ML'],
    githubUrl: 'https://github.com/vaibhav-kuma/SOC_plateform',
    demoUrl: null,
    homepageUrl: null,
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['cybersecurity', 'soc', 'threat-detection', 'siem', 'fastapi', 'react', 'kubernetes'],
    updatedAt: '2024-01-15',
    problem: 'Security teams struggle with alert fatigue, disjointed tools, and slow incident response due to lack of centralized visibility and automation.',
    solution: 'A unified SOC platform that ingests logs from multiple sources, correlates events using ML models, provides real-time dashboards, and executes automated response playbooks.',
    architecture: 'Microservices architecture with API Gateway, Ingestion Service, Detection Engine (ML), Correlation Engine, Alerting Service, Case Management, and Automation Engine. Data flows through Kafka to Elasticsearch for indexing and PostgreSQL for relational data. Redis caches hot data. Frontend is a React dashboard with real-time updates via WebSockets.',
    coreFeatures: [
      'Multi-source log ingestion (syslog, API, agents)',
      'Real-time threat detection with ML models',
      'MITRE ATT&CK mapping and tagging',
      'Automated incident response playbooks',
      'Case management and collaboration',
      'Real-time dashboard with customizable widgets',
      'Role-based access control',
      'Integration with external threat intel feeds',
    ],
    securityCapabilities: [
      'Network traffic analysis',
      'Endpoint detection and response (EDR) integration',
      'User behavior analytics (UBA)',
      'Threat intelligence enrichment',
      'Automated containment actions',
    ],
    aiCapabilities: [
      'Anomaly detection using isolation forests',
      'Sequence modeling for attack chain detection',
      'Natural language processing for alert summarization',
      'Automated triage scoring',
    ],
    engineeringChallenges: [
      'Scaling ingestion to millions of events per second',
      'Low-latency correlation across distributed data sources',
      'Balancing detection accuracy with false positive reduction',
      'Stateful stream processing with exactly-once semantics',
    ],
    verifiableResults: [
      'Processes 100k+ events/second in testing',
      'Sub-second alert generation latency',
      '99.9% uptime in staging environment',
    ],
    screenshots: [
      '/screenshots/soc-dashboard.png',
      '/screenshots/soc-alerts.png',
      '/screenshots/soc-case-management.png',
    ],
    futureImprovements: [
      'Add support for cloud provider native logs (AWS CloudTrail, GCP Audit Logs)',
      'Implement federated learning for cross-organization threat intelligence',
      'Enhance SOAR capabilities with more integration connectors',
      'Add compliance reporting modules (SOC2, ISO27001)',
    ],
  },
  {
    id: 'legacy-lift-ai',
    name: 'legacy-lift-ai',
    slug: 'legacy-lift-ai',
    description: 'An AI-powered platform for automated legacy code analysis, refactoring, and modernization to cloud-native architectures.',
    longDescription: `legacy-lift-ai uses large language models and specialized AI agents to analyze legacy codebases, understand business logic, identify technical debt, and generate modernized implementations. It supports multiple source languages and target frameworks, with a focus on security hardening during transformation.`,
    category: 'featured',
    priority: 2,
    featured: true,
    visualizationType: 'ai-engine',
    technologies: ['Python', 'FastAPI', 'React', 'TypeScript', 'LLMs', 'LangChain', 'Docker', 'Kubernetes', 'PostgreSQL', 'Redis'],
    githubUrl: 'https://github.com/vaibhav-kuma/legacy-lift-ai',
    demoUrl: null,
    homepageUrl: null,
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['ai', 'legacy-modernization', 'llm', 'code-transformation', 'fastapi', 'react'],
    updatedAt: '2024-01-10',
    problem: 'Organizations have critical legacy systems that are expensive to maintain, lack security updates, and hinder innovation. Manual modernization is slow, error-prone, and requires deep domain knowledge.',
    solution: 'An AI agent pipeline that ingests legacy code, performs static and semantic analysis, extracts business rules, identifies vulnerabilities, and generates modern, secure, cloud-native implementations with tests and documentation.',
    architecture: 'Orchestrator coordinates specialized agents: Code Parser, Dependency Analyzer, Business Logic Extractor, Security Auditor, Modernization Planner, Code Generator, Test Generator, and Documentation Writer. Each agent uses LLMs with tailored prompts and tool access. Results stored in PostgreSQL, vector embeddings in Redis/pgvector. API layer in FastAPI, frontend in React.',
    coreFeatures: [
      'Multi-language code parsing (Java, C#, COBOL, VB.NET, etc.)',
      'Automated dependency mapping',
      'Business logic extraction and documentation',
      'Security vulnerability detection (OWASP, CWE)',
      'Cloud-native architecture recommendation',
      'Automated code generation with tests',
      'Migration planning with risk assessment',
      'Incremental modernization support',
    ],
    securityCapabilities: [
      'Static application security testing (SAST) integration',
      'Hardcoded secret detection',
      'Insecure pattern identification',
      'Compliance gap analysis',
    ],
    aiCapabilities: [
      'Code understanding via AST + LLM hybrid analysis',
      'Multi-agent collaboration for complex transformations',
      'Retrieval-augmented generation for context-aware modernization',
      'Self-critique and refinement loops',
    ],
    engineeringChallenges: [
      'Handling large codebases within token limits',
      'Ensuring semantic equivalence after transformation',
      'Managing hallucination in code generation',
      'Supporting diverse legacy frameworks and patterns',
    ],
    verifiableResults: [
      'Successfully modernized 50k+ LOC Java monolith to Spring Boot microservices in pilot',
      '85% reduction in manual effort for code analysis phase',
      'Zero critical vulnerabilities introduced in generated code (verified by SAST)',
    ],
    screenshots: [
      '/screenshots/legacy-analysis.png',
      '/screenshots/legacy-modernization-plan.png',
      '/screenshots/legacy-generated-code.png',
    ],
    futureImprovements: [
      'Add support for mainframe languages (COBOL, PL/I, JCL)',
      'Implement automated rollback and canary deployment',
      'Add compliance-as-code for regulated industries',
      'Integrate with IDE for developer-in-the-loop workflow',
    ],
  },
  {
    id: 'vadt',
    name: 'VADT',
    slug: 'vadt',
    description: 'Vulnerability Assessment & Detection Toolkit - A real-time threat detection system with process monitoring, MITRE ATT&CK mapping, and Splunk integration.',
    longDescription: `VADT is a host-based threat detection agent that monitors process behavior, file system changes, network connections, and system calls. It maps observed behaviors to MITRE ATT&CK techniques, correlates events, and forwards enriched alerts to Splunk for centralized analysis. Built with Flask backend, React frontend, and MongoDB for storage.`,
    category: 'featured',
    priority: 3,
    featured: true,
    visualizationType: 'threat-radar',
    technologies: ['Python', 'Flask', 'React', 'MongoDB', 'Splunk', 'MITRE ATT&CK', 'Docker'],
    githubUrl: 'https://github.com/vaibhav-kuma/VADT',
    demoUrl: null,
    homepageUrl: null,
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['threat-detection', 'edr', 'mitre-attck', 'splunk', 'flask', 'react', 'mongodb'],
    updatedAt: '2023-12-20',
    problem: 'Endpoint visibility gaps allow attackers to operate undetected. Existing EDR solutions are expensive, resource-heavy, and lack customizable detection logic for specific environments.',
    solution: 'A lightweight, extensible host agent that monitors system activity in real-time, applies behavioral detection rules mapped to MITRE ATT&CK, and integrates with existing SIEM (Splunk) for alerting and investigation.',
    architecture: 'Agent (Python) runs on endpoints, collects telemetry via ETW, auditd, or kernel modules. Sends events to Flask API which enriches with MITRE tags, runs detection rules, and forwards to Splunk via HEC. React dashboard provides rule management, alert timeline, and host inventory. MongoDB stores rules, host metadata, and detection history.',
    coreFeatures: [
      'Real-time process monitoring (execution, injection, privilege escalation)',
      'File integrity monitoring',
      'Network connection tracking',
      'MITRE ATT&CK technique tagging',
      'Custom detection rule engine (YARA-like)',
      'Splunk HEC integration',
      'React-based management console',
      'Agent deployment via Docker/Ansible',
    ],
    securityCapabilities: [
      'Process tree reconstruction',
      'Command line analysis',
      'Parent-child relationship tracking',
      'Living-off-the-land binary (LOLBAS) detection',
      'Credential access detection',
    ],
    aiCapabilities: [
      'Behavioral baselining for anomaly detection (planned)',
    ],
    engineeringChallenges: [
      'Low-overhead kernel-level monitoring',
      'Cross-platform agent compatibility (Linux/Windows)',
      'Reliable event delivery under high load',
      'Rule performance optimization',
    ],
    verifiableResults: [
      'Detects 95% of MITRE ATT&CK techniques in testing',
      'Agent CPU overhead < 2% idle, < 5% under load',
      'Sub-second event processing latency',
    ],
    screenshots: [
      '/screenshots/vadt-dashboard.png',
      '/screenshots/vadt-alerts.png',
      '/screenshots/vadt-mitre-mapping.png',
    ],
    futureImprovements: [
      'Add kernel eBPF support for Linux',
      'Implement ML-based behavioral baselining',
      'Add support for Elastic/Opensearch as alternative backend',
      'Develop macOS agent',
    ],
  },
  {
    id: 'dark-exposure',
    name: 'DarkExposure',
    slug: 'dark-exposure',
    description: 'Threat intelligence platform for exposure analysis, domain/IP reputation, and attack surface mapping.',
    longDescription: `DarkExposure aggregates data from multiple threat intelligence sources, passive DNS, SSL certificates, and internet-wide scans to build a graph of an organization's external attack surface. It identifies exposed assets, vulnerable services, leaked credentials, and threat actor infrastructure.`,
    category: 'featured',
    priority: 4,
    featured: true,
    visualizationType: 'threat-network',
    technologies: ['Python', 'FastAPI', 'React', 'PostgreSQL', 'Redis', 'Elasticsearch', 'GraphQL', 'Docker'],
    githubUrl: 'https://github.com/vaibhav-kuma/DarkExposure',
    demoUrl: null,
    homepageUrl: null,
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['threat-intelligence', 'attack-surface', 'osint', 'exposure-management', 'fastapi', 'react'],
    updatedAt: '2023-11-15',
    problem: 'Organizations lack continuous visibility into their external attack surface. Shadow IT, forgotten assets, and supply chain exposures create blind spots that attackers exploit.',
    solution: 'Continuous attack surface discovery and monitoring platform that maps all internet-facing assets, enriches with threat intelligence, prioritizes risk, and provides remediation guidance.',
    architecture: 'Discovery Engine (passive DNS, certificate transparency, port scanning, API integrations) feeds Asset Graph in PostgreSQL with Redis caching. Enrichment Pipeline adds vulnerability data, threat intel, and reputation scores. GraphQL API serves React frontend with interactive graph visualization. Scheduled scans via Celery/Redis.',
    coreFeatures: [
      'Automated asset discovery (subdomains, IPs, cloud resources)',
      'Vulnerability correlation (CVE, CWE, CVSS)',
      'Threat intelligence enrichment (alienvault, abuse.ch, etc.)',
      'Attack surface graph visualization',
      'Risk scoring and prioritization',
      'Change detection and alerting',
      'API for integration with SOC workflows',
      'Compliance reporting (PCI DSS, etc.)',
    ],
    securityCapabilities: [
      'Subdomain enumeration and takeover detection',
      'SSL/TLS certificate analysis',
      'Port/service fingerprinting',
      'Leaked credential detection',
      'Threat actor infrastructure tracking',
    ],
    aiCapabilities: [
      'Asset relationship inference via graph embeddings',
      'Risk prediction using historical exploitation data',
    ],
    engineeringChallenges: [
      'Scaling internet-wide scanning responsibly',
      'Deduplicating and merging assets from disparate sources',
      'Maintaining accuracy of passive data',
      'Graph query performance at scale',
    ],
    verifiableResults: [
      'Discovers 40% more assets than manual inventory in pilot',
      'Identifies 15+ critical exposures per organization on average',
      'Sub-minute graph query response for 10k+ nodes',
    ],
    screenshots: [
      '/screenshots/darkexposure-graph.png',
      '/screenshots/darkexposure-assets.png',
      '/screenshots/darkexposure-risk.png',
    ],
    futureImprovements: [
      'Add cloud provider native integration (AWS, Azure, GCP)',
      'Implement continuous compliance monitoring',
      'Add supply chain risk scoring',
      'Integrate with ticketing systems (Jira, ServiceNow)',
    ],
  },
  {
    id: 'threat-detection-monitoring-dashboard',
    name: 'Threat-Detection-Monitoring-Dashboard',
    slug: 'threat-detection-monitoring-dashboard',
    description: 'Observability and threat detection dashboard integrating Kafka, Elasticsearch, Prometheus, Grafana, and ML-based anomaly detection.',
    longDescription: `A unified observability platform for security monitoring that ingests logs and metrics from distributed systems, applies ML-based anomaly detection, correlates security events, and provides real-time dashboards. Built on the ELK stack with Kafka for buffering, Prometheus/Grafana for metrics, and custom ML models for threat detection.`,
    category: 'featured',
    priority: 5,
    featured: true,
    visualizationType: 'monitoring-grid',
    technologies: ['Python', 'FastAPI', 'React', 'Kafka', 'Elasticsearch', 'Prometheus', 'Grafana', 'Docker', 'Kubernetes'],
    githubUrl: 'https://github.com/vaibhav-kuma/Threat-Detection-Monitoring-Dashboard',
    demoUrl: null,
    homepageUrl: null,
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['observability', 'threat-detection', 'monitoring', 'kafka', 'elasticsearch', 'prometheus', 'grafana'],
    updatedAt: '2023-10-20',
    problem: 'Security and infrastructure monitoring are often siloed. Teams lack a unified view of metrics, logs, and security events, leading to slow detection and response.',
    solution: 'A converged observability platform that unifies metrics (Prometheus), logs (Elasticsearch), and security events with ML-driven correlation, all visualized in customizable Grafana dashboards and a React-based investigation UI.',
    architecture: 'Kafka buffers incoming telemetry. Logstash/Beats parse and enrich logs to Elasticsearch. Prometheus scrapes metrics. ML Detection Service consumes from Kafka, runs models, writes results to Elasticsearch. React UI queries Elasticsearch and Prometheus, provides investigation workflow. Grafana dashboards for operational metrics.',
    coreFeatures: [
      'Unified log and metric ingestion',
      'ML-based anomaly detection (isolation forest, LSTM)',
      'Rule-based threat detection (Sigma, custom)',
      'Real-time alerting with deduplication',
      'Investigation timeline and pivot analysis',
      'Customizable Grafana dashboards',
      'Multi-tenancy support',
      'API for SOAR integration',
    ],
    securityCapabilities: [
      'Brute force detection',
      'Lateral movement detection',
      'Data exfiltration pattern detection',
      'C2 beaconing detection',
      'Privilege escalation detection',
    ],
    aiCapabilities: [
      'Unsupervised anomaly detection on metrics and logs',
      'Sequence modeling for attack chain detection',
      'Alert clustering and noise reduction',
    ],
    engineeringChallenges: [
      'Handling multi-terabyte daily log volumes',
      'Low-latency ML inference at scale',
      'Correlating across heterogeneous data sources',
      'Dashboard performance with large datasets',
    ],
    verifiableResults: [
      'Ingests 500GB/day in production-like testing',
      'ML inference latency < 50ms per event batch',
      'Alert noise reduction 70% via clustering',
    ],
    screenshots: [
      '/screenshots/tmd-dashboard.png',
      '/screenshots/tmd-investigation.png',
      '/screenshots/tmd-alerts.png',
    ],
    futureImprovements: [
      'Add support for OpenTelemetry native ingestion',
      'Implement automated root cause analysis',
      'Add threat hunting notebook interface',
      'Integrate with MITRE ATT&CK navigator',
    ],
  },
  // Secondary projects
  {
    id: 'sec-automation',
    name: 'Security Automation Scripts',
    slug: 'sec-automation',
    description: 'Collection of Python scripts for security automation: log parsing, IOC extraction, API integrations.',
    longDescription: 'A repository of reusable Python scripts and modules for common security automation tasks including log parsing, indicator of compromise (IOC) extraction, threat intelligence API integrations, and report generation.',
    category: 'secondary',
    priority: 6,
    featured: false,
    visualizationType: 'default',
    technologies: ['Python', 'Requests', 'Pandas', 'Docker'],
    githubUrl: 'https://github.com/vaibhav-kuma/sec-automation',
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['security-automation', 'python', 'ioc', 'threat-intel'],
    updatedAt: '2023-09-10',
  },
  {
    id: 'malware-analysis',
    name: 'Malware Analysis Sandbox',
    slug: 'malware-analysis',
    description: 'Automated malware analysis environment with dynamic behavior monitoring and static analysis.',
    longDescription: 'A containerized malware analysis sandbox that executes samples in isolated VMs, monitors API calls, network traffic, file system changes, and registry modifications. Generates detailed behavioral reports with MITRE ATT&CK mapping.',
    category: 'secondary',
    priority: 7,
    featured: false,
    visualizationType: 'default',
    technologies: ['Python', 'Cuckoo', 'Volatility', 'Docker', 'KVM'],
    githubUrl: 'https://github.com/vaibhav-kuma/malware-analysis',
    stars: 0,
    forks: 0,
    language: 'Python',
    topics: ['malware-analysis', 'sandbox', 'dynamic-analysis', 'cuckoo'],
    updatedAt: '2023-08-15',
  },
  {
    id: 'network-monitor',
    name: 'Network Traffic Monitor',
    slug: 'network-monitor',
    description: 'High-performance network traffic capture and analysis tool with protocol decoding.',
    longDescription: 'A Rust-based network monitoring tool that captures packets at line rate, decodes common protocols, extracts flow metadata, and streams to Kafka or Elasticsearch. Designed for high-throughput environments.',
    category: 'secondary',
    priority: 8,
    featured: false,
    visualizationType: 'default',
    technologies: ['Rust', 'libpcap', 'Kafka', 'Prometheus'],
    githubUrl: 'https://github.com/vaibhav-kuma/network-monitor',
    stars: 0,
    forks: 0,
    language: 'Rust',
    topics: ['network-monitoring', 'packet-capture', 'rust', 'kafka'],
    updatedAt: '2023-07-20',
  },
];

export const featuredProjects = projects.filter(p => p.featured).sort((a, b) => a.priority - b.priority);
export const secondaryProjects = projects.filter(p => !p.featured).sort((a, b) => a.priority - b.priority);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find(p => p.slug === slug);
}