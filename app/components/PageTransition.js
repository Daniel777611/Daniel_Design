"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isVisible, setIsVisible] = useState(true);
    const prevPathnameRef = useRef(pathname);

    useEffect(() => {
        // 检查路径是否真的改变了
        if (prevPathnameRef.current !== pathname) {
            // 路径变化时，先淡出
            setIsVisible(false);
            
            // 淡出完成后更新内容并淡入
            const timer = setTimeout(() => {
                setDisplayChildren(children);
                prevPathnameRef.current = pathname;
                // 使用requestAnimationFrame确保DOM更新后再淡入
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            }, 300); // 淡出时间

            return () => clearTimeout(timer);
        } else {
            // 路径没变，直接显示
            setDisplayChildren(children);
            setIsVisible(true);
        }
    }, [pathname, children]);

    // 初始加载时的淡入
    useEffect(() => {
        setIsVisible(true);
        prevPathnameRef.current = pathname;
    }, []);

    return (
        <div 
            className="page-transition"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                minHeight: '100vh',
                willChange: 'opacity, transform'
            }}
        >
            {displayChildren}
        </div>
    );
}


import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isVisible, setIsVisible] = useState(true);
    const prevPathnameRef = useRef(pathname);

    useEffect(() => {
        // 检查路径是否真的改变了
        if (prevPathnameRef.current !== pathname) {
            // 路径变化时，先淡出
            setIsVisible(false);
            
            // 淡出完成后更新内容并淡入
            const timer = setTimeout(() => {
                setDisplayChildren(children);
                prevPathnameRef.current = pathname;
                // 使用requestAnimationFrame确保DOM更新后再淡入
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            }, 300); // 淡出时间

            return () => clearTimeout(timer);
        } else {
            // 路径没变，直接显示
            setDisplayChildren(children);
            setIsVisible(true);
        }
    }, [pathname, children]);

    // 初始加载时的淡入
    useEffect(() => {
        setIsVisible(true);
        prevPathnameRef.current = pathname;
    }, []);

    return (
        <div 
            className="page-transition"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                minHeight: '100vh',
                willChange: 'opacity, transform'
            }}
        >
            {displayChildren}
        </div>
    );
}


import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isVisible, setIsVisible] = useState(true);
    const prevPathnameRef = useRef(pathname);

    useEffect(() => {
        // 检查路径是否真的改变了
        if (prevPathnameRef.current !== pathname) {
            // 路径变化时，先淡出
            setIsVisible(false);
            
            // 淡出完成后更新内容并淡入
            const timer = setTimeout(() => {
                setDisplayChildren(children);
                prevPathnameRef.current = pathname;
                // 使用requestAnimationFrame确保DOM更新后再淡入
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            }, 300); // 淡出时间

            return () => clearTimeout(timer);
        } else {
            // 路径没变，直接显示
            setDisplayChildren(children);
            setIsVisible(true);
        }
    }, [pathname, children]);

    // 初始加载时的淡入
    useEffect(() => {
        setIsVisible(true);
        prevPathnameRef.current = pathname;
    }, []);

    return (
        <div 
            className="page-transition"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                minHeight: '100vh',
                willChange: 'opacity, transform'
            }}
        >
            {displayChildren}
        </div>
    );
}

