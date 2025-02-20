"use client"; // Enables client-side interactivity

import styles from './project2.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

export default function Project2() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "/projects/project2/1.jpg",
        "/projects/project2/2.jpg",
        "/projects/project2/3.jpg",
        "/projects/project2/4.jpg",
        "/projects/project2/5.jpg",
        "/projects/project2/6.jpg",
        "/projects/project2/7.jpg",
        "/projects/project2/8.jpg",
        "/projects/project2/9.jpg",
        "/projects/project2/10.jpg",
        "/projects/project2/11.jpg",
        "/projects/project2/12.jpg",
        "/projects/project2/13.jpg",
        "/projects/project2/14.jpg",
        "/projects/project2/15.jpg",
        "/projects/project2/16.jpg",
        "/projects/project2/17.jpg",
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
                        <li><Link href="/#project-gallery">Project</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
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

            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                    <div className={styles.galleryGrid}>
                        <Link href="/projects/project1">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/project1/1.jpg" alt="Project 1 Cover" className={styles.galleryImage} width={800} height={600} />
                            </div>
                        </Link>

                        <Link href="/projects/project3">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <div className={styles.sectionSeparator}></div>

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
                    <Link href="/contact">
                        <button className={styles.contactButton}>Contact</button>
                    </Link>
                </div>
            </footer>
        </div>
    );
}