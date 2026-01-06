"use client"; // Enables client-side interactivity

import styles from './project1.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Project1() {
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(null);
    const [imageScale, setImageScale] = useState(1);
    const [imageOffset, setImageOffset] = useState({ x: 0, y: 0 });
    const isPanningRef = useRef(false);
    const panStartRef = useRef({ x: 0, y: 0 });
    const lastOffsetRef = useRef({ x: 0, y: 0 });
    const imageViewerRef = useRef(null);
    const imageRefs = useRef([]);
    const videoRef = useRef(null);
    const progressBarRef = useRef(null);
    const controlsRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [showControls, setShowControls] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const hideControlsTimeoutRef = useRef(null);
    const wasFullscreenRef = useRef(false);
    const fullscreenSourceRef = useRef(null); // 'video' | 'image' | null
    const processVideoSectionRef = useRef(null); // 让主视频 section 能被滚动到视口中心
    const isProcessVideoInViewRef = useRef(false); // 上一次滚动时视频 section 是否在视口内
    const [showLeftImageNav, setShowLeftImageNav] = useState(false);
    const [showRightImageNav, setShowRightImageNav] = useState(false);

    // 设置页面背景颜色
    useEffect(() => {
        // 注意：全局样式里对 body/html 写了 `background-color: #ffffff !important`
        // 所以这里必须用 setProperty(..., 'important') 才能覆盖（且只影响这一页）
        const originalBodyBg = document.body.style.getPropertyValue('background-color');
        const originalBodyPriority = document.body.style.getPropertyPriority('background-color');
        const originalHtmlBg = document.documentElement.style.getPropertyValue('background-color');
        const originalHtmlPriority = document.documentElement.style.getPropertyPriority('background-color');

        document.body.style.setProperty('background-color', '#1f1f1f', 'important');
        document.documentElement.style.setProperty('background-color', '#1f1f1f', 'important');

        return () => {
            document.body.style.setProperty('background-color', originalBodyBg, originalBodyPriority || '');
            document.documentElement.style.setProperty('background-color', originalHtmlBg, originalHtmlPriority || '');
        };
    }, []);

    const images = [
        
        "/projects/interactive_design/project1/2.jpg",
        "/projects/interactive_design/project1/3.jpg",
        "/projects/interactive_design/project1/4.jpg",
        "/projects/interactive_design/project1/5.jpg",
        "/projects/interactive_design/project1/6.jpg",
        "/projects/interactive_design/project1/7.jpg",
        "/projects/interactive_design/project1/8.jpg",
        "/projects/interactive_design/project1/9.jpg",
        "/projects/interactive_design/project1/10.jpg",
        "/projects/interactive_design/project1/11.jpg",
        "/projects/interactive_design/project1/12.jpg",
        "/projects/interactive_design/project1/13.jpg",
        "/projects/interactive_design/project1/14.jpg",
        "/projects/interactive_design/project1/15.jpg",
        "/projects/interactive_design/project1/16.jpg",
    ];

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

    // 当用户每次滚动“进入”主视频 section 时，丝滑地把视频滚动到视口中间
    useEffect(() => {
        const handleScroll = () => {
            const section = processVideoSectionRef.current;
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // 是否与视口有交集
            const inView = rect.top < viewportHeight && rect.bottom > 0;
            // “进入”视口：大部分已进入视口，并且上一次并不在视口中
            const enteredEnough =
                rect.top < viewportHeight * 0.4 && rect.bottom > viewportHeight * 0.6;

            if (enteredEnough && !isProcessVideoInViewRef.current) {
                isProcessVideoInViewRef.current = true;
                section.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else if (!inView && isProcessVideoInViewRef.current) {
                // 完全离开视口后，重置状态，下一次再进入时会再次自动居中
                isProcessVideoInViewRef.current = false;
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // 初始也检查一下（例如通过锚点直接跳到这一段）
        handleScroll();
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

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

            // 其余情况下，以“当前鼠标位置”作为缩放中心，调整偏移
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

    const handlePlay = () => {
        const video = videoRef.current;
        if (video) {
            video.play();
            setIsPlaying(true);
            setHasPlayed(true);
        }
    };

    const handlePause = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            setIsPlaying(false);
        }
    };

    const handleTogglePlayPause = () => {
        if (isPlaying) {
            handlePause();
        } else {
            handlePlay();
        }
    };

    const handleStop = () => {
        const video = videoRef.current;
        if (video) {
            video.pause();
            video.currentTime = 0;
            setIsPlaying(false);
            setCurrentTime(0);
            setHasPlayed(false);
        }
    };

    const handleVideoClick = (e) => {
        // 如果点击的是控制栏区域，不触发暂停
        if (controlsRef.current && controlsRef.current.contains(e.target)) {
            return;
        }
        handleTogglePlayPause();
    };

    const handleFullscreen = () => {
        const video = videoRef.current;
        const videoContainer = video?.parentElement;
        if (videoContainer) {
            if (!document.fullscreenElement) {
                if (videoContainer.requestFullscreen) {
                    videoContainer.requestFullscreen();
                } else if (videoContainer.webkitRequestFullscreen) {
                    videoContainer.webkitRequestFullscreen();
                } else if (videoContainer.msRequestFullscreen) {
                    videoContainer.msRequestFullscreen();
                }
                fullscreenSourceRef.current = 'video';
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
                fullscreenSourceRef.current = null;
                setIsFullscreen(false);
            }
        }
    };

    const handleVolumeChange = (e) => {
        const video = videoRef.current;
        const newVolume = parseFloat(e.target.value);
        if (video) {
            video.volume = newVolume;
            setVolume(newVolume);
            setIsMuted(newVolume === 0);
        }
    };

    const handleMuteToggle = () => {
        const video = videoRef.current;
        if (video) {
            if (isMuted) {
                video.muted = false;
                video.volume = volume > 0 ? volume : 0.5;
                setVolume(volume > 0 ? volume : 0.5);
                setIsMuted(false);
            } else {
                video.muted = true;
                setIsMuted(true);
            }
        }
    };




    const handleTimeUpdate = (e) => {
        const video = e.target || videoRef.current;
        if (video && !isNaN(video.currentTime) && !isNaN(video.duration)) {
            setCurrentTime(video.currentTime);
            if (video.duration && video.duration !== duration) {
                setDuration(video.duration);
            }
        }
    };

    const handleLoadedMetadata = () => {
        const video = videoRef.current;
        if (video) {
            setDuration(video.duration);
            video.volume = volume;
            video.muted = isMuted;
        }
    };

    const handleProgressClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const video = videoRef.current;
        const progressBar = progressBarRef.current;
        if (video && progressBar && video.duration) {
            const rect = progressBar.getBoundingClientRect();
            const clickX = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(1, clickX / rect.width));
            const newTime = percentage * video.duration;
            // 立即更新state，确保UI同步
            setCurrentTime(newTime);
            video.currentTime = newTime;
        }
    };

    const handleProgressMouseDown = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
        handleProgressClick(e);
    };

    const handleProgressMouseMove = (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
            handleProgressClick(e);
        }
    };

    const handleProgressMouseUp = (e) => {
        if (isDragging) {
            e.preventDefault();
            e.stopPropagation();
        }
        setIsDragging(false);
    };

    const showControlsBar = () => {
        setShowControls(true);
        // 清除之前的隐藏定时器
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
        // 设置新的隐藏定时器（3秒后隐藏）
        hideControlsTimeoutRef.current = setTimeout(() => {
            if (!isDragging) {
                setShowControls(false);
            }
        }, 3000);
    };

    const handleControlsMouseEnter = () => {
        setShowControls(true);
        if (hideControlsTimeoutRef.current) {
            clearTimeout(hideControlsTimeoutRef.current);
        }
    };

    const handleControlsMouseLeave = () => {
        if (!isDragging) {
            hideControlsTimeoutRef.current = setTimeout(() => {
                setShowControls(false);
            }, 1000);
        }
    };

    const handleVideoMouseMove = (e) => {
        // 如果鼠标在控制栏区域，不触发显示
        if (controlsRef.current && controlsRef.current.contains(e.target)) {
            return;
        }
        // 全屏模式下，只在鼠标移到下方时显示控制栏
        if (isFullscreen) {
            const video = videoRef.current;
            if (video) {
                const rect = video.getBoundingClientRect();
                const mouseY = e.clientY;
                const videoBottom = rect.bottom;
                // 如果鼠标在视频底部20%区域内，显示控制栏
                if (mouseY > videoBottom - rect.height * 0.2) {
                    showControlsBar();
                }
            }
        } else {
            showControlsBar();
        }
    };

    const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

    const formatTime = (seconds) => {
        if (!isFinite(seconds) || isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    // 确保进度条实时更新
    useEffect(() => {
        if (isPlaying && !isDragging) {
            const interval = setInterval(() => {
                const video = videoRef.current;
                if (video && !isNaN(video.currentTime) && !isNaN(video.duration)) {
                    setCurrentTime(video.currentTime);
                    if (video.duration && video.duration !== duration) {
                        setDuration(video.duration);
                    }
                }
            }, 100); // 每100ms更新一次

            return () => clearInterval(interval);
        }
    }, [isPlaying, isDragging, duration]);

    // 全局鼠标事件监听，确保拖拽时即使鼠标移出进度条也能继续
    useEffect(() => {
        const handleGlobalMouseMove = (e) => {
            if (isDragging && progressBarRef.current) {
                const video = videoRef.current;
                const progressBar = progressBarRef.current;
                if (video && progressBar && video.duration) {
                    const rect = progressBar.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = Math.max(0, Math.min(1, clickX / rect.width));
                    const newTime = percentage * video.duration;
                    // 立即更新state，确保UI同步
                    setCurrentTime(newTime);
                    video.currentTime = newTime;
                }
            }
            
        };

        const handleGlobalMouseUp = () => {
            if (isDragging) {
                setIsDragging(false);
            }
        };

        if (isDragging || isFullscreen) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        // 监听全屏状态变化（区分视频全屏和图片全屏）
        const handleFullscreenChange = () => {
            const isNowFullscreen = !!document.fullscreenElement;
            const wasFullscreen = wasFullscreenRef.current;
            wasFullscreenRef.current = isNowFullscreen;
            setIsFullscreen(isNowFullscreen);
            
            // 进入全屏时，立即显示控制栏（仅针对视频）
            if (isNowFullscreen && fullscreenSourceRef.current === 'video') {
                setShowControls(true);
                // 清除之前的隐藏定时器
                if (hideControlsTimeoutRef.current) {
                    clearTimeout(hideControlsTimeoutRef.current);
                }
            } else if (wasFullscreen && !isNowFullscreen) {
                // 退出全屏：视频全屏时滚回视频区；图片全屏时滚动到当前图片位置
                if (fullscreenSourceRef.current === 'video') {
                setTimeout(() => {
                    const videoSection = document.querySelector(`.${styles.processVideoSection}`);
                    if (videoSection) {
                        videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
                } else if (fullscreenSourceRef.current === 'image') {
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
        
        // 全屏模式下，监听整个文档的鼠标移动
        const handleFullscreenMouseMove = (e) => {
            const isCurrentlyFullscreen = !!document.fullscreenElement;
            if (isCurrentlyFullscreen && !isDragging) {
                // 如果鼠标在控制栏区域，保持显示
                if (controlsRef.current && controlsRef.current.contains(e.target)) {
                    setShowControls(true);
                    if (hideControlsTimeoutRef.current) {
                        clearTimeout(hideControlsTimeoutRef.current);
                    }
                    return;
                }
                // 检查鼠标是否在屏幕底部区域
                const windowHeight = window.innerHeight;
                const mouseY = e.clientY;
                // 如果鼠标在屏幕底部30%区域内，显示控制栏
                if (mouseY > windowHeight * 0.7) {
                    setShowControls(true);
                    if (hideControlsTimeoutRef.current) {
                        clearTimeout(hideControlsTimeoutRef.current);
                    }
                    // 设置3秒后隐藏
                    hideControlsTimeoutRef.current = setTimeout(() => {
                        if (!isDragging) {
                            setShowControls(false);
                        }
                    }, 3000);
                }
            }
        };
        
        // 始终监听全屏模式下的鼠标移动（通过检查全屏状态）
        document.addEventListener('mousemove', handleFullscreenMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleGlobalMouseMove);
            document.removeEventListener('mouseup', handleGlobalMouseUp);
            document.removeEventListener('fullscreenchange', handleFullscreenChange);
            document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
            document.removeEventListener('msfullscreenchange', handleFullscreenChange);
            document.removeEventListener('mousemove', handleFullscreenMouseMove);
            if (hideControlsTimeoutRef.current) {
                clearTimeout(hideControlsTimeoutRef.current);
            }
        };
    }, [isDragging, isFullscreen, currentImageIndex]);

    return (
        <div className={styles.pageContainer}>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <Image src="/image/logo/LogoWhite.png" alt="DANIEL DESIGN" className={styles.title} width={160} height={40} />
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/Interactive_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Process Video Section */}
            <section
                className={styles.processVideoSection}
                ref={processVideoSectionRef}
            >
                <div className={styles.videoWrapper}>
                    <div 
                        className={styles.videoContainer}
                        onMouseMove={handleVideoMouseMove}
                    >
                        <video 
                            ref={videoRef}
                            className={styles.processVideo} 
                            onClick={handleVideoClick}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                            onEnded={() => setIsPlaying(false)}
                            onTimeUpdate={handleTimeUpdate}
                            onLoadedMetadata={handleLoadedMetadata}
                            onProgress={handleTimeUpdate}
                        >
                            <source src="https://danieldesignvideo.org/Robotaxi_1.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                        {!isPlaying && !hasPlayed && (
                            <button 
                                className={styles.videoPlayButton} 
                                onClick={handlePlay}
                            >
                                <span className={styles.playIcon}></span>
                            </button>
                        )}
                    </div>
                    <div 
                        ref={controlsRef}
                        className={`${styles.videoControls} ${showControls ? styles.controlsVisible : styles.controlsHidden} ${isFullscreen ? styles.fullscreenControls : ''}`}
                        onMouseEnter={handleControlsMouseEnter}
                        onMouseLeave={handleControlsMouseLeave}
                        onMouseMove={handleVideoMouseMove}
                    >
                        <div 
                            className={styles.progressBarContainer}
                            ref={progressBarRef}
                            onClick={handleProgressClick}
                            onMouseDown={handleProgressMouseDown}
                            onMouseMove={handleProgressMouseMove}
                            onMouseUp={handleProgressMouseUp}
                        >
                            <div className={styles.progressBar}>
                                <div 
                                    className={styles.progressBarFill}
                                    style={{ width: `${progressPercentage}%` }}
                                ></div>
                                <div 
                                    className={styles.progressBarThumb}
                                    style={{ left: `${progressPercentage}%` }}
                                ></div>
                            </div>
                        </div>
                        <div className={styles.controlBar}>
                            <div className={styles.controlBarLeft}>
                                <button 
                                    className={styles.controlButton} 
                                    onClick={handleTogglePlayPause}
                                    aria-label={isPlaying ? "Pause" : "Play"}
                                >
                                    {isPlaying ? (
                                        <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                                        </svg>
                                    ) : (
                                        <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    )}
                                </button>
                                <button 
                                    className={styles.controlButton} 
                                    onClick={handleStop}
                                    aria-label="Stop"
                                >
                                    <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M6 6h12v12H6z"/>
                                    </svg>
                                </button>
                                <div className={styles.timeDisplay}>
                                    <span className={styles.currentTime}>
                                        {formatTime(currentTime)}
                                    </span>
                                    <span className={styles.timeSeparator}> / </span>
                                    <span className={styles.duration}>
                                        {formatTime(duration)}
                                    </span>
                                </div>
                            </div>
                            <div className={styles.controlBarRight}>
                                <div className={styles.volumeControlPanel}>
                                    <div className={styles.volumeSliderWrapper}>
                                        <div 
                                            className={styles.volumeSliderFill}
                                            style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                                        ></div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.01"
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className={styles.volumeSlider}
                                            aria-label="Volume"
                                        />
                                    </div>
                                    <button 
                                        className={styles.controlButton}
                                        onClick={handleMuteToggle}
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? (
                                            <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
                                            </svg>
                                        ) : (
                                            <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                                            </svg>
                                        )}
                                    </button>
                                </div>
                                <button 
                                    className={styles.controlButton} 
                                    onClick={handleFullscreen}
                                    aria-label={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
                                >
                                    {isFullscreen ? (
                                        <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>
                                        </svg>
                                    ) : (
                                        <svg className={styles.controlIcon} viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>




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


            <div className={styles.sectionSeparator}>

                <div className={styles.sectionSeparatorline}></div>

            </div>



             {/* ProjectGallery Section */}
             <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>

                        <Link href="/Interactive_design/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/interactive_design/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>


                        <Link href="/Interactive_design/projects/project3">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/interactive_design/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
                                    {/*<h3 className={styles.galleryItemTitle}>Project 3</h3>*/}
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

            {/* Footer */}
            <footer className={styles.footer}>
                            <div className={styles.footerCenter}>
                                <Link href="/Contact">
                                    <button className={styles.contactButton}>Contact</button>
                                </Link>
                            </div>
                        </footer>

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
        </div>
    );
}