// --- Data for AILogos.tsx & Hero.tsx ---
export interface AIModel {
    name: string;
    icon: string;
    description: string;
    rating: number;
    detailedDescription: string;
    documentationUrl: string;
    isAgentic?: boolean;
    trainingDataSize: string;
    strengths: string[];
    weaknesses: string[];
    useCases: { title: string; description: string }[];
}

export const aiModels: AIModel[] = [
    {
        name: 'Gemini',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="gemini-main" x1="5.636" y1="5.636" x2="18.364" y2="18.364" gradientUnits="userSpaceOnUse"><stop stopColor="#A855F7"/><stop offset="1" stopColor="#3B82F6"/></linearGradient>
                    <linearGradient id="gemini-accent" x1="18.364" y1="5.636" x2="5.636" y2="18.364" gradientUnits="userSpaceOnUse"><stop stopColor="#F97316"/><stop offset="1" stopColor="#FBBF24"/></linearGradient>
                </defs>
                <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16z" fill="url(#gemini-main)"/>
                <path d="M12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6z" fill="url(#gemini-accent)"/>
            </svg>`,
        description: 'Google\'s powerful, multimodal model capable of complex reasoning.',
        rating: 4.8,
        isAgentic: true,
        detailedDescription: "Gemini is Google's most capable and flexible model yet. With its multimodal capabilities, it can understand, operate across, and combine different types of information including text, code, audio, image, and video. Its advanced reasoning and state-of-the-art performance make it a top choice for a wide variety of applications.",
        documentationUrl: 'https://deepmind.google/technologies/gemini/',
        trainingDataSize: 'Vast (undisclosed)',
        strengths: ['Multimodality', 'Advanced Reasoning', 'State-of-the-art Performance'],
        weaknesses: ['Can be resource-intensive', 'API access costs'],
        useCases: [
            { title: 'Complex Data Analysis', description: 'Analyze and reason over complex datasets combining text, images, and charts.' },
            { title: 'Creative Content Generation', description: 'Generate high-quality text, code, and images from nuanced prompts.' }
        ]
    },
    {
        name: 'Claude 3',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M16.667 2H7.333C4.388 2 2 4.388 2 7.333v9.334C2 19.612 4.388 22 7.333 22h9.334C19.612 22 22 19.612 22 16.667V7.333C22 4.388 19.612 2 16.667 2z" fill="#D97706"/>
                <path d="M12 6c-3.313 0-6 2.687-6 6s2.687 6 6 6c1.657 0 3.156-.672 4.243-1.757" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>`,
        description: 'Anthropic\'s family of models known for safety and performance.',
        rating: 4.7,
        detailedDescription: "Claude 3 is a family of foundation models from Anthropic, designed to offer a balance of intelligence, speed, and cost. Known for its strong safety features and constitutional AI approach, Claude excels at thoughtful dialogue, content creation, and complex reasoning, all while minimizing harmful outputs.",
        documentationUrl: 'https://www.anthropic.com/news/claude-3-family',
        trainingDataSize: 'Large (proprietary)',
        strengths: ['Safety & Ethics', 'Long Context Window', 'Strong Reasoning'],
        weaknesses: ['Slightly less multimodal than some competitors', 'Can be overly cautious'],
        useCases: [
            { title: 'Enterprise Chatbots', description: 'Build safe and helpful customer service and internal knowledge bots.' },
            { title: 'Legal Document Analysis', description: 'Summarize and analyze long legal or financial documents with high accuracy.' }
        ]
    },
    {
        name: 'Llama 3',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 12C2 9.09 3.46 6.49 5.88 5.09L12 12L5.88 18.91C3.46 17.51 2 14.91 2 12z" fill="#4ADE80"/>
                <path d="M18.12 5.09C20.54 6.49 22 9.09 22 12C22 14.91 20.54 17.51 18.12 18.91L12 12L18.12 5.09z" fill="#34D399"/>
                <path d="M12 2L5.88 5.09L12 12V2z" fill="#A78BFA"/>
                <path d="M12 2V12L18.12 5.09L12 2z" fill="#818CF8"/>
                <path d="M5.88 18.91L12 22V12L5.88 18.91z" fill="#F472B6"/>
                <path d="M18.12 18.91L12 12V22L18.12 18.91z" fill="#F87171"/>
            </svg>`,
        description: 'Meta\'s state-of-the-art open source large language model.',
        rating: 4.6,
        detailedDescription: "Llama 3 is the latest generation of Meta's open source large language models. It's designed to be a powerful and flexible foundation for a wide range of applications, from research to commercial products. With its open nature, Llama 3 fosters innovation and allows developers to build directly on top of a state-of-the-art model.",
        documentationUrl: 'https://ai.meta.com/blog/meta-llama-3/',
        trainingDataSize: '15T+ tokens (pre-training)',
        strengths: ['Open Source', 'Highly Customizable', 'Strong Community Support'],
        weaknesses: ['Requires self-hosting and management', 'Safety guardrails need to be implemented by the developer'],
        useCases: [
            { title: 'AI Research', description: 'Explore new AI techniques and capabilities with an open, high-performance model.' },
            { title: 'Custom Application Development', description: 'Fine-tune and build specialized models for unique business needs.' }
        ]
    },
    {
        name: 'GPT-4o',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2L2 7V17L12 22L22 17V7L12 2ZM12 4.4L19.6 9V15L12 19.6L4.4 15V9L12 4.4Z" fill="#2DD4BF"/>
                <path d="M12 13.6L19.6 9.2L12 4.8L4.4 9.2L12 13.6Z" stroke="#2DD4BF" stroke-width="1.5"/>
            </svg>`,
        description: 'OpenAI\'s flagship model with top-tier reasoning and creativity.',
        rating: 4.9,
        isAgentic: true,
        detailedDescription: "GPT-4o ('o' for 'omni') is OpenAI's latest flagship model, designed to be natively multimodal across text, audio, and vision. It provides GPT-4-level intelligence but is much faster and improves on its capabilities across different modalities. It's known for its exceptional creativity, advanced reasoning, and broad general knowledge.",
        documentationUrl: 'https://openai.com/index/hello-gpt-4o/',
        trainingDataSize: 'Massive (proprietary)',
        strengths: ['Creativity', 'Broad Knowledge', 'Excellent Instruction Following'],
        weaknesses: ['Closed source', 'Can be expensive for large-scale use'],
        useCases: [
            { title: 'Advanced Content Creation', description: 'Draft emails, write scripts, and create marketing copy with human-like quality.' },
            { title: 'Complex Problem Solving', description: 'Tackle difficult problems in science, math, and coding with step-by-step reasoning.' }
        ]
    },
];

// --- Data for Hero.tsx (Automated Timeline) ---
export const automatedTimelineData = [
  {
    year: '1950s',
    title: 'The Dawn of AI',
    description: 'Alan Turing proposes the Turing Test, a measure of machine intelligence.',
    pauseAfter: false,
  },
  {
    year: '1997',
    title: 'Man vs. Machine',
    description: 'IBM\'s Deep Blue defeats world chess champion Garry Kasparov.',
    pauseAfter: true,
    interstitial: { title: 'Symbolic AI to Machine Learning', description: 'The focus shifts from rule-based systems to learning from data.' },
  },
  {
    year: '2012',
    title: 'The Deep Learning Boom',
    description: 'AlexNet wins the ImageNet competition, showcasing the power of deep neural networks.',
    pauseAfter: false,
  },
  {
    year: '2017',
    title: 'Attention is All You Need',
    description: 'Google researchers introduce the Transformer architecture, the foundation for modern LLMs.',
    pauseAfter: true,
    interstitial: { title: 'The Transformer Era', description: 'This architecture enables models to understand context and relationships in data like never before.' },
  },
  {
    year: 'Today',
    title: 'Generative AI Revolution',
    description: 'Models like Gemini and GPT-4o demonstrate powerful multimodal and reasoning capabilities, changing how we interact with technology.',
    pauseAfter: false,
  },
];

// --- Data for Hero.tsx (Feature Content for Automated Timeline) ---
export const featureData = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M2 9.5C2 7.83333 3.5 7 5 7H19C20.5 7 22 7.83333 22 9.5V18.5C22 20.1667 20.5 21 19 21H5C3.5 21 2 20.1667 2 18.5V9.5Z" stroke="#94A3B8" stroke-width="1.5"/><path d="M7 7V5C7 3.89543 7.89543 3 9 3H15C16.1046 3 17 3.89543 17 5V7" stroke="#94A3B8" stroke-width="1.5"/><path d="M12 11.5L12 16.5" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round"/><path d="M15.5 14H8.5" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round"/></svg>`,
    title: 'Expert Instructors',
    description: 'Learn from industry veterans who have worked at the forefront of AI development.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 2L12 5L17 2L22 5V13C22 17 18 21 12 22C6 21 2 17 2 13V5L7 2Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15L15 12L12 9L9 12L12 15Z" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    title: 'Hands-On Projects',
    description: 'Build a portfolio of real-world projects that showcase your skills to potential employers.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 21H4C2.89543 21 2 20.1046 2 19V5C2 3.89543 2.89543 3 4 3H10" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 16L22 12L17 8" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 12H22" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    title: 'Career Support',
    description: 'Get access to our network of hiring partners and receive dedicated career coaching.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18 10H21V18C21 19.1046 20.1046 20 19 20H5C3.89543 20 3 19.1046 3 18V10H6" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 15V3M12 3L8 7M12 3L16 7" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    title: 'Cutting-Edge Curriculum',
    description: 'Our curriculum is constantly updated to reflect the latest advancements in the AI industry.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#94A3B8" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12L16 14L12 17L8 14L12 12Z" stroke="#E2E8F0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`,
    title: 'Community Access',
    description: 'Join a vibrant community of fellow learners, alumni, and instructors to collaborate and grow.',
  }
];

// --- Data for Timeline.tsx ---
export const historyTimelineData = [
  { year: '1950', title: 'The Turing Test', description: 'Alan Turing proposes a test for machine intelligence, sparking the field of AI.' },
  { year: '1966', title: 'ELIZA', description: 'The first chatbot, ELIZA, is created, simulating a conversation with a psychotherapist.' },
  { year: '1997', title: 'Deep Blue', description: 'IBM\'s chess computer defeats world champion Garry Kasparov, a landmark for AI.' },
  { year: '2011', title: 'Watson on Jeopardy!', description: 'IBM Watson wins the quiz show Jeopardy!, showcasing natural language processing.' },
  { year: '2017', title: 'The Transformer', description: 'Google researchers publish "Attention Is All You Need," introducing the Transformer architecture.' },
  { year: '2020', title: 'GPT-3', description: 'OpenAI releases GPT-3, demonstrating unprecedented text generation capabilities and popularizing LLMs.' },
  { year: '2023', title: 'Multimodal Era', description: 'Models like GPT-4 and Gemini are released with the ability to understand and process both text and images.' },
];

// --- Data for Testimonials.tsx and AboutUs.tsx ---
export const testimonials = [
  {
    quote: 'AICoder didn\'t just teach me how to write prompts; it taught me how to think. The hands-on projects gave me the confidence to build my own AI-powered applications.',
    name: 'Alex Johnson',
    role: 'AI Developer, TechCorp',
  },
  {
    quote: 'The instructors are true experts who are passionate about AI and teaching. The career support was invaluable in helping me land my dream job.',
    name: 'Priya Sharma',
    role: 'Machine Learning Engineer, InnovateAI',
  },
  {
    quote: 'I went from having a basic understanding of AI to being able to fine-tune my own models. The curriculum is comprehensive and perfectly paced.',
    name: 'Ben Carter',
    role: 'Founder, Promptly Solutions',
  },
  {
    quote: 'The community at AICoder is amazing. I collaborated with talented peers on projects and built a network that has been instrumental in my career growth.',
    name: 'Maria Garcia',
    role: 'Creative Technologist, ArtGen',
  },
];

// --- Data for Academy.tsx ---
// FIX: Add explicit types to ensure `status` is not widened to `string`.
export type LearningPathStatus = 'completed' | 'current' | 'upcoming';

export interface LearningPathItem {
  id: number;
  title: string;
  description: string;
  status: LearningPathStatus;
}

export const learningPathData: LearningPathItem[] = [
  { id: 1, title: 'Module 1: Foundations of AI & LLMs', description: 'Understand the history of AI, what Large Language Models are, and how they work. Explore core concepts like tokens, embeddings, and neural networks.', status: 'completed' },
  { id: 2, title: 'Module 2: The Art of Prompt Engineering', description: 'Master the techniques for writing effective prompts, including zero-shot, few-shot, and chain-of-thought prompting. Learn to guide models to produce desired outputs.', status: 'completed' },
  { id: 3, title: 'Module 3: Advanced Prompting Techniques', description: 'Dive deeper into complex prompting strategies, system prompts, and how to structure inputs for different models like Gemini, Claude, and Llama.', status: 'current' },
  { id: 4, title: 'Module 4: Building with the Gemini API', description: 'Get hands-on experience building applications using the Gemini API. Learn about API keys, client libraries, and handling different data modalities.', status: 'upcoming' },
  { id: 5, title: 'Module 5: Fine-Tuning and Model Customization', description: 'Discover how to adapt pre-trained models to specific tasks and datasets through fine-tuning, improving performance for your unique use case.', status: 'upcoming' },
  { id: 6, title: 'Module 6: Capstone Project & Career Prep', description: 'Apply everything you\'ve learned to build a comprehensive, portfolio-worthy project. Receive resume feedback and interview coaching to launch your career in AI.', status: 'upcoming' },
];

// --- Data for Team.tsx ---
export const teamMembers = [
  { name: 'Dr. Evelyn Reed', title: 'Lead Instructor & AI Ethicist', bio: 'With a PhD in AI ethics, Evelyn ensures our curriculum is both cutting-edge and responsible.', imageUrl: 'https://picsum.photos/seed/evelyn/200' },
  { name: 'Kenji Tanaka', title: 'Senior AI Engineer', bio: 'Kenji brings a decade of experience from top tech companies, specializing in model architecture and optimization.', imageUrl: 'https://picsum.photos/seed/kenji/200' },
  { name: 'Fatima Ahmed', title: 'Curriculum Developer', bio: 'Fatima is an expert in pedagogy and prompt engineering, dedicated to creating engaging learning experiences.', imageUrl: 'https://picsum.photos/seed/fatima/200' },
  { name: 'David Chen', title: 'Career Services Lead', bio: 'David connects our graduates with our network of hiring partners, helping them navigate the AI job market.', imageUrl: 'https://picsum.photos/seed/david/200' },
];

// --- Data for Faq.tsx ---
export const faqData = [
  { question: 'Who is this academy for?', answer: 'Our academy is designed for a wide range of individuals, from developers looking to integrate AI into their applications to writers, marketers, and business professionals who want to leverage AI for productivity and creativity. We have paths for both beginners and those with some prior experience.' },
  { question: 'What are the prerequisites?', answer: 'For our foundational courses, the only prerequisite is a strong curiosity and a basic level of computer literacy. For more advanced development tracks, some programming experience (e.g., in Python or JavaScript) is recommended.' },
  { question: 'Do I get a certificate upon completion?', answer: 'Yes, upon successful completion of a learning path and its capstone project, you will receive a certificate from AICoder Academy that you can share on your professional networks and with potential employers.' },
  { question: 'How long does the program take?', answer: 'Our programs are self-paced but structured. Most students complete a full learning path in 3-6 months, dedicating about 8-10 hours per week. You have lifetime access to the course materials after enrolling.' },
  { question: 'What kind of career support do you offer?', answer: 'We offer comprehensive career support, including resume and portfolio reviews, mock interviews with industry experts, and access to our exclusive job board and network of hiring partners.' },
];

// --- Data for Stats.tsx ---
export const statsData = [
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17 20V10M12 20V4M7 20V14" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>', value: 1000, suffix: '+', label: 'Graduates' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 21V2C16 1.44772 16.4477 1 17 1H19C19.5523 1 20 1.44772 20 2V21M4 21V12C4 11.4477 4.44772 11 5 11H7C7.55228 11 8 11.4477 8 12V21M10 21V7C10 6.44772 10.4477 6 11 6H13C13.5523 6 14 6.44772 14 7V21" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>', value: 94, suffix: '%', label: 'Placement Rate' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21Z" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 12L16 14L12 17L8 14L12 12Z" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>', value: 50, suffix: '+', label: 'Hiring Partners' },
  { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 21L14 16M14 16C15.2849 14.8692 16 13.2861 16 11.5C16 7.91015 13.0899 5 9.5 5C5.91015 5 3 7.91015 3 11.5C3 15.0899 5.91015 18 9.5 18C11.2861 18 12.8692 17.2849 14 16Z" stroke="#A78BFA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>', value: 200, suffix: '+', label: 'Projects Built' },
];

// --- Data for FeaturedContent.tsx ---
export const featuredContentData = [
  {
    imageUrl: 'https://picsum.photos/seed/feat-prompt/600/400',
    category: 'Tutorial',
    title: 'Mastering Chain-of-Thought Prompting',
    description: 'Learn how to guide AI models through complex reasoning by structuring your prompts to mimic a step-by-step thought process.',
    link: '#/academy',
  },
  {
    imageUrl: 'https://picsum.photos/seed/feat-ethics/600/400',
    category: 'Article',
    title: 'The Ethical Imperative of AI Development',
    description: 'A deep dive into the ethical considerations all AI practitioners must understand, from bias in training data to the societal impact of automation.',
    link: '#/about-us',
  },
  {
    imageUrl: 'https://picsum.photos/seed/feat-case/600/400',
    category: 'Case Study',
    title: 'How We Built a Customer Service AI Agent',
    description: 'A step-by-step breakdown of how a team of our graduates developed and deployed a fully autonomous AI agent for a real-world client.',
    link: '#/team',
  },
];