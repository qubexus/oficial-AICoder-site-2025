import React from 'react';

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
                    <linearGradient id="gemini-accent" x1="18.364" y1="5.636" x2="5.636" y2="18.364" gradientUnits="userSpaceOnUse"><stop stopColor="#FBCFE8"/><stop offset="1" stopColor="#A5F3FC"/></linearGradient>
                </defs>
                <path d="M12 2L9.44 9.44 2 12l7.44 2.56L12 22l2.56-7.44L22 12l-7.44-2.56L12 2z" fill="url(#gemini-main)"/>
                <path d="M12 7l1.22 3.78L17 12l-3.78 1.22L12 17l-1.22-3.78L7 12l3.78-1.22L12 7z" fill="url(#gemini-accent)"/>
            </svg>
        `,
        description: 'A powerful, multimodal model from Google, excelling at creative tasks and complex reasoning.',
        rating: 4.5,
        detailedDescription: "Gemini is a family of multimodal large language models developed by Google AI. It comes in different sizes (Ultra, Pro, and Nano) and is designed to understand and process text, images, audio, and video seamlessly. It excels at tasks requiring complex reasoning, code generation, and creative content creation.",
        documentationUrl: "https://deepmind.google/technologies/gemini/",
        isAgentic: true,
        trainingDataSize: "Over 2 trillion tokens",
        strengths: ["Multimodality (text, image, audio, video)", "Advanced reasoning and planning", "Strong performance in coding tasks"],
        weaknesses: ["Can be computationally expensive", "Newer API, less community support than older models"],
        useCases: [
            { title: "Complex Problem Solving", description: "Analyze research papers with text and charts to summarize findings." },
            { title: "Creative Code Generation", description: "Generate a full-stack web application from a detailed natural language prompt." }
        ]
    },
    {
        name: 'ChatGPT',
        icon: `
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="chatgpt-grad-new" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#10a37f"/>
                        <stop offset="100%" stopColor="#74acfc"/>
                    </linearGradient>
                </defs>
                <path opacity="0.8" d="M20.58 7.32C21.9 10.16 20.37 13.58 17.5 15.02L12.01 18L10.33 14.88L14.73 12.5C15.8 11.9 16.14 10.58 15.54 9.51C14.93 8.44 13.61 8.1 12.54 8.7L6.87 11.72L4.02 6.9C6.86 4.19 10.87 3.23 14.28 4.71C16.51 5.67 18.91 6.13 20.58 7.32Z" fill="url(#chatgpt-grad-new)"/>
                <path d="M17.5 15.02L12.01 18L6.87 11.72C5.07 10.74 4.14 8.76 4.02 6.9C3.76 10.23 5.07 13.5 7.6 15.42C9.43 16.8 12.01 18 12.01 18L17.5 15.02Z" fill="white"/>
            </svg>
        `,
        description: 'The versatile conversational AI from OpenAI, known for its fluency and broad knowledge base.',
        rating: 4.5,
        detailedDescription: "Developed by OpenAI, ChatGPT is a highly influential large language model that popularized conversational AI. It is known for its ability to generate human-like text, answer questions, write code, and engage in creative writing. It's built upon the Generative Pre-trained Transformer (GPT) architecture.",
        documentationUrl: "https://openai.com/chatgpt",
        isAgentic: true,
        trainingDataSize: "Over 1.76 trillion parameters (GPT-4)",
        strengths: ["Excellent conversational flow", "Vast general knowledge", "Strong creative writing capabilities"],
        weaknesses: ["Knowledge cutoff (not always real-time)", "Can sometimes 'hallucinate' facts"],
        useCases: [
            { title: "Content Creation", description: "Draft blog posts, marketing copy, or scripts in various styles." },
            { title: "Interactive Tutoring", description: "Explain complex topics and answer follow-up questions in a conversational manner." }
        ]
    },
    {
        name: 'Claude',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="claude-grad-new" x1="21" y1="3" x2="3" y2="21" gradientUnits="userSpaceOnUse"><stop stopColor="#D97706"/><stop offset="1" stopColor="#F59E0B"/></linearGradient>
                </defs>
                <path d="M15 3H9C5.68629 3 3 5.68629 3 9V15C3 18.3137 5.68629 21 9 21H15C18.3137 21 21 18.3137 21 15V9C21 5.68629 18.3137 3 15 3ZM15 15H9C8.99999 15 8.99999 9 9 9H15C18.3137 9 18.3137 15 15 15Z" fill="url(#claude-grad-new)"/>
            </svg>
        `,
        description: 'Developed by Anthropic with a focus on safety and helpfulness, great for detailed conversations.',
        rating: 4,
        detailedDescription: "Claude is a family of large language models from Anthropic, designed with a strong emphasis on being helpful, harmless, and honest. It utilizes a technique called 'Constitutional AI' to align its responses with a set of ethical principles, making it particularly suitable for enterprise applications where safety and reliability are paramount.",
        documentationUrl: "https://www.anthropic.com/claude",
        isAgentic: true,
        trainingDataSize: "Proprietary, focus on curated, high-quality data",
        strengths: ["Emphasis on safety and ethics", "Large context window for long documents", "Strong at summarization and analysis"],
        weaknesses: ["More 'cautious' and may refuse certain prompts", "Slightly less creative than some competitors"],
        useCases: [
            { title: "Legal Document Analysis", description: "Summarize and analyze long contracts or legal texts for key clauses." },
            { title: "Customer Service Bot", description: "Provide helpful and safe responses in a customer-facing chatbot." }
        ]
    },
    {
        name: 'Llama',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                     <linearGradient id="llama-grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#F3E8FF"/><stop offset="1" stopColor="#D9A8FF"/></linearGradient>
                </defs>
                <path d="M12 12.5C14.4853 12.5 16.5 10.4853 16.5 8C16.5 5.51472 14.4853 3.5 12 3.5C9.51472 3.5 7.5 5.51472 7.5 8C7.5 10.4853 9.51472 12.5 12 12.5Z" fill="url(#llama-grad)"/>
                <path d="M12 22C15.3137 22 18 19.3137 18 16V15.5C18 13.567 16.433 12 14.5 12H9.5C7.567 12 6 13.567 6 15.5V16C6 19.3137 8.68629 22 12 22Z" fill="url(#llama-grad)"/>
                <ellipse cx="9.5" cy="8" rx="1" ry="1.5" fill="#A855F7"/>
                <ellipse cx="14.5" cy="8" rx="1" ry="1.5" fill="#A855F7"/>
            </svg>
        `,
        description: "Meta's open-source model, known for performance and accessibility for researchers and developers.",
        rating: 4,
        detailedDescription: "Llama (Large Language Model Meta AI) is a family of open-source large language models released by Meta AI. By making its models accessible to the research community, Meta aims to spur innovation and development in the field of AI. Llama models are known for their strong performance relative to their size.",
        documentationUrl: "https://ai.meta.com/llama/",
        isAgentic: true,
        trainingDataSize: "Up to 70 billion parameters (Llama 2)",
        strengths: ["Open-source, allows for fine-tuning", "Strong performance for its size", "Active research community"],
        weaknesses: ["Requires technical expertise to set up and run", "Less polished than commercial offerings out-of-the-box"],
        useCases: [
            { title: "Research and Experimentation", description: "Researchers can build upon the open model to explore new AI techniques." },
            { title: "On-Premise Solutions", description: "Companies can deploy a powerful model locally for data privacy." }
        ]
    },
    {
        name: 'DALL·E',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="dalle-grad1" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#FB923C"/><stop offset="1" stopColor="#F472B6"/></linearGradient>
                    <linearGradient id="dalle-grad2" x1="22" y1="2" x2="2" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#60A5FA"/><stop offset="1" stopColor="#34D399"/></linearGradient>
                </defs>
                <circle cx="12" cy="12" r="10" fill="url(#dalle-grad1)" />
                <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4V20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" fill="url(#dalle-grad2)" fill-opacity="0.7"/>
            </svg>
        `,
        description: "OpenAI's pioneering model for generating creative and realistic images from text prompts.",
        rating: 4.5,
        detailedDescription: "DALL·E is a series of text-to-image models from OpenAI. It can generate highly detailed and creative images from natural language descriptions. DALL·E has been a key driver in the popularization of AI image generation, enabling users to create novel artwork and photorealistic scenes with simple prompts.",
        documentationUrl: "https://openai.com/dall-e-3",
        trainingDataSize: "Billions of text-image pairs",
        strengths: ["High-quality, photorealistic image generation", "Creative and artistic outputs", "Integration with ChatGPT Plus"],
        weaknesses: ["Can struggle with complex text in images", "Usage can be subject to content filters"],
        useCases: [
            { title: "Art & Design", description: "Create unique illustrations, concept art, or design mockups from text." },
            { title: "Marketing Visuals", description: "Generate custom images for social media posts or advertising campaigns." }
        ]
    },
    {
        name: 'Copilot',
        icon: `
             <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="copilot-grad-new" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#38BDF8"/><stop offset="1" stopColor="#A78BFA"/></linearGradient>
                    <linearGradient id="copilot-grad-accent" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#F472B6"/><stop offset="1" stopColor="#FBBF24"/></linearGradient>
                </defs>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="url(#copilot-grad-new)"/>
                <path d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z" fill="url(#copilot-grad-accent)" fill-opacity="0.8"/>
                <path d="M12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z" fill="white"/>
            </svg>
        `,
        description: "Microsoft's AI companion integrated into its ecosystem, boosting productivity in coding and office tasks.",
        rating: 4,
        detailedDescription: "GitHub Copilot, powered by OpenAI's Codex, is an AI pair programmer that provides autocompletions, suggestions, and entire code blocks directly within your editor. It's trained on a massive dataset of public code and is designed to significantly speed up the development process by reducing boilerplate and helping solve coding challenges.",
        documentationUrl: "https://github.com/features/copilot",
        isAgentic: true,
        trainingDataSize: "Trained on billions of lines of public code",
        strengths: ["Deep integration into IDEs (like VS Code)", "Context-aware code suggestions", "Speeds up development significantly"],
        weaknesses: ["Suggestions can sometimes be non-optimal or contain subtle bugs", "Relies on the context of existing code"],
        useCases: [
            { title: "Code Autocompletion", description: "Get entire functions or blocks of code suggested as you type." },
            { title: "Learning New Languages", description: "See idiomatic ways to write code in an unfamiliar programming language." }
        ]
    },
    {
        name: 'Grok',
        icon: `
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="grok-grad-new" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"><stop stopColor="#1D4ED8"/><stop offset="1" stopColor="#6D28D9"/></linearGradient>
                </defs>
                <path d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12Z" fill="url(#grok-grad-new)"/>
                <path d="M16 8L8 16" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M16 16H15C13.3431 16 12 14.6569 12 13V12C12 10.3431 10.6569 9 9 9H8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
        `,
        description: 'An AI from xAI with a rebellious streak, designed to answer spicy questions with a bit of wit.',
        rating: 3.5,
        detailedDescription: "Grok is a conversational AI developed by xAI, designed to have a sense of humor and a rebellious streak. It's integrated with the X (formerly Twitter) platform, giving it real-time access to information. Grok aims to provide answers to questions that other AI systems might avoid, often with a witty or unconventional tone.",
        documentationUrl: "https://grok.x.ai/",
        isAgentic: true,
        trainingDataSize: "33 billion parameters, with real-time access to X",
        strengths: ["Real-time knowledge from social media", "Humorous and less filtered personality", "Can handle controversial topics"],
        weaknesses: ["Less formal and may not be suitable for professional tasks", "Newer and less tested than other models"],
        useCases: [
            { title: "Real-time Information Retrieval", description: "Ask about breaking news or public sentiment on a current event." },
            { title: "Entertainment & Brainstorming", description: "Generate witty responses or creative ideas with a unique flavor." }
        ]
    },
];

// --- Data for Hero.tsx ---

export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  imageUrl: string;
  fullArticle: string;
  creationDate: string;
}

export const defaultNewsData: NewsItem[] = [
  {
    id: 1,
    title: "The Evolution from AI Models to Autonomous Agents",
    summary: "AI is transforming from passive tools into proactive, autonomous agents that anticipate needs and solve entire problems.",
    imageUrl: "https://picsum.photos/seed/news1/400/400",
    creationDate: "2024-07-15T10:00:00Z",
    fullArticle: `Artificial intelligence is undergoing a truly exciting transformation. In the past, AI tools acted like simple calculators: they waited for a specific command and then executed it. Think of old chatbots or smart assistants—they only did something when you told them to. But lately, AI is entering a new phase, where it acts not just as a tool, but more like a proactive digital assistant that tries to anticipate your needs and solve entire problems, not just single tasks.

From Passive Tools to Autonomous Agents

Until recently, most AI solutions would only work when asked: answering questions, drafting emails, or finding information, but all triggered by you. The next step is AI "agents" — systems that can decide for themselves when and how to act. They watch what’s happening, analyze your goals, and step in to help even before you ask. It’s a huge change, moving beyond just following orders to truly collaborating with you.`
  },
  {
    id: 2,
    title: "Beyond Words: How AI is Growing Senses to Perceive Our World",
    summary: "The next frontier in AI is multimodality—teaching machines to see, hear, and read simultaneously to understand context like never before.",
    imageUrl: "https://picsum.photos/seed/news2/400/400",
    creationDate: "2024-07-18T14:30:00Z",
    fullArticle: `For years, we’veknown Artificial Intelligence as a specialist. One AI could master language, becoming a brilliant writer or a flawless translator. Another could master vision, identifying objects in photos with superhuman accuracy. A third could master sound, transcribing speech or composing music. They were powerful, but they lived in separate, silent worlds. An AI that could write a poem about a sunset couldn't actually see one.

That era is ending. The next frontier in artificial intelligence isn’t just about making AI smarter, but about making it more perceptive. Welcome to the world of Multimodal AI, a groundbreaking evolution that is teaching machines to see, hear, and read—all at the same time. It’s an AI that doesn’t just process information; it experiences it in a way that is profoundly closer to our own.`
  },
  {
    id: 3,
    title: "The Ethical Debate Around Proactive AI Assistants",
    summary: "As AI agents become more proactive, discussions around privacy, consent, and decision-making authority are intensifying.",
    imageUrl: "https://picsum.photos/seed/news3/400/400",
    creationDate: "2024-07-12T09:00:00Z",
    fullArticle: "The concept of an AI agent that anticipates your needs and acts on your behalf is compelling, but it also raises significant ethical questions. Where is the line between a helpful assistant and an intrusive overseer? Tech companies and ethicists are grappling with how to design these systems to respect user autonomy and privacy.\n\nKey concerns include data privacy, as these agents require deep access to personal information to be effective, and the potential for biased decision-making based on the data they are trained on. Establishing clear guidelines for transparency and user control is crucial to building trust and ensuring these powerful tools are used responsibly."
  },
  {
    id: 4,
    title: "AI Agents in Scientific Research: A New Era of Discovery",
    summary: "Scientists are now deploying AI agents to analyze massive datasets, formulate hypotheses, and even design experiments.",
    imageUrl: "https://picsum.photos/seed/news4/400/400",
    creationDate: "2024-07-20T11:00:00Z",
    fullArticle: "In the world of scientific research, the sheer volume of data being generated can be overwhelming for human researchers to analyze. AI agents are stepping in to accelerate the pace of discovery, capable of sifting through petabytes of data to identify patterns and correlations that might otherwise be missed.\n\nThese agents are not just data crunchers; they are becoming collaborative partners in the scientific process. Some advanced systems can formulate novel hypotheses based on existing literature and then propose experiments to test them. This is dramatically speeding up research cycles in fields like drug discovery, materials science, and climate modeling."
  },
  {
    id: 5,
    title: "Personalized Education Powered by AI Learning Agents",
    summary: "AI-driven tutoring agents are creating adaptive learning paths tailored to each student's individual pace and style.",
    imageUrl: "https://picsum.photos/seed/news5/400/400",
    creationDate: "2024-06-30T16:00:00Z",
    fullArticle: "The one-size-fits-all model of education is being challenged by the advent of personalized AI learning agents. These sophisticated tutors can assess a student's strengths and weaknesses in real-time, providing customized exercises, explanations, and encouragement to help them master new concepts.\n\nUnlike static educational software, these agents create a dynamic and interactive learning experience. If a student is struggling with a particular topic, the agent can offer alternative explanations or break the problem down into simpler parts."
  },
  {
    id: 6,
    title: 'AI in Education: Revolutionizing Learning Experiences',
    summary: 'Examines how AI is personalizing education, automating administrative tasks, and creating new learning opportunities.',
    imageUrl: 'https://picsum.photos/seed/news6/400/400',
    creationDate: "2024-07-05T18:00:00Z",
    fullArticle: `Artificial Intelligence is poised to transform the educational landscape. AI-powered tools can personalize learning paths for individual students, adapting to their unique pace and style. This adaptive learning approach can help students master complex subjects more effectively by providing targeted support where they need it most.

Beyond personalized instruction, AI is also streamlining administrative tasks for educators. Automated grading systems, intelligent scheduling tools, and AI assistants can free up teachers' time, allowing them to focus more on student interaction and pedagogical development.`
  }
];

export const automatedTimelineData = [
    {
        year: '1950',
        title: 'The Turing Test',
        description: 'Alan Turing proposes a test for machine intelligence, a pivotal moment in AI history.',
        pauseAfter: false,
    },
    {
        year: '1956',
        title: 'The Birth of AI',
        description: 'The term "Artificial Intelligence" is coined at the Dartmouth Conference, marking the official start of the field.',
        pauseAfter: true,
        interstitial: {
            title: "Foundations Laid",
            description: "Early pioneers established the theoretical groundwork for machines that could 'think', setting the stage for decades of innovation."
        }
    },
    {
        year: '1997',
        title: 'Deep Blue vs. Kasparov',
        description: "IBM's chess computer, Deep Blue, defeats world champion Garry Kasparov, showcasing AI's strategic power.",
        pauseAfter: false,
    },
    {
        year: '2011',
        title: 'Watson Wins Jeopardy!',
        description: "IBM's Watson competes and wins on the quiz show Jeopardy!, demonstrating natural language processing capabilities.",
        pauseAfter: true,
        interstitial: {
            title: "AI in the Public Eye",
            description: "AI's ability to understand and process human language at a superhuman level captured the world's imagination."
        }
    },
    {
        year: '2016',
        title: "AlphaGo's Victory",
        description: "Google DeepMind's AlphaGo defeats Go champion Lee Sedol, a major breakthrough in complex game-playing AI.",
        pauseAfter: false,
    },
    {
        year: '2022',
        title: 'The Rise of Generative AI',
        description: 'Large-scale generative models like ChatGPT and DALL-E 2 become widely accessible, transforming creativity and interaction.',
        pauseAfter: true,
        interstitial: {
            title: "The Generative Revolution",
            description: "AI transitions from analysis to creation, generating text, images, and code that is often indistinguishable from human work."
        }
    },
];

export const featureData = [
    {
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        `,
        title: 'Expert Instructors',
        description: 'Learn from industry veterans who have real-world experience in AI and prompt engineering.',
    },
    {
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        `,
        title: 'Hands-on Projects',
        description: 'Apply your knowledge with practical projects that build a strong portfolio and deepen your understanding.',
    },
    {
        icon: `
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
            </svg>
        `,
        title: 'Career Support',
        description: 'Get guidance on resume building, interview preparation, and job placement to launch your career in AI.',
    },
    {
        icon: `
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
        `,
        title: 'Cutting-Edge Curriculum',
        description: 'Our curriculum is constantly updated to reflect the latest advancements and techniques in the AI industry.',
    }
];

// --- Data for FeaturedContent.tsx ---
export interface FeaturedItem {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

export const featuredContentData: FeaturedItem[] = [
  {
    category: "Deep Dive",
    title: "Understanding Transformer Architectures",
    description: "Go beyond the surface and explore the self-attention mechanisms that power modern LLMs like Gemini and ChatGPT.",
    imageUrl: "https://picsum.photos/seed/transformers/600/400",
    link: "#/academy",
  },
  {
    category: "Tutorial",
    title: "Building Your First AI Agent",
    description: "A step-by-step guide to creating a simple, autonomous agent using open-source libraries and models.",
    imageUrl: "https://picsum.photos/seed/agent-tutorial/600/400",
    link: "#/academy",
  },
  {
    category: "Case Study",
    title: "AI in Creative Writing: A Collaboration",
    description: "See how we partnered with an author to use generative AI for world-building, character development, and overcoming writer's block.",
    imageUrl: "https://picsum.photos/seed/creative-writing/600/400",
    link: "#/about-us",
  },
];


// --- Data for Timeline.tsx ---
export const historyTimelineData = [
    {
        year: '1950',
        title: 'The Turing Test',
        description: 'Alan Turing proposes a test for machine intelligence, a pivotal moment in AI history.',
    },
    {
        year: '1956',
        title: 'The Birth of AI',
        description: 'The term "Artificial Intelligence" is coined at the Dartmouth Conference, marking the official start of the field.',
    },
    {
        year: '1997',
        title: 'Deep Blue vs. Kasparov',
        description: "IBM's chess computer, Deep Blue, defeats world champion Garry Kasparov, showcasing AI's strategic power.",
    },
    {
        year: '2011',
        title: 'Watson Wins Jeopardy!',
        description: "IBM's Watson competes and wins on the quiz show Jeopardy!, demonstrating natural language processing capabilities.",
    },
    {
        year: '2016',
        title: "AlphaGo's Victory",
        description: "Google DeepMind's AlphaGo defeats Go champion Lee Sedol, a major breakthrough in complex game-playing AI.",
    },
    {
        year: '2022',
        title: 'The Rise of Generative AI',
        description: 'Large-scale generative models like ChatGPT and DALL-E 2 become widely accessible, transforming creativity and interaction.',
    },
];

// --- Data for Stats.tsx ---
export const statsData = [
    {
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
        `,
        value: 1200,
        suffix: '+',
        label: 'Happy Students',
    },
    {
        icon: `
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
            </svg>
        `,
        value: 500,
        suffix: '+',
        label: 'Projects Completed',
    },
    {
        icon: `
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <path d="M12 2.5a.5.5 0 0 0-1 0V5a.5.5 0 0 0 1 0zM7.05 7.05a.5.5 0 0 0-.707.707L8 9.363a.5.5 0 0 0 .707-.707zM5 11.5a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 0-1zM7.05 16.95a.5.5 0 0 0 .707.707L9.363 16a.5.5 0 0 0-.707-.707zM11.5 19a.5.5 0 0 0 1 0v-2.5a.5.5 0 0 0-1 0zM16 14.637a.5.5 0 0 0 .707.707l1.606-1.607a.5.5 0 0 0-.707-.707zM19 11.5a.5.5 0 0 0 0 1h2.5a.5.5 0 0 0 0-1zM16.95 7.05a.5.5 0 0 0 .707-.707L16 4.737a.5.5 0 0 0-.707.707z"/><path d="M12 6.5A5.5 5.5 0 1 0 17.5 12 5.5 5.5 0 0 0 12 6.5zm0 9A3.5 3.5 0 1 1 15.5 12 3.5 3.5 0 0 1 12 15.5z"/>
            </svg>
        `,
        value: 7,
        suffix: '',
        label: 'AI Models Featured',
    },
    {
        icon: `
             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-8 h-8 text-[#94A3B8]">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 1.7.9 3.2 2.3 4.1"/>
            </svg>
        `,
        value: 25,
        suffix: '+',
        label: 'Expert Instructors',
    }
];

// --- Data for AboutUs.tsx ---
export const testimonials = [
  {
    quote: "The hands-on projects were a game-changer. I went from having a basic understanding of AI to building and deploying my own models. Landed a job as an AI Engineer at TechCorp within a month of graduating!",
    name: "Alex Johnson",
    role: "AI Engineer at TechCorp"
  },
  {
    quote: "AICoder's focus on prompt engineering is unparalleled. The instructors are experts who know how to make complex topics easy to understand. This course directly led to my promotion and a new-found confidence in my skills.",
    name: "Samantha Lee",
    role: "Senior Machine Learning Specialist"
  },
];

// --- Data for Team.tsx ---
export const teamMembers = [
  {
    name: 'Piotr "JayJay" Piasecki',
    title: 'Founder & AI Visionary',
    bio: "Piotr is the driving force behind our mission. With a passion for responsible AI development, he sets the company's strategic vision and inspires the team to push the boundaries of generative technology.",
    imageUrl: 'https://raw.githubusercontent.com/qubexus/Galeria-grafik/main/1757379164090.jpg',
  },
  {
    name: 'Dr. Evelyn Reed',
    title: 'Founder & Lead AI Ethicist',
    bio: 'With a Ph.D. in Computational Linguistics, Evelyn guides our curriculum with a focus on responsible AI development.',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=75&w=400&auto=format&fit=crop&fm=webp',
  },
  {
    name: 'Marcus Chen',
    title: 'Head of Engineering & Instruction',
    bio: 'A former senior AI engineer at a top tech firm, Marcus specializes in large-scale model deployment and practical application.',
    imageUrl: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=75&w=400&auto=format&fit=crop&fm=webp',
  },
  {
    name: 'Jasmine Patel',
    title: 'Creative AI Specialist',
    bio: 'Jasmine explores the intersection of art and AI, teaching students how to leverage generative models for creative projects.',
    imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=75&w=400&auto=format&fit=crop&fm=webp',
  },
   {
    name: 'Leo Martinez',
    title: 'Student Success & Career Coach',
    bio: 'Leo is dedicated to helping our graduates navigate the job market and launch successful careers in the AI industry.',
    imageUrl: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=75&w=400&auto=format&fit=crop&fm=webp',
  }
];

// --- Data for Faq.tsx ---
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqData: FaqItem[] = [
  {
    question: "What exactly is prompt engineering?",
    answer: "Prompt engineering is the art and science of designing effective inputs (prompts) for AI models, like large language models (LLMs), to get desired outputs. It involves understanding how a model thinks, structuring questions clearly, and refining prompts to improve the accuracy, relevance, and quality of the AI's response. It's like learning how to have a productive conversation with an AI.",
  },
  {
    question: "Why has prompt engineering become so important?",
    answer: "As AI models become more powerful and integrated into various fields, the ability to communicate with them effectively is crucial. Good prompt engineering unlocks the full potential of these models, turning them from a novelty into a powerful tool for creativity, problem-solving, and automation. It's the key skill for leveraging the current generation of AI.",
  },
  {
    question: "Do I need programming experience to join the academy?",
    answer: "While some of our advanced tracks delve into coding and API integration, our foundational courses are designed for everyone, regardless of technical background. We believe prompt engineering is a fundamental skill for writers, marketers, designers, and business professionals, not just developers. We start with the basics of clear communication and logical structuring.",
  },
  {
    question: "What makes AICoder Academy different from other online courses?",
    answer: "Our academy focuses on a project-based learning approach. You won't just learn theory; you'll build a portfolio of real-world projects. We emphasize hands-on experience with a variety of leading AI models and provide career support to help you transition your new skills into the job market. Our curriculum is also constantly updated to keep pace with the fast-moving AI industry.",
  },
  {
    question: "What kind of career opportunities can prompt engineering skills open up?",
    answer: "Prompt engineering is a rapidly growing field with diverse opportunities. Graduates can pursue roles such as AI Content Creator, Prompt Engineer, AI Product Manager, AI Consultant, or specialize in using AI for specific domains like marketing, game design, or scientific research. It's also a valuable skill that enhances many existing roles, making you a more effective and efficient professional in your current field.",
  }
];

// --- Data for Academy.tsx Learning Path ---
export interface LearningPathItem {
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'current' | 'upcoming';
}

export const learningPathData: LearningPathItem[] = [
  {
    id: 1,
    title: "Module 1: Foundations of AI & LLMs",
    description: "Understand the history of AI, what Large Language Models are, and the core concepts behind how they work.",
    status: 'completed',
  },
  {
    id: 2,
    title: "Module 2: Core Prompt Engineering",
    description: "Learn the art of crafting effective prompts, including techniques like zero-shot, few-shot, and chain-of-thought prompting.",
    status: 'completed',
  },
  {
    id: 3,
    title: "Module 3: Advanced Techniques & Model Behavior",
    description: "Dive deeper into controlling AI output, understanding model limitations, and advanced strategies for complex problem-solving.",
    status: 'current',
  },
  {
    id: 4,
    title: "Module 4: Building with APIs & AI Agents",
    description: "Integrate AI models into your own applications using APIs. Learn the principles of creating autonomous AI agents.",
    status: 'upcoming',
  },
  {
    id: 5,
    title: "Module 5: Capstone Project",
    description: "Apply all your skills to build a significant, portfolio-worthy project from scratch with mentorship from our instructors.",
    status: 'upcoming',
  }
];