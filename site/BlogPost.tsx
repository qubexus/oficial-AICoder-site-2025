import React, { useEffect, useState, useRef } from 'react';
import { blogData } from '../data/blogData';

interface BlogPostProps {
    slug: string;
    onNavigate: (path: string) => void;
}

const BlogPost: React.FC<BlogPostProps> = ({ slug, onNavigate }) => {
    const post = blogData.find(p => p.slug === slug);
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const shareRef = useRef<HTMLDivElement>(null);

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
    
    const handleCopyLink = () => {
        const link = window.location.href;
        navigator.clipboard.writeText(link).then(() => {
            setCopySuccess(true);
            setTimeout(() => {
                setCopySuccess(false);
                setIsShareOpen(false);
            }, 2000);
        }).catch(err => console.error('Failed to copy link: ', err));
    };

    // Close share dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (shareRef.current && !shareRef.current.contains(event.target as Node)) {
                setIsShareOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    if (!post) {
        return (
            <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
                <div className="content-wrapper text-center">
                    <h1 className="text-4xl font-bold text-amber-400">404 - Post Not Found</h1>
                    <p className="mt-4 text-slate-400">Sorry, we couldn't find the blog post you're looking for.</p>
                    <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className="mt-8 inline-block text-lg font-bold text-[#F97316] hover:underline">
                        &larr; Back to Blog
                    </a>
                </div>
            </main>
        );
    }
    
    const shareUrl = window.location.href;
    const shareText = post.title;
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`;
    const linkedInShareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;

    return (
        <main className="pt-24 sm:pt-28 xl:pt-32 pb-12">
            <div className="content-wrapper max-w-4xl mx-auto">
                <header className="mb-8">
                     <a href="#/blog" onClick={(e) => handleNavigate(e, '/blog')} className="text-sm font-bold text-[#F97316] hover:underline hover:brightness-125 transition-all duration-300 group inline-flex items-center gap-1 mb-4">
                        <span className="inline-block transition-transform group-hover:-translate-x-1">&larr;</span> Back to Blog
                    </a>
                    <h1 className="text-4xl sm:text-5xl font-bold text-[#E2E8F0] leading-tight">
                        {post.title}
                    </h1>
                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <img src={post.author.imageUrl} alt={post.author.name} className="w-12 h-12 rounded-full object-cover"/>
                            <div>
                                <p className="font-semibold text-slate-200">{post.author.name}</p>
                                <p className="text-sm text-slate-400">{post.author.title}</p>
                                <p className="text-xs text-slate-500">{formatDate(post.publicationDate)}</p>
                            </div>
                        </div>
                         <div className="relative" ref={shareRef}>
                            <button onClick={() => setIsShareOpen(p => !p)} className="flex items-center gap-2 px-3 py-1.5 text-sm bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-full text-slate-300 hover:text-white transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18"cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.41" y2="10.49"></line><line x1="15.41" y1="13.51" x2="8.59" y2="10.49"></line></svg>
                                Share
                            </button>
                             {isShareOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-slate-800/90 backdrop-blur-lg border border-slate-700 rounded-lg shadow-xl p-2 z-20 animate-in fade-in-0 zoom-in-95" role="menu">
                                    <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#E2E8F0] hover:bg-slate-700/80 transition-colors rounded-md" role="menuitem">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                        <span>Share on X</span>
                                    </a>
                                    <a href={linkedInShareUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#E2E8F0] hover:bg-slate-700/80 transition-colors rounded-md" role="menuitem">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                        <span>Share on LinkedIn</span>
                                    </a>
                                    <div className="h-px bg-slate-700 my-1"></div>
                                    <button onClick={handleCopyLink} className="flex items-center gap-3 w-full px-4 py-2 text-sm text-[#E2E8F0] hover:bg-slate-700/80 transition-colors rounded-md" role="menuitem">
                                        {copySuccess ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-green-400"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>}
                                        <span>{copySuccess ? 'Copied!' : 'Copy Link'}</span>
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-auto max-h-[500px] object-cover rounded-xl mb-8 shadow-2xl"
                />

                <article className="prose prose-invert sm:prose-lg lg:prose-xl max-w-none text-slate-300 whitespace-pre-wrap">
                    {post.fullArticle}
                </article>

                <div className="mt-12 pt-8 border-t border-slate-700">
                    <h3 className="text-2xl font-semibold text-slate-200 mb-4">About the Author</h3>
                    <div className="flex flex-col sm:flex-row items-start gap-6 bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <img src={post.author.imageUrl} alt={post.author.name} className="w-24 h-24 rounded-full object-cover flex-shrink-0 border-2 border-slate-700"/>
                        <div>
                            <h4 className="text-xl font-bold text-[#E2E8F0]">{post.author.name}</h4>
                            <p className="text-sm text-[#F97316] mb-3">{post.author.title}</p>
                            <p className="text-slate-400 text-base mb-4">{post.author.bio}</p>
                            <div className="flex items-center gap-4">
                                {post.author.twitterUrl && (
                                    <a href={post.author.twitterUrl} target="_blank" rel="noopener noreferrer" aria-label={`Follow ${post.author.name} on X/Twitter`} className="text-slate-400 hover:text-[#F97316] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg>
                                    </a>
                                )}
                                {post.author.linkedinUrl && (
                                    <a href={post.author.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${post.author.name} on LinkedIn`} className="text-slate-400 hover:text-[#F97316] transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default BlogPost;