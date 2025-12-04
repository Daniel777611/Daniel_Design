"use client"; // Enables client-side interactivity

import styles from './project3.module.css';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Image from "next/image";

export default function Project3() {
    const [selectedImage, setSelectedImage] = useState(null);
    const scrollPositionRef = useRef(0);
    const headerVideoRef = useRef(null);
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

    // 打开图片弹窗：记录当前滚动位置并锁定页面滚动
    const openImageModal = (image) => {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        scrollPositionRef.current = scrollY;

        document.body.style.position = 'fixed';
        document.body.style.top = `-${scrollY}px`;
        document.body.style.left = '0';
        document.body.style.right = '0';
        document.body.style.overflow = 'hidden';

        setSelectedImage(image);
    };

    // 关闭图片弹窗：恢复页面滚动到原来位置
    const closeModal = () => {
        const scrollY = scrollPositionRef.current || 0;

        setSelectedImage(null);

        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';

        window.scrollTo(0, scrollY);
    };

    // ESC 键关闭图片弹窗
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

    const images = [
        "/projects/ux_design/project3/1.jpg",
        "/projects/ux_design/project3/2.jpg",
        "/projects/ux_design/project3/3.jpg",
        "/projects/ux_design/project3/4.jpg",
        "/projects/ux_design/project3/5.jpg",
        "/projects/ux_design/project3/6.jpg",
        "/projects/ux_design/project3/7.jpg",
        "/projects/ux_design/project3/8.jpg",
        "/projects/ux_design/project3/9.jpg",
        "/projects/ux_design/project3/10.jpg",
        "/projects/ux_design/project3/11.jpg",
        "/projects/ux_design/project3/12.jpg",
        "/projects/ux_design/project3/13.jpg",
        "/projects/ux_design/project3/14.jpg",
        "/projects/ux_design/project3/15.jpg",
        "/projects/ux_design/project3/16.jpg",
        "/projects/ux_design/project3/17.jpg",
    ];

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
                setIsFullscreen(true);
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
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
        showControlsBar();
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

        if (isDragging) {
            document.addEventListener('mousemove', handleGlobalMouseMove);
            document.addEventListener('mouseup', handleGlobalMouseUp);
        }

        // 监听全屏状态变化
        const handleFullscreenChange = () => {
            const isNowFullscreen = !!document.fullscreenElement;
            const wasFullscreen = wasFullscreenRef.current;
            wasFullscreenRef.current = isNowFullscreen;
            setIsFullscreen(isNowFullscreen);
            
            // 进入全屏时，立即显示控制栏
            if (isNowFullscreen) {
                setShowControls(true);
                // 清除之前的隐藏定时器
                if (hideControlsTimeoutRef.current) {
                    clearTimeout(hideControlsTimeoutRef.current);
                }
            } else if (wasFullscreen && !isNowFullscreen) {
                // 退出全屏时，滚动回到视频section
                setTimeout(() => {
                    const videoSection = document.querySelector(`.${styles.processVideoSection}`);
                    if (videoSection) {
                        videoSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
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
    }, [isDragging, isFullscreen]);

    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <h1 className={styles.title}>DANIEL DESIGN</h1>
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/ux_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <video
                    ref={headerVideoRef}
                    id="project3Video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    
                    className={styles.video}
                >
                    <source src="https://danieldesignvideo.org/videos/GuavaH.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                 className={styles.fullscreenButton}
                 onClick={() => {
                    const video = headerVideoRef.current;
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
                    }
                 }}
                >
                 <Image src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} width={1000} height={1000} />
                 </button>
            </section>




             {/* Process Video Section */}
            <section className={styles.processVideoSection}>
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
                            <source src="https://danieldesignvideo.org/videos/GuavaUXvideo.mp4" type="video/mp4" />
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




        <div className={styles.sectionSeparator}>

               

            </div>



            {/* Image Gallery Section - click to open modal */}
            <section className={styles.imageGallerySection}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={styles.imageContainer}
                        onClick={() => openImageModal(image)}
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

             {/* Portotype Video Section */}
            <section className={styles.PortotypeVideoSection}>
                <div className={styles.PortotypevideoWrapper}>
                    <video className={styles.PortotypeVideo} 
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls>
                    <source src="https://danieldesignvideo.org/videos/GuavaScreenRecording.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <div className={styles.sectionSeparator}>

                <div className={styles.sectionSeparatorline}></div>

            </div>



            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>
                        <Link href="/ux_design/projects/project1">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project1/1.jpg" alt="Project 1 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>

                        <Link href="/ux_design/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
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
                <h1 className={styles.comeBackTitle}>DANIEL DESIGN</h1>
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

            {/* Image Modal */}
            {selectedImage && (
                <div className={styles.modal} onClick={closeModal}>
                    <Image
                        src={selectedImage}
                        alt="Full Screen"
                        width={2560}
                        height={1440}
                        className={styles.fullScreenImage}
                    />
                </div>
            )}
        </div>
    );
}
    const openModal = (image) => setSelectedImage(image);
    const closeModal = () => setSelectedImage(null);

    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <h1 className={styles.title}>DANIEL DESIGN</h1>
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/ux_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <video
                    ref={headerVideoRef}
                    id="project3Video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    
                    className={styles.video}
                >
                    <source src="https://danieldesignvideo.org/videos/GuavaH.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                 className={styles.fullscreenButton}
                 onClick={() => {
                    const video = headerVideoRef.current;
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
                    }
                 }}
                >
                 <Image src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} width={1000} height={1000} />
                 </button>
            </section>




             {/* Process Video Section */}
            <section className={styles.processVideoSection}>
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
                            <source src="https://danieldesignvideo.org/videos/GuavaUXvideo.mp4" type="video/mp4" />
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




        <div className={styles.sectionSeparator}>

               

            </div>



            {/* Image Gallery Section */}
            <section className={styles.imageGallerySection}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer} onClick={() => openModal(image)}>
                        <Image src={image} alt={`Project Image ${index + 1}`} width={2560} height={1440} className={styles.projectImage} />
                    </div>
                ))}
            </section>

            {/* Full-Screen Modal */}
            {selectedImage && (
                <div className={styles.modal} onClick={closeModal}>
                    <Image src={selectedImage} alt="Full Screen" width={2560} height={1440} className={styles.fullScreenImage} onClick={closeModal} />
                </div>
            )}

             {/* Portotype Video Section */}
            <section className={styles.PortotypeVideoSection}>
                <div className={styles.PortotypevideoWrapper}>
                    <video className={styles.PortotypeVideo} 
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls>
                    <source src="https://danieldesignvideo.org/videos/GuavaScreenRecording.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </section>

            <div className={styles.sectionSeparator}>

                <div className={styles.sectionSeparatorline}></div>

            </div>



            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>
                        <Link href="/ux_design/projects/project1">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project1/1.jpg" alt="Project 1 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>

                        <Link href="/ux_design/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
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
                <h1 className={styles.comeBackTitle}>DANIEL DESIGN</h1>
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


