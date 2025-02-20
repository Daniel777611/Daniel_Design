"use client"; // Enables client-side interactivity

import styles from './project3.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';

export default function Project3() {
    const videoRef = useRef(null);

    const images = [
        "/projects/project3/1.jpg",
        "/projects/project3/2.jpg",
        "/projects/project3/3.jpg",
        "/projects/project3/4.jpg",
        "/projects/project3/5.jpg",
        "/projects/project3/6.jpg",
        "/projects/project3/7.jpg",
        "/projects/project3/8.jpg",
        "/projects/project3/9.jpg",
        ]; // Array of image paths

        const [selectedImage, setSelectedImage] = useState(null); // Modal state


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
        }
    };

    const handleExitFullScreen = () => {
        const video = videoRef.current;
        if (!document.fullscreenElement && video) {
            video.muted = true;
        }
    };


    const openModal = (image) => {setSelectedImage(image);};

    const closeModal = () => {setSelectedImage(null);};



    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <h1 className={styles.title}>DANIEL DESIGN</h1>
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><a href="/#project-gallery">Project</a></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <video
                    ref={videoRef}
                    id="project1Video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.video}
                >
                    <source src="/videos/Illuminated Distance.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                 className={styles.fullscreenButton}
                 onClick={playFullScreen}
                >
                 <img src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} />
                 </button>

            </section>


             {/* Image Gallery Section */}
             <section className={styles.imageGallerySection}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer} onClick={() => openModal(image)}>
                        <img src={image} alt={`Project Image ${index + 1}`} className={styles.projectImage} />
                    </div>
                ))}
            </section>


             {/* Full-Screen Modal */}
             {selectedImage && (
                <div className={styles.modal} onClick={closeModal}>
                    <img
                        src={selectedImage}
                        alt="Full Screen"
                        className={styles.fullScreenImage}
                    />
                </div>
            )}



             {/* ProjectGallery Section */}
             <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                        {/*<h2 className={styles.galleryTitle}>My Projects</h2>*/}
                        <div className={styles.galleryGrid}>

                            <Link href="/projects/project1">
                                <div className={styles.galleryItem}>
                                    <img src="/projects\project1\1.jpg" alt="Project 1 Cover" className={styles.galleryImage} />
                                    {/*<h3 className={styles.galleryItemTitle}>Project 1</h3>*/}
                                </div>
                            </Link>

                            <Link href="/projects/project2">
                                <div className={styles.galleryItem}>
                                    <img src="/projects\project2\1.jpg" alt="Project 2 Cover" className={styles.galleryImage} />
                                     {/*<h3 className={styles.galleryItemTitle}>Project 2</h3>*/}
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
                <Link href="/contact">
                    <button className={styles.contactButton}>Contact</button>
                </Link>
            </div>
        </footer>

        </div>
    );
}
