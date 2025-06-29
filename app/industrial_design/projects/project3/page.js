"use client"; // Enables client-side interactivity

import styles from './project3.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from "next/image";

export default function Project3() {
    const videoRef = useRef(null);

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

    const [selectedImage, setSelectedImage] = useState(null);

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
                        <li><Link href="/industrial_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            

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
                <div className={styles.modal} onClick={(e) => {
                    if (e.target.classList.contains(styles.modal)) {
                        closeModal();
                    }
                }}>
                    <Image src={selectedImage} alt="Full Screen" width={2560} height={1440} className={styles.fullScreenImage} />
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
}