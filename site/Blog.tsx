import React, { useState, useMemo } from 'react';
import { blogData } from '../data/blogData';

interface BlogProps {
    onNavigate: (path: string) => void;
}

const Blog: React.FC<BlogProps> = ({ onNavigate }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = useMemo(() => ['All', ...new Set(blogData.map(post => post.category))], []);

    const filteredPosts = useMemo(() => {
        if (selectedCategory === 'All') {
            return blogData;
        }
        return blogData.filter(post => post.category === selectedCategory);
    }, [selectedCategory]);

    const handleNavigate = (e: React.MouseEvent, path: string) => {
        e.preventDefault();
        onNavigate(path);
    };
    
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
            <div className="content-wrapper">
                <div className="text-center max-w-3xl mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-semibold text-[#E2E8F0]">
                        The AICoder Blog
                    </h1>
                    <p className="mt-4 text-lg text-[#94A3B8]">
                        Insights, tutorials, and news from the forefront of AI and prompt engineering.
                    </p>
                </div>

                <div className="mt-12 sm:mt-16 border-b border-slate-700 mb-8">
                    <div className="flex justify-center items-center gap-2 sm:gap-4 flex-wrap px-4">
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-300 whitespace-nowrap border-b-2 ${
                                    selectedCategory === cat
                                        ? 'border-[#F97316] text-[#F97316]'
                                        : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPosts.map((post, index) => (
                        <a 
                            key={post.id} 
                            href={`#/blog/${post.slug}`}
                            onClick={(e) => handleNavigate(e, `/blog/${post.slug}`)}
                            className="group bg-slate-900/70 backdrop-blur-xl rounded-xl border border-slate-700 shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] overflow-hidden transition-all duration-300 ease-in-out hover:border-[#F97316]/50 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-2"
                        >
                            <div className="relative">
                                <img
                                    src={post.imageUrl}
                                    alt={post.title}
                                    className="w-full h-56 object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                                    loading="lazy"
                                    decoding="async"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                <span className="absolute top-4 right-4 bg-[#F97316] text-[#E2E8F0] text-xs font-bold uppercase px-2 py-1 rounded-md shadow-lg">
                                    {post.category}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col h-full">
                                <h2 className="text-xl font-semibold text-[#E2E8F0] mb-2 group-hover:text-[#F97316] transition-colors duration-300 leading-snug">
                                    {post.title}
                                </h2>
                                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                                    {post.summary}
                                </p>
                                <div className="mt-4 pt-4 border-t border-slate-700/50 flex items-center gap-3">
                                    <img src={post.author.imageUrl} alt={post.author.name} className="w-10 h-10 rounded-full object-cover" />
                                    <div>
                                        <p className="font-semibold text-sm text-slate-300">{post.author.name}</p>
                                        <p className="text-xs text-slate-500">{formatDate(post.publicationDate)}</p>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Blog;