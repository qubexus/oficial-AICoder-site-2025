export interface BlogPostAuthor {
    name: string;
    imageUrl: string;
    title: string;
    bio: string;
    twitterUrl?: string;
    linkedinUrl?: string;
}

export interface BlogPostItem {
  id: number;
  slug: string;
  title: string;
  summary: string;
  fullArticle: string;
  imageUrl: string;
  publicationDate: string;
  category: string;
  author: BlogPostAuthor;
}

const authors: Record<string, BlogPostAuthor> = {
    evelyn: {
        name: 'Dr. Evelyn Reed',
        imageUrl: 'https://picsum.photos/seed/evelyn/100',
        title: 'Lead Instructor & AI Ethicist',
        bio: 'With a PhD in AI ethics, Evelyn ensures our curriculum is both cutting-edge and responsible. She is passionate about shaping a future where AI serves humanity.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    kenji: {
        name: 'Kenji Tanaka',
        imageUrl: 'https://picsum.photos/seed/kenji/100',
        title: 'Senior AI Engineer',
        bio: 'Kenji brings a decade of experience from top tech companies, specializing in model architecture and optimization. He loves demystifying complex technical topics.',
        twitterUrl: '#',
        linkedinUrl: '#',
    },
    fatima: {
        name: 'Fatima Ahmed',
        imageUrl: 'https://picsum.photos/seed/fatima/100',
        title: 'Curriculum Developer',
        bio: 'Fatima is an expert in pedagogy and prompt engineering, dedicated to creating engaging and effective learning experiences that empower students.',
        linkedinUrl: '#',
    }
}

export const blogData: BlogPostItem[] = [
  {
    id: 1,
    slug: 'the-rise-of-agentic-ai',
    title: 'The Rise of Agentic AI: A New Paradigm',
    summary: 'AI models are evolving from simple tools to autonomous agents that can reason, plan, and execute tasks.',
    fullArticle: `The latest breakthrough in artificial intelligence is the development of "agentic" AI systems. Unlike previous models that required explicit, step-by-step instructions, these new agents can understand high-level goals and independently devise and execute a plan to achieve them.
    
This paradigm shift is powered by advancements in reasoning, memory, and tool use. An AI agent can now browse the web, write and debug code, and interact with other software to complete complex tasks. For example, a user could ask an agent to "plan a vacation to Tokyo for next spring for a family of four on a $5000 budget," and the agent would research flights, accommodations, and activities, presenting a full itinerary.
    
This development opens up incredible possibilities for productivity and automation but also raises important questions about control, safety, and the future of work. Researchers are actively working on building robust guardrails to ensure these powerful systems are aligned with human values. At AICoder, we delve deep into the mechanics and ethics of these systems in our advanced modules.`,
    imageUrl: 'https://picsum.photos/seed/ai-agent/800/600',
    publicationDate: '2024-05-20T10:00:00Z',
    category: 'Industry Insights',
    author: authors.kenji,
  },
  {
    id: 5,
    slug: 'prompt-engineering-the-new-essential-skill',
    title: 'Prompt Engineering: The New Essential Skill',
    summary: 'As AI becomes more integrated into our tools, knowing how to communicate effectively with models is a critical skill for the modern workforce.',
    fullArticle: `Prompt engineering is the art and science of crafting effective inputs to guide AI models toward desired outputs. It's a blend of logic, creativity, and linguistic precision. A well-crafted prompt can be the difference between a generic, unhelpful response and a nuanced, insightful, and perfectly formatted result.
    
This skill is becoming increasingly valuable across all industries. Marketers use it to generate creative copy, developers use it to scaffold code, and researchers use it to analyze data. As large language models become the new user interface for complex software, the ability to "speak AI" will be as fundamental as using a search engine is today.
    
Mastering prompt engineering involves understanding the model's architecture, using techniques like chain-of-thought and few-shot prompting, and iteratively refining your inputs. It's a discipline that requires both technical understanding and a deep appreciation for the subtleties of language. Our academy's curriculum is built around mastering this essential skill, starting from the very first module.`,
    imageUrl: 'https://picsum.photos/seed/prompt-eng/800/600',
    publicationDate: '2024-05-21T09:00:00Z',
    category: 'Tutorials',
    author: authors.fatima,
  },
  {
    id: 2,
    slug: 'open-source-vs-closed-source-ai-debate',
    title: 'Open Source vs. Closed Source: The Great AI Debate',
    summary: 'Meta\'s Llama 3 and Google\'s Gemini are at the forefront of a debate shaping the future of AI development and access.',
    fullArticle: `The AI community is currently in the midst of a foundational debate: should the most powerful AI models be open source or proprietary?
    
On one side, companies like Meta with their Llama 3 model champion the open-source approach. They argue that making models freely available accelerates innovation, enhances safety through public scrutiny, and democratizes access to powerful technology.
    
On the other side, organizations like OpenAI (with GPT-4) and Google (with Gemini) keep their model architectures and weights closed. They contend that this is necessary for safety, allowing them to control how the technology is used and prevent misuse. It also protects their significant commercial investment in research and development.
    
There is no easy answer, and the future will likely involve a mix of both approaches. The outcome of this debate will have profound implications for competition, research, and how the benefits of AI are distributed across society.`,
    imageUrl: 'https://picsum.photos/seed/ai-debate/800/600',
    publicationDate: '2024-05-18T14:30:00Z',
    category: 'Industry Insights',
    author: authors.evelyn,
  },
  {
    id: 3,
    slug: 'multimodality-explained',
    title: 'Multimodality Explained: How AI Understands Our World',
    summary: 'The ability to process text, images, and audio simultaneously is making AI more intuitive and powerful than ever before.',
    fullArticle: `One of the most exciting frontiers in AI is multimodality—the ability for a single model to understand and reason about different types of data, or "modalities," like text, images, audio, and video.
    
Models like Google's Gemini and OpenAI's GPT-4o are natively multimodal. This means you can show them a picture and ask questions about it, have them describe a video, or even talk to them in a natural, conversational way. They can, for instance, look at a chart and provide a text summary, or listen to a person's tone of voice to better understand their intent.
    
This leap forward makes human-computer interaction more natural and opens up new applications in fields like education, accessibility, and robotics. As these models become more adept at interpreting our complex, multimodal world, they will become even more integrated into our daily lives.`,
    imageUrl: 'https://picsum.photos/seed/multimodal/800/600',
    publicationDate: '2024-05-15T09:00:00Z',
    category: 'Core Concepts',
    author: authors.fatima,
  },
    {
    id: 4,
    slug: 'ai-in-healthcare-diagnostics',
    title: 'AI in Healthcare: The Diagnostic Revolution',
    summary: 'AI algorithms are now capable of detecting diseases from medical scans with accuracy rivaling, and sometimes exceeding, human experts.',
    fullArticle: `Artificial intelligence is poised to revolutionize the healthcare industry, particularly in the field of diagnostics. Machine learning models, trained on vast datasets of medical images like X-rays, CT scans, and MRIs, are becoming incredibly adept at identifying early signs of diseases such as cancer, diabetic retinopathy, and heart conditions.

These AI tools are not meant to replace doctors but to act as a powerful assistant, flagging potential issues that a human might miss and reducing the workload on radiologists. By providing a "second opinion," AI can help improve diagnostic accuracy, lead to earlier treatment, and ultimately save lives.
    
The challenge now lies in regulatory approval, integration into existing hospital workflows, and ensuring the privacy and security of patient data. However, the potential for AI to make healthcare more efficient and effective is undeniable. This is a key area where ethical AI development, a cornerstone of our curriculum, is paramount.`,
    imageUrl: 'https://picsum.photos/seed/ai-health/800/600',
    publicationDate: '2024-05-12T11:00:00Z',
    category: 'Use Cases',
    author: authors.evelyn,
  },
  {
    id: 6,
    slug: 'the-computing-power-behind-generative-ai',
    title: 'The Computing Power Behind Generative AI',
    summary: 'The demand for massive-scale computation is driving a new wave of innovation in chip design and data center architecture.',
    fullArticle: `The incredible capabilities of models like GPT-4o and Gemini are built on a foundation of immense computational power. Training these models requires thousands of specialized GPUs running for months, consuming megawatts of power and costing hundreds of millions of dollars.
    
This insatiable demand is fueling a hardware revolution. Companies like NVIDIA, Google, and a host of startups are in an arms race to develop more powerful and efficient chips (GPUs, TPUs, NPUs) specifically designed for AI workloads. Data centers are being redesigned to handle the immense heat and power requirements of these AI supercomputers.
    
The future of AI progress is inextricably linked to our ability to continue scaling this computational infrastructure. Innovations in chip efficiency, interconnects, and cooling technology will be just as important as algorithmic breakthroughs in unlocking the next generation of artificial intelligence.`,
    imageUrl: 'https://picsum.photos/seed/ai-compute/800/600',
    publicationDate: '2024-05-10T16:00:00Z',
    category: 'Core Concepts',
    author: authors.kenji,
  }
];