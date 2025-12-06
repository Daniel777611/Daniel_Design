"use client"; // Enables client-side interactivity

import Link from 'next/link';
import styles from './home.module.css';
import { useRef } from 'react';
import Image from 'next/image';



export default function HomePage() {
    const videoRef = useRef(null); // Use React ref to control the video element

    // Handle Play Full Screen
    function playFullScreen() {
        const video = videoRef.current;

        if (video) {
           
           video.currentTime = 0;

            // Unmute the video
            video.muted = false;

            // Request full-screen mode
            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen(); // Safari
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen(); // IE/Edge
            }

            // Play the video
            video.play();

            // Listen for exiting full-screen to mute the video again
            document.addEventListener('fullscreenchange', handleExitFullScreen);
            document.addEventListener('webkitfullscreenchange', handleExitFullScreen);
            document.addEventListener('msfullscreenchange', handleExitFullScreen);
        }
    }

    // Handle Exit Full Screen
    function handleExitFullScreen() {
        const video = videoRef.current;

        // Check if full-screen mode has exited
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
            // Mute the video when exiting full-screen
            if (video) {
                video.muted = true;
            }

            // Remove the event listeners
            document.removeEventListener('fullscreenchange', handleExitFullScreen);
            document.removeEventListener('webkitfullscreenchange', handleExitFullScreen);
            document.removeEventListener('msfullscreenchange', handleExitFullScreen);
        }
    }

    // Handle Video End
    function handleVideoEnd() {
        const video = videoRef.current;

        // Exit full-screen mode when the video ends
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        // Mute the video and restart playback
        if (video) {
            video.muted = true;
            video.play();
        }
    }

    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                 <Link href="/">
                    <Image src="/image/logo/headlogo.png" alt="DANIEL DESIGN" className={styles.title} width={160} height={40} />
                 </Link>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/ux_design">UX Design</Link></li>
                        {/*<li><Link href="/ux_engineering">UX Engineering</Link></li>*/}
                        <li><Link href="/Interactive_design">Interactive Design</Link></li>
                        <li><Link href="/industrial_design">Industrial Design</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <video
                    ref={videoRef}
                    id="portfolioVideo"
                    autoPlay
                    loop
                    muted
                    playsInline
                  
                    className={styles.video}
                    onEnded={handleVideoEnd}
                   
                >
                    <source src="https://danieldesignvideo.org/videos/Daniel_Design_Video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                 className={styles.fullscreenButton}
                 onClick={playFullScreen}
                >
                 <Image src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} width={1000} height={1000} />
                 </button>
            </section>


            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                        {/*<h2 className={styles.galleryTitle}>My Projects</h2>*/}
                        <div className={styles.galleryGrid}>

                            <Link href="/ux_design">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/ux_design/cover/1.jpg" alt="uxDesignCover" className={styles.galleryImage} width={800} height={600} />
                                    <div className={styles.overlay}>
                                    <span className={styles.overlayText}>UX Design</span>
                                    </div>
                                </div>
                            </Link>

                             {/*<Link href="/ux_engineering">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/ux_engineering/cover/1.jpg" alt="uxDesignCover" className={styles.galleryImage} width={800} height={600} />
                                    <div className={styles.overlay}>
                                    <span className={styles.overlayText}>UX Engineering</span>
                                    </div>
                                </div>
                            </Link>*/}

                            <Link href="/Interactive_design">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/interactive_design/cover/1.png" alt="interactiveDesignCover" className={styles.galleryImage} width={800} height={600} />
                                    <div className={styles.overlay}>
                                    <span className={styles.overlayText}>Interactive Design</span>
                                    </div>
                                </div>
                            </Link>

                            <Link href="/industrial_design">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/industrial_design/cover/1.jpg" alt="industrialDesignCover" className={styles.galleryImage} width={800} height={600} />
                                    <div className={styles.overlay}>
                                    <span className={styles.overlayText}>Industrial Design</span>
                                    </div>
                                </div>
                            </Link>

                        </div> 
                        
                </div>

                      
                        
                
            </section>

        
                <div className={styles.sectionSeparator}></div>

            <section id="comeBack" className={styles.comeBack}>
                
                <div >
                <Link href="/">
                    <Image 
                        src="/image/logo/headlogo.png" 
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
        
        </div>
    );
}