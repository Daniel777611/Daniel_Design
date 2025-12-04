"use client"; // Enables client-side interactivity

import styles from './project2.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from "next/image";

export default function Project1() {
    const videoRef = useRef(null);
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "/projects/industrial_design/project2/1.jpg",
        "/projects/industrial_design/project2/2.jpg",
        "/projects/industrial_design/project2/3.jpg",
        "/projects/industrial_design/project2/4.jpg",
        "/projects/industrial_design/project2/5.jpg",
        "/projects/industrial_design/project2/6.jpg",
        "/projects/industrial_design/project2/7.jpg",
        "/projects/industrial_design/project2/8.jpg",
        "/projects/industrial_design/project2/9.jpg",
        "/projects/industrial_design/project2/10.jpg",
        "/projects/industrial_design/project2/11.jpg",
        "/projects/industrial_design/project2/12.jpg",
        "/projects/industrial_design/project2/13.jpg",
        "/projects/industrial_design/project2/14.jpg",
        "/projects/industrial_design/project2/15.jpg",
        "/projects/industrial_design/project2/16.jpg",
        "/projects/industrial_design/project2/17.jpg",
        "/projects/industrial_design/project2/18.jpg",
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
                        <li><Link href="/industrial_design/#project-gallery">Project</Link></li>
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
              
                className={styles.video}>
                    <source src="https://danieldesignvideo.org/videos/Zo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button className={styles.fullscreenButton} onClick={playFullScreen}>
                    <Image src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} width={1000} height={1000} />
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


                        <Link href="/industrial_design/projects/project3">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/industrial_design/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
                                    {/*<h3 className={styles.galleryItemTitle}>Project 3</h3>*/}
                                </div>
                            </Link>



                        <Link href="/industrial_design/projects/project4">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/industrial_design/project4/1.jpg" alt="Project 4 Cover" className={styles.galleryImage} width={800} height={600} />
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