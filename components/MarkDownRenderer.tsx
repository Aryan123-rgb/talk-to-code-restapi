'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/vs2015.css';


const customStyles = `
  .prose-invert {
    color: #cccccc;
    font-family: 'Segoe UI', 'Consolas', monospace;
    line-height: 1.6;
    font-size: 15px;
    background-color: #1e1e1e;
  }

  .prose-invert h1, .prose-invert h2, .prose-invert h3 {
    color: #4fc1ff;
    font-weight: 600;
    margin-top: 1.2em;
    margin-bottom: 0.5em;
  }

  .prose-invert h1 {
    font-size: 1.8em;
    border-bottom: 1px solid #404040;
    padding-bottom: 0.3em;
  }

  .prose-invert h2 {
    font-size: 1.5em;
  }

  .prose-invert h3 {
    font-size: 1.3em;
  }

  .prose-invert p {
    margin: 0.8em 0;
    color: #cccccc;
  }

  .prose-invert strong {
    color: #ffd700;
    font-weight: 600;
  }

  .prose-invert em {
    color: #ff9da4;
    font-style: italic;
  }

  .prose-invert ul, .prose-invert ol {
    margin-left: 1.5em;
    color: #cccccc;
  }

  .prose-invert ul {
    list-style-type: disc;
  }

  .prose-invert ol {
    list-style-type: decimal;
  }

  .prose-invert li {
    margin: 0.4em 0;
    color: #cccccc;
  }

  .prose-invert blockquote {
    color: #87ceeb;
    border-left: 4px solid #569cd6;
    padding-left: 1em;
    margin: 1em 0;
    background-color: rgba(86, 156, 214, 0.1);
    padding: 0.8em 1em;
    border-radius: 4px;
  }

  .prose-invert a {
    color: #4fc1ff;
    text-decoration: underline;
  }

  .prose-invert a:hover {
    color: #87ceeb;
  }

  .hljs {
    background: #0d1117 !important;
    border-radius: 6px;
    padding: 1em;
    margin: 0.5em 0;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
    line-height: 1.5;
    border: 1px solid #30363d;
  }

  .prose-invert pre {
    background-color: #0d1117;
    border: 1px solid #30363d;
    border-radius: 6px;
    overflow-x: auto;
    margin: 1em 0;
  }

  .prose-invert code {
    color: #ff7b72;
    background-color: rgba(110, 118, 129, 0.3);
    padding: 0.2em 0.4em;
    border-radius: 3px;
    font-family: 'Fira Code', 'Consolas', 'Monaco', monospace;
    font-size: 0.9em;
  }

  .prose-invert pre code {
    background-color: transparent;
    padding: 0;
    color: #e6edf3;
  }

  .prose-invert table {
    border-collapse: collapse;
    width: 100%;
    margin: 1em 0;
  }

  .prose-invert th, .prose-invert td {
    border: 1px solid #30363d;
    padding: 0.5em 1em;
    text-align: left;
  }

  .prose-invert th {
    background-color: #21262d;
    color: #f0f6fc;
    font-weight: 600;
  }

  .prose-invert td {
    background-color: #0d1117;
    color: #cccccc;
  }

  .prose-invert hr {
    border: none;
    border-top: 1px solid #30363d;
    margin: 2em 0;
  }
`;


export default function MarkdownRenderer({ content }: { content: string }) {
    return (
        <>
            <style jsx global>{customStyles}</style>
            <div className="prose prose-invert max-w-none px-4 py-6">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                        //@ts-ignore
                        code({ node, inline, className, children, ...props }: {
                            node: any;
                            inline?: boolean;
                            className?: string;
                            children: React.ReactNode;
                        }) {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline ? (
                                <code className={className} {...props}>
                                    {children}
                                </code>
                            ) : (
                                <code className="bg-gray-800 px-1 py-0.5 rounded text-red-300" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        </>
    );
}