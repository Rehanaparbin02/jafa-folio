// articles-data.ts - Place this in your app folder or a /data folder

export interface ArticleBlock {
    type: "h2" | "p" | "quote" | "image";
    text?: string;
    src?: string;
    caption?: string;
}

export interface Article {
    slug: string;
    title: string;
    description: string;
    date: string;
    readTime: string;
    category: string;
    image: string;
    featured?: boolean; // For main/hero articles
    layout: "large" | "medium" | "small"; // Auto-layout control
    content: ArticleBlock[];
}

export const ARTICLES: Article[] = [
    {
        slug: "network-intrusion",
        title: "Network Intrusion",
        description: "Advanced strategies for perimeter defense against sophisticated state-sponsored actors.",
        date: "Oct 24, 2024",
        readTime: "12 min read",
        category: "Security Research",
        image: "/assets/articles/security_research.png",
        featured: true,
        layout: "large", // Takes 2x2 grid space
        content: [
            {
                type: "h2",
                text: "The Evolving Landscape of Network Security"
            },
            {
                type: "p",
                text: "In an era where perimeter-less architectures are becoming the norm, the concept of network intrusion defense has undergone a radical transformation."
            },
            {
                type: "image",
                src: "/assets/articles/security_research.png",
                caption: "Visualization of a multi-vector intrusion attempt."
            },
            {
                type: "p",
                text: "Sophisticated attackers now use a combination of social engineering, zero-day vulnerabilities, and lateral movement to bypass traditional security measures."
            },
            {
                type: "h2",
                text: "Implementing Zero-Trust Architecture"
            },
            {
                type: "p",
                text: "The first step in modern perimeter defense is moving away from the 'castle and moat' mentality."
            },
            {
                type: "quote",
                text: "Security is not a product, but a process. It requires constant vigilance and adaptation to new threats as they emerge."
            }
        ]
    },
    {
        slug: "vulnerability-database",
        title: "Vulnerability Database",
        description: "A deep dive into how zero-day markets operate and the economics of vulnerability disclosure.",
        date: "Oct 20, 2024",
        readTime: "8 min read",
        category: "Intelligence",
        image: "/assets/articles/vulnerability_db.png",
        layout: "small", // Takes 1x1 grid space
        content: [
            {
                type: "h2",
                text: "The Economics of Zero-Days"
            },
            {
                type: "p",
                text: "The market for vulnerabilities has grown into a multi-billion dollar industry."
            }
        ]
    },
    {
        slug: "crypto-arch",
        title: "Cryptographic Architectures",
        description: "How post-quantum algorithms and hardware-backed security are shaping the future of digital trust.",
        date: "Oct 28, 2024",
        readTime: "10 min read",
        category: "Cryptography",
        image: "/assets/articles/vulnerability_db.png",
        layout: "small",
        content: [
            {
                type: "h2",
                text: "The Post-Quantum Era"
            },
            {
                type: "p",
                text: "As quantum computing capabilities advance, traditional asymmetric encryption faces an existential threat."
            }
        ]
    },
    {
        slug: "deep-dive-lab",
        title: "Deep Dive Lab",
        description: "Unmasking the most complex exploits in the wild.",
        date: "Oct 15, 2024",
        readTime: "15 min read",
        category: "Lab Analysis",
        image: "/assets/articles/deep_dive.png",
        layout: "medium", // Takes 2x1 grid space
        content: [
            {
                type: "h2",
                text: "Below the OS: The Final Frontier"
            },
            {
                type: "p",
                text: "Rootkits that reside in the firmware are the ultimate stealth weapons."
            }
        ]
    },

    {
        slug: "your-article-slug",
        title: "Your Article Title",
        description: "Short description of your article",
        date: "Jan 23, 2026",
        readTime: "5 min read",
        category: "Your Category",
        image: "/assets/articles/image.png",
        layout: "medium", // Choose: "small" (1x1), "medium" (2x1), or "large" (2x2)
        featured: false, // Set to true for badge indicator
        content: [
            {
                type: "h2",
                text: "Your Heading"
            },
            {
                type: "p",
                text: "Your paragraph content here."
            },
            {
                type: "quote",
                text: "Your inspirational quote here."
            },
            {
                type: "image",
                src: "/assets/articles/image.png",
                caption: "Image caption"
            }
        ]
    },

    // ✨ NEW ARTICLE - AI-Powered Threat Detection
    {
        slug: "ai-threat-detection",
        title: "AI-Powered Threat Detection",
        description: "How machine learning is revolutionizing real-time threat identification and response in modern security operations.",
        date: "Jan 23, 2026",
        readTime: "9 min read",
        category: "AI Security",
        image: "/assets/articles/vulnerability.png",
        layout: "medium",
        featured: true,
        content: [
            // INTRO SECTION
            {
                type: "h2",
                text: "The Rise of Intelligent Defense Systems"
            },
            {
                type: "p",
                text: "Traditional signature-based detection systems are no longer sufficient in today's threat landscape. Attackers employ polymorphic malware, zero-day exploits, and advanced evasion techniques that render static defenses obsolete. This is where artificial intelligence steps in as a game-changer."
            },
            {
                type: "p",
                text: "Modern AI-powered security systems analyze millions of data points per second, identifying anomalies and attack patterns that would be impossible for human analysts to detect in real-time. These systems learn from every incident, continuously improving their detection accuracy."
            },

            // TECHNICAL DEEP DIVE
            {
                type: "h2",
                text: "Machine Learning Models in Action"
            },
            {
                type: "p",
                text: "At the core of AI threat detection are sophisticated machine learning models trained on vast datasets of normal and malicious behavior. These models employ techniques like supervised learning for known threat classification, unsupervised learning for anomaly detection, and reinforcement learning for adaptive response strategies."
            },
            {
                type: "p",
                text: "Neural networks, particularly deep learning architectures like CNNs for malware image analysis and RNNs for sequential behavior detection, have shown remarkable success. These models can identify zero-day threats by recognizing subtle patterns that deviate from established baselines."
            },

            // VISUAL BREAK
            {
                type: "image",
                src: "/assets/articles/deep_dive.png",
                caption: "Neural network architecture for real-time threat classification"
            },

            // INSPIRATIONAL QUOTE
            {
                type: "quote",
                text: "The future of cybersecurity isn't about building higher walls—it's about creating intelligent systems that think faster than attackers."
            },

            // CHALLENGES SECTION
            {
                type: "h2",
                text: "Real-World Implementation Challenges"
            },
            {
                type: "p",
                text: "Despite the promise, implementing AI-driven security comes with challenges. False positive rates can overwhelm security teams, adversarial attacks can poison training data, and the interpretability of AI decisions remains a critical concern for compliance and auditing."
            },
            {
                type: "p",
                text: "The key is finding the right balance between automation and human oversight. AI should augment, not replace, skilled security professionals who bring contextual understanding and strategic thinking to threat response."
            },
            {
                type: "p",
                text: "Organizations must also address data privacy concerns when collecting telemetry for model training. GDPR and other regulations impose strict requirements on how user data can be processed, even for security purposes."
            },

            // ANOTHER VISUAL
            {
                type: "image",
                src: "/assets/articles/security_research.png",
                caption: "Dashboard showing AI-detected threats in real-time"
            },

            // CASE STUDY SECTION
            {
                type: "h2",
                text: "Success Stories and ROI"
            },
            {
                type: "p",
                text: "Companies implementing AI-driven threat detection have reported dramatic improvements in their security posture. One Fortune 500 financial institution reduced their mean time to detect (MTTD) from 197 days to under 24 hours after deploying an AI-powered SIEM system."
            },
            {
                type: "p",
                text: "Another case study from a healthcare provider showed that AI models caught 94% of ransomware attempts in their pre-execution phase, compared to just 67% with traditional endpoint protection. The cost savings from prevented breaches exceeded $12 million annually."
            },

            // FUTURE OUTLOOK
            {
                type: "h2",
                text: "The Path Forward: 2026 and Beyond"
            },
            {
                type: "p",
                text: "As we move into 2026, the integration of AI in cybersecurity will only deepen. Expect to see more sophisticated neural architectures, federated learning for privacy-preserving threat intelligence sharing, and explainable AI systems that provide transparent decision-making processes."
            },
            {
                type: "p",
                text: "The next frontier involves quantum-resistant AI models that can defend against attacks from quantum computers. Researchers are already developing hybrid classical-quantum machine learning algorithms that leverage quantum computing's parallel processing while maintaining robustness against adversarial manipulation."
            },
            {
                type: "p",
                text: "Edge AI will also play a crucial role, enabling real-time threat detection on IoT devices and endpoints without relying on cloud connectivity. This distributed intelligence will be essential for protecting critical infrastructure and industrial control systems."
            },

            // CLOSING QUOTE
            {
                type: "quote",
                text: "In the arms race between attackers and defenders, AI is not just an advantage—it's becoming a necessity for survival in the digital age."
            }
        ]
    },
];

// Helper function to get article by slug
export function getArticleBySlug(slug: string): Article | undefined {
    return ARTICLES.find(article => article.slug === slug);
}

// Helper to generate article route paths for static generation
export function getAllArticleSlugs(): string[] {
    return ARTICLES.map(article => article.slug);
}