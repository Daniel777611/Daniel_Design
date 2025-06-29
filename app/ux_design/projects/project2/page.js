"use client"; // Enables client-side interactivity

import styles from './project2.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

export default function Project2() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "/projects/ux_design/project2/1.jpg",
        "/projects/ux_design/project2/2.jpg",
        "/projects/ux_design/project2/3.jpg",
        "/projects/ux_design/project2/4.jpg",
        "/projects/ux_design/project2/5.jpg",
        "/projects/ux_design/project2/6.jpg",
        "/projects/ux_design/project2/7.jpg",
        "/projects/ux_design/project2/8.jpg",
        "/projects/ux_design/project2/9.jpg",
        "/projects/ux_design/project2/10.jpg",
        "/projects/ux_design/project2/11.jpg",
        "/projects/ux_design/project2/12.jpg",
        "/projects/ux_design/project2/13.jpg",
        "/projects/ux_design/project2/14.jpg",
        "/projects/ux_design/project2/15.jpg",
        "/projects/ux_design/project2/16.jpg",
        "/projects/ux_design/project2/17.jpg",
    ];

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
                        <Link href="/ux_design/projects/project1">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project1/1.jpg" alt="Project 1 Cover" className={styles.galleryImage} width={800} height={600} />
                            </div>
                        </Link>

                        <Link href="/ux_design/projects/project3">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/ux_design/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <div className={styles.sectionSeparator}></div>



             <div className={styles.sectionSeparator}>

                <div className={styles.sectionSeparatorline}></div>

            </div>


            

            <section id="comeBack" className={styles.comeBack}>
                <div>
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
        </div>
    );
}