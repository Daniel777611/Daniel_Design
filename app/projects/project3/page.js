"use client"; // Enables client-side interactivity

import styles from './project3.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from "next/image";

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
                        <li><Link href="/#project-gallery">Project</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Video Section */}
            <section className={styles.videoSection}>
                <video
                    ref={videoRef}
                    id="project3Video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className={styles.video}
                >
                    <source src="https://pub-4d02e3e2fa9d453e960151fde48d51ff.r2.dev/videos/Illuminated_Distance.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                <button
                 className={styles.fullscreenButton}
                 onClick={playFullScreen}
                >
                 <Image src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} width={1000} height={1000} />
                 </button>
            </section>

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

            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>
                        <Link href="/projects/project1">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/project1/1.jpg" alt="Project 1 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>

                        <Link href="/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

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