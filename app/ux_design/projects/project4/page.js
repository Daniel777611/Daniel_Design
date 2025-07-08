"use client"; // Enables client-side interactivity

import styles from './project4.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from "next/image";

export default function Project3() {
    const videoRef = useRef(null);

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
                        <li><Link href="/ux_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
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
                    <source src="https://pub-4d02e3e2fa9d453e960151fde48d51ff.r2.dev/videos/Annship_webe.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
            </section>


            {/* Interactive Website Section */}
            <section className={styles.webEmbedSection}>
            
            <iframe
                className={styles.webEmbedFrame}
                src="https://www.annship.com/"
                title="Live Website"
                allowFullScreen
            ></iframe>
            </section>


             {/* Process Video Section 
            <section className={styles.processVideoSection}>
                <div className={styles.videoWrapper}>
                    <video className={styles.processVideo} controls>
                    <source src="https://danieldesignvideo.org/videos/GuavaUXvideo.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
            </section>*/}




        <div className={styles.sectionSeparator}>

               

            </div>



            {/* Image Gallery Section 
            <section className={styles.imageGallerySection}>
                {images.map((image, index) => (
                    <div key={index} className={styles.imageContainer} onClick={() => openModal(image)}>
                        <Image src={image} alt={`Project Image ${index + 1}`} width={2560} height={1440} className={styles.projectImage} />
                    </div>
                ))}
            </section>*/}

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

             {/* Portotype Video Section 
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
            </section>*/}

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

                        <Link href="/ux_design/projects/project3">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project3/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
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