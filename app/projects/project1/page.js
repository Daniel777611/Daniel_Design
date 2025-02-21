"use client"; // Enables client-side interactivity

import styles from './project1.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from "next/image";

export default function Project1() {
    const videoRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "/projects/project1/1.jpg",
        "/projects/project1/2.jpg",
        "/projects/project1/3.jpg",
        "/projects/project1/4.jpg",
        "/projects/project1/5.jpg",
        "/projects/project1/6.jpg",
        "/projects/project1/7.jpg",
        "/projects/project1/8.jpg",
        "/projects/project1/9.jpg",
        "/projects/project1/10.jpg",
        "/projects/project1/11.jpg",
        "/projects/project1/12.jpg",
        "/projects/project1/13.jpg",
        "/projects/project1/14.jpg",
    ]; 

    const playFullScreen = () => {
        const video = videoRef.current;
        if (video) {
            video.currentTime = 0;
            video.muted = false;
            video.play();

            if (video.requestFullscreen) {
                video.requestFullscreen();
            } else if (video.webkitRequestFullscreen) {
                video.webkitRequestFullscreen();
            } else if (video.msRequestFullscreen) {
                video.msRequestFullscreen();
            }

            document.addEventListener("fullscreenchange", handleExitFullScreen);
            document.addEventListener("webkitfullscreenchange", handleExitFullScreen);
            document.addEventListener("msfullscreenchange", handleExitFullScreen);
        }
    };

    const handleExitFullScreen = () => {
        const video = videoRef.current;
        if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement && video) {
            video.muted = true;
        }
    };

    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <h1 className={styles.title}>DANIEL DESIGN</h1>
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <video ref={videoRef} id="project1Video" autoPlay 
                loop 
                muted 
                playsInline 
                controls 
                crossOrigin="anonymous"

                className={styles.video}>
                    <source src="https://danieldesignvideo.org/videos/Murobotix_Project.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button className={styles.fullscreenButton} onClick={playFullScreen}>
                    <Image src="/icon/videoPlay2.png" alt="Play Video" width={1000} height={1000}/>
                </button>
            </section>

            {/* Image Gallery Section */}
            <section className={styles.imageGallerySection}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer} onClick={() => setSelectedImage(image)}>
                        <Image src={image} alt={`Project Image ${index + 1}`} width={2560} height={1440} className={styles.projectImage} />
                    </div>
                ))}
            </section>


            



             {/* ProjectGallery Section */}
             <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>

                        <Link href="/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>


                        <Link href="/projects/project3">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
                                    {/*<h3 className={styles.galleryItemTitle}>Project 3</h3>*/}
                                </div>
                            </Link>



                    </div>
                </div>
            </section>

        

        
            <div className={styles.sectionSeparator}></div>

            <section id="comeBack" className={styles.comeBack}>

            <div >
            <Link href="/">
                <h1 className={styles.comeBackTitle}>DANIEL DESIGN</h1>
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
                <div className={styles.modal} onClick={(e) => {
                    if (e.target.classList.contains(styles.modal)) {
                        setSelectedImage(null);
                    }
                }}>
                    <Image src={selectedImage} alt="Full Screen" width={2560} height={1440} className={styles.fullScreenImage} />
                </div>
            )}
        </div>
    );
}