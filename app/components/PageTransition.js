"use client";

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

// 单一版本的页面切换淡入淡出组件，去掉了重复定义
export default function PageTransition({ children }) {
    const pathname = usePathname();
    const [displayChildren, setDisplayChildren] = useState(children);
    const [isVisible, setIsVisible] = useState(true);
    const prevPathnameRef = useRef(pathname);

    useEffect(() => {
        // 路径变化时，先淡出再淡入新内容
        if (prevPathnameRef.current !== pathname) {
            setIsVisible(false);
            
            const timer = setTimeout(() => {
                setDisplayChildren(children);
                prevPathnameRef.current = pathname;
                // 确保 DOM 更新后再淡入
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        setIsVisible(true);
                    });
                });
            }, 300); // 淡出时间

            return () => clearTimeout(timer);
        }

        // 路径未变化时，直接显示
            setDisplayChildren(children);
        setIsVisible(true);
    }, [pathname, children]);

    // 初始加载时的淡入
    useEffect(() => {
        setIsVisible(true);
        prevPathnameRef.current = pathname;
    }, [pathname]);

    return (
        <div 
            className="page-transition"
            style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(10px)',
                transition:
                    'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                width: '100%',
                minHeight: '100vh',
                willChange: 'opacity, transform',
            }}
        >
            {displayChildren}
        </div>
    );
}

