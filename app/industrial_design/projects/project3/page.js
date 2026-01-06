"use client"; // Enables client-side interactivity

import styles from './project3.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Project3() {
    const videoRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [imageScale, setImageScale] = useState(1);
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
    const isPanningRef = useRef(false);
    const panStartRef = useRef({ x: 0, y: 0 });
    const lastOffsetRef = useRef({ x: 0, y: 0 });
    const imageViewerRef = useRef(null);
    const imageRefs = useRef([]);
    const fullscreenSourceRef = useRef(null); // 'video' | 'image' | null
    const wasFullscreenRef = useRef(false);
    const [showLeftImageNav, setShowLeftImageNav] = useState(false);
    const [showRightImageNav, setShowRightImageNav] = useState(false);

    // 设置页面背景（深灰→黑渐变，覆盖 globals.css 里的白底 `!important`）
    useEffect(() => {
        const bgImage =
            'radial-gradient(circle at 20% 10%, rgba(60,60,60,0.55) 0%, rgba(25,25,25,0.85) 45%, rgba(0,0,0,1) 100%),' +
            'linear-gradient(165deg, #2b2b2b 0%, #000000 100%)';

        const original = {
            bodyBgColor: document.body.style.getPropertyValue('background-color'),
            bodyBgColorP: document.body.style.getPropertyPriority('background-color'),
            bodyBgImage: document.body.style.getPropertyValue('background-image'),
            bodyBgImageP: document.body.style.getPropertyPriority('background-image'),
            bodyBgAttach: document.body.style.getPropertyValue('background-attachment'),
            bodyBgAttachP: document.body.style.getPropertyPriority('background-attachment'),
            bodyBgRepeat: document.body.style.getPropertyValue('background-repeat'),
            bodyBgRepeatP: document.body.style.getPropertyPriority('background-repeat'),
            bodyBgSize: document.body.style.getPropertyValue('background-size'),
            bodyBgSizeP: document.body.style.getPropertyPriority('background-size'),
            htmlBgColor: document.documentElement.style.getPropertyValue('background-color'),
            htmlBgColorP: document.documentElement.style.getPropertyPriority('background-color'),
            htmlBgImage: document.documentElement.style.getPropertyValue('background-image'),
            htmlBgImageP: document.documentElement.style.getPropertyPriority('background-image'),
            htmlBgAttach: document.documentElement.style.getPropertyValue('background-attachment'),
            htmlBgAttachP: document.documentElement.style.getPropertyPriority('background-attachment'),
            htmlBgRepeat: document.documentElement.style.getPropertyValue('background-repeat'),
            htmlBgRepeatP: document.documentElement.style.getPropertyPriority('background-repeat'),
            htmlBgSize: document.documentElement.style.getPropertyValue('background-size'),
            htmlBgSizeP: document.documentElement.style.getPropertyPriority('background-size'),
        };

        document.body.style.setProperty('background-color', '#0b0b0b', 'important');
        document.body.style.setProperty('background-image', bgImage, 'important');
        document.body.style.setProperty('background-attachment', 'fixed', 'important');
        document.body.style.setProperty('background-repeat', 'no-repeat', 'important');
        document.body.style.setProperty('background-size', 'cover', 'important');

        document.documentElement.style.setProperty('background-color', '#0b0b0b', 'important');
        document.documentElement.style.setProperty('background-image', bgImage, 'important');
        document.documentElement.style.setProperty('background-attachment', 'fixed', 'important');
        document.documentElement.style.setProperty('background-repeat', 'no-repeat', 'important');
        document.documentElement.style.setProperty('background-size', 'cover', 'important');

        return () => {
            document.body.style.setProperty('background-color', original.bodyBgColor, original.bodyBgColorP || '');
            document.body.style.setProperty('background-image', original.bodyBgImage, original.bodyBgImageP || '');
            document.body.style.setProperty('background-attachment', original.bodyBgAttach, original.bodyBgAttachP || '');
            document.body.style.setProperty('background-repeat', original.bodyBgRepeat, original.bodyBgRepeatP || '');
            document.body.style.setProperty('background-size', original.bodyBgSize, original.bodyBgSizeP || '');

            document.documentElement.style.setProperty('background-color', original.htmlBgColor, original.htmlBgColorP || '');
            document.documentElement.style.setProperty('background-image', original.htmlBgImage, original.htmlBgImageP || '');
            document.documentElement.style.setProperty('background-attachment', original.htmlBgAttach, original.htmlBgAttachP || '');
            document.documentElement.style.setProperty('background-repeat', original.htmlBgRepeat, original.htmlBgRepeatP || '');
            document.documentElement.style.setProperty('background-size', original.htmlBgSize, original.htmlBgSizeP || '');
        };
    }, []);

    const images = [
        "/projects/industrial_design/project3/1.jpg",
        "/projects/industrial_design/project3/2.jpg",
        "/projects/industrial_design/project3/3.jpg",
        "/projects/industrial_design/project3/4.jpg",
        "/projects/industrial_design/project3/5.jpg",
        "/projects/industrial_design/project3/6.jpg",
        "/projects/industrial_design/project3/7.jpg",
        "/projects/industrial_design/project3/8.jpg",
    ];

    const playFullScreen = () => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.muted = false;

            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen(); // Safari
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen(); // IE/Edge
            }

            video.play();

            document.addEventListener('fullscreenchange', handleExitFullScreen);
            document.addEventListener('webkitfullscreenchange', handleExitFullScreen);
            document.addEventListener('msfullscreenchange', handleExitFullScreen);
        }
    };

    const handleExitFullScreen = () => {
        const video = videoRef.current;
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && video) {
            video.muted = true;
        }
    };

    // 打开 / 关闭图片全屏查看（覆盖整个浏览器）
    const openImageModal = (image, index) => {
        setImageScale(1);
        setImageOffset({ x: 0, y: 0 });
        setCurrentImageIndex(index);
        setSelectedImage(image);
    };

    const closeModal = () => {
        // 退出浏览器全屏
        if (document.fullscreenElement && document.exitFullscreen) {
            try {
                document.exitFullscreen();
            } catch (e) {
                // ignore
            }
        }
        setSelectedImage(null);
        setCurrentImageIndex(null);
    };

    // ESC键关闭模态框
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && selectedImage) {
                closeModal();
            }
        };
        if (selectedImage) {
            document.addEventListener('keydown', handleEscape);
            return () => {
                document.removeEventListener('keydown', handleEscape);
            };
        }
    }, [selectedImage]);

    // 进入图片全屏时，请求浏览器全屏（和视频一样）
    useEffect(() => {
        if (selectedImage && imageViewerRef.current && !document.fullscreenElement) {
            const el = imageViewerRef.current;
            if (el.requestFullscreen) {
                fullscreenSourceRef.current = 'image';
                el.requestFullscreen().catch(() => {
                    fullscreenSourceRef.current = null;
                });
            }
        }
    }, [selectedImage]);

    // 控制图片全屏模式下左右箭头的显示：只有鼠标靠近两侧边缘时才显示
    const handleImageNavMouseMove = (e) => {
        if (!selectedImage) return;
        const threshold = 80;
        const width = window.innerWidth || document.documentElement.clientWidth;
        const x = e.clientX;
        setShowLeftImageNav(x < threshold);
        setShowRightImageNav(x > width - threshold);
    };

    // 全屏图片缩放（鼠标滚轮）- 限制在 1x ~ 3x，最小时居中，并以鼠标位置为缩放中心
    const handleImageWheel = (e) => {
        if (!selectedImage) return;
        e.preventDefault();
        const zoomIntensity = 0.0015;
        const delta = e.deltaY;
        const MIN_SCALE = 1;
        const MAX_SCALE = 3;

        setImageScale((prevScale) => {
            let nextScale = prevScale * (1 - delta * zoomIntensity);

            // 限制缩放范围
            if (nextScale < MIN_SCALE) nextScale = MIN_SCALE;
            if (nextScale > MAX_SCALE) nextScale = MAX_SCALE;

            // 当缩回到最小值时，重置偏移，让图片回到居中位置
            if (nextScale === MIN_SCALE && prevScale !== MIN_SCALE) {
                setImageOffset({ x: 0, y: 0 });
                return nextScale;
            }

            // 其余情况下，以"当前鼠标位置"作为缩放中心，调整偏移
            if (nextScale !== prevScale && imageViewerRef.current) {
                const rect = imageViewerRef.current.getBoundingClientRect();
                const mouseX = e.clientX;
                const mouseY = e.clientY;
                const viewerCenterX = rect.left + rect.width / 2;
                const viewerCenterY = rect.top + rect.height / 2;

                const scaleFactor = nextScale / prevScale;

                setImageOffset((prevOffset) => {
                    // o' = o + (1 - scaleFactor) * (m - vc - o)
                    const dx = mouseX - viewerCenterX - prevOffset.x;
                    const dy = mouseY - viewerCenterY - prevOffset.y;
                    return {
                        x: prevOffset.x + (1 - scaleFactor) * dx,
                        y: prevOffset.y + (1 - scaleFactor) * dy,
                    };
                });
            }

            return nextScale;
        });
    };

    // 全屏图片拖拽平移（不做缓冲，完全跟随鼠标）
    const handleImageMouseDown = (e) => {
        // 在最小缩放比例时不允许拖动，保持图片居中
        if (!selectedImage || e.button !== 0 || imageScale <= 1) return;
        e.preventDefault();
        isPanningRef.current = true;
        panStartRef.current = { x: e.clientX, y: e.clientY };
        lastOffsetRef.current = imageOffset;

        const handleMove = (moveEvent) => {
            if (!isPanningRef.current) return;
            moveEvent.preventDefault();
            const dx = moveEvent.clientX - panStartRef.current.x;
            const dy = moveEvent.clientY - panStartRef.current.y;
            setImageOffset({
                x: lastOffsetRef.current.x + dx,
                y: lastOffsetRef.current.y + dy,
            });
        };

        const handleUp = () => {
            isPanningRef.current = false;
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
    };

    // 键盘控制：Esc 关闭，方向键切换上一张 / 下一张
    useEffect(() => {
        if (!selectedImage) return;

        const handleKey = (e) => {
            if (e.key === 'Escape') {
                closeModal();
                return;
            }
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                if (currentImageIndex != null && currentImageIndex < images.length - 1) {
                    const next = currentImageIndex + 1;
                    setImageScale(1);
                    setImageOffset({ x: 0, y: 0 });
                    setCurrentImageIndex(next);
                    setSelectedImage(images[next]);
                }
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                if (currentImageIndex != null && currentImageIndex > 0) {
                    const prev = currentImageIndex - 1;
                    setImageScale(1);
                    setImageOffset({ x: 0, y: 0 });
                    setCurrentImageIndex(prev);
                    setSelectedImage(images[prev]);
                }
            }
        };

        document.addEventListener('keydown', handleKey);
        return () => {
            document.removeEventListener('keydown', handleKey);
        };
    }, [selectedImage, currentImageIndex, images]);

    // 监听全屏状态变化（区分视频全屏和图片全屏）
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isNowFullscreen = !!document.fullscreenElement;
            const wasFullscreen = wasFullscreenRef.current;
            wasFullscreenRef.current = isNowFullscreen;
            
            if (wasFullscreen && !isNowFullscreen) {
                // 退出全屏：图片全屏时滚动到当前图片位置
                if (fullscreenSourceRef.current === 'image') {
                    const index = currentImageIndex;
                    // 清除当前选中的图片
                    setSelectedImage(null);
                    setCurrentImageIndex(null);
                    setImageScale(1);
                    setImageOffset({ x: 0, y: 0 });
                    // 滚动到当前图片在页面中的位置（让这张图尽量居中）
                    if (index != null && imageRefs.current[index]) {
                        const el = imageRefs.current[index];
                        const rect = el.getBoundingClientRect();
                        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
                        const targetY =
                            window.scrollY + rect.top + rect.height / 2 - viewportHeight / 2;
                        window.scrollTo({
                            top: targetY,
                            behavior: 'smooth',
                        });
                    }
                }
                fullscreenSourceRef.current = null;
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        return () => {
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
        };
    }, [currentImageIndex]);

    return (
        <div className={styles.pageContainer}>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <Image src="/image/logo/LogoWhite.png" alt="DANIEL DESIGN" className={styles.title} width={160} height={40} />
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/industrial_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            

            {/* Image Gallery Section - click to open fullscreen viewer */}
            <section className={styles.imageGallerySection}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={styles.imageContainer}
                        onClick={() => openImageModal(image, index)}
                        ref={(el) => (imageRefs.current[index] = el)}
                    >
                        <Image
                            src={image}
                            alt={`Project Image ${index + 1}`}
                            width={2560}
                            height={1440}
                            className={styles.projectImage}
                        />
                    </div>
                ))}
            </section>

            {/* Full-Screen Modal */}
            {selectedImage && (
                <div 
                    ref={imageViewerRef}
                    className={styles.modal}
                    onClick={closeModal}
                    onWheel={handleImageWheel}
                    onMouseDown={handleImageMouseDown}
                    onMouseMove={handleImageNavMouseMove}
                    style={{ cursor: imageScale > 1 ? 'grab' : 'default' }}
                >
                    <button
                        className={`${styles.navArrow} ${styles.navArrowLeft}`}
                        style={{
                            opacity: showLeftImageNav ? 1 : 0,
                            pointerEvents: showLeftImageNav ? 'auto' : 'none',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (currentImageIndex != null && currentImageIndex > 0) {
                                const prev = currentImageIndex - 1;
                                setImageScale(1);
                                setImageOffset({ x: 0, y: 0 });
                                setCurrentImageIndex(prev);
                                setSelectedImage(images[prev]);
                            }
                        }}
                    >
                        ‹
                    </button>
                    <div
                        className={styles.fullScreenImageWrapper}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Image
                            src={selectedImage}
                            alt="Full Screen"
                            width={2560}
                            height={1440}
                            className={styles.fullScreenImage}
                            style={{
                                transform: `translate(${imageOffset.x}px, ${imageOffset.y}px) scale(${imageScale})`,
                            }}
                        />
                    </div>
                    <button
                        className={`${styles.navArrow} ${styles.navArrowRight}`}
                        style={{
                            opacity: showRightImageNav ? 1 : 0,
                            pointerEvents: showRightImageNav ? 'auto' : 'none',
                        }}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (currentImageIndex != null && currentImageIndex < images.length - 1) {
                                const next = currentImageIndex + 1;
                                setImageScale(1);
                                setImageOffset({ x: 0, y: 0 });
                                setCurrentImageIndex(next);
                                setSelectedImage(images[next]);
                            }
                        }}
                    >
                        ›
                    </button>
                </div>
            )}


            <div className={styles.sectionSeparator}>

                <div className={styles.sectionSeparatorline}></div>

            </div>

            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>
                        <Link href="/industrial_design/projects/project1">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/industrial_design/project1/1.jpg" alt="Project 1 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>

                        <Link href="/industrial_design/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/industrial_design/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>


                        <Link href="/industrial_design/projects/project4">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/industrial_design/project4/1.jpg" alt="Project 4 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>


           <div className={styles.sectionSeparator}>

                <div className={styles.sectionSeparatorline}></div>

            </div>

            <section id="comeBack" className={styles.comeBack}>

            <div >
            <Link href="/">
                <Image
                    src="/image/logo/LogoWhite.png"
                    alt="DANIEL DESIGN"
                    className={styles.comeBackTitle}
                    width={160}
                    height={40}
                />
            </Link>
            </div>
            </section>         




            <footer className={styles.footer}>
                <div className={styles.footerCenter}>
                    <Link href="/Contact">
                        <button className={styles.contactButton}>Contact</button>
                    </Link>
                </div>
            </footer>
        </div>
    );
}