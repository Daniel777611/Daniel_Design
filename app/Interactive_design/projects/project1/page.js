"use client"; // Enables client-side interactivity

import styles from './project1.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Image from "next/image";

export default function Project1() {
    const [selectedImage, setSelectedImage] = useState(null);

    const images = [
        "/projects/interactive_design/project1/1.jpg",
        "/projects/interactive_design/project1/2.jpg",
        "/projects/interactive_design/project1/3.jpg",
        "/projects/interactive_design/project1/4.jpg",
        "/projects/interactive_design/project1/5.jpg",
        "/projects/interactive_design/project1/6.jpg",
        "/projects/interactive_design/project1/7.jpg",
        "/projects/interactive_design/project1/8.jpg",
        "/projects/interactive_design/project1/9.jpg",
        "/projects/interactive_design/project1/10.jpg",
        "/projects/interactive_design/project1/11.jpg",
        "/projects/interactive_design/project1/12.jpg",
        "/projects/interactive_design/project1/13.jpg",
        "/projects/interactive_design/project1/14.jpg",
        "/projects/interactive_design/project1/15.jpg",
        "/projects/interactive_design/project1/16.jpg",
    ];

    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                <Link href="/">
                    <h1 className={styles.title}>DANIEL DESIGN</h1>
                </Link>

                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="/Interactive_design/#project-gallery">Project</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* Process Video Section */}
            <section className={styles.processVideoSection}>
                <div className={styles.videoWrapper}>
                    <video className={styles.processVideo} controls>
                    <source src="https://danieldesignvideo.org/Robotaxi_1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                    </video>
                </div>
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

                        <Link href="/Interactive_design/projects/project2">
                            <div className={styles.galleryItem}>
                                <Image src="/projects/interactive_design/project2/1.jpg" alt="Project 2 Cover" width={800} height={600} className={styles.galleryImage} />
                            </div>
                        </Link>


                        <Link href="/Interactive_design/projects/project3">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/interactive_design/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
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