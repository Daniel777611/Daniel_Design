"use client"; // Enables client-side interactivity

import Link from 'next/link';
import styles from './ux_design.module.css';
import Image from 'next/image';



export default function HomePage() {
    return (
        <div>
            {/* Top Section */}
            <header className={styles.header}>
                 <Link href="/">
                    <Image src="/image/logo/headlogo.png" alt="DANIEL DESIGN" className={styles.title} width={160} height={40} />
                 </Link>
                <nav>
                    <ul className={styles.navList}>
                        <li><Link href="ux_design/#project-gallery">Projects</Link></li>
                        <li><Link href="/Contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>

            {/* BestProject Section */}
            <section id="Best-project" className={styles.bestProjectSection}>
                
            <Link href="/ux_design/projects/project1">
                <div className={styles.bestProjectContainer}>
                <Image src="/projects/ux_design/project1/1.jpg" alt="Best Project Cover" className={styles.bestProjectImage} width={1920} height={1080}/>
                </div>
                </Link>
                
            </section>



            {/* ProjectGallery Section */}
            <section id="project-gallery" className={styles.gallerySection}>
                <div className={styles.galleryContainer}>
                        {/*<h2 className={styles.galleryTitle}>My Projects</h2>*/}
                        <div className={styles.galleryGrid}>

                            <Link href="/ux_design/projects/project1">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/ux_design/project1/1.jpg" alt="Project 1 Cover" className={styles.galleryImage} width={800} height={600} />
                                    {/*<h3 className={styles.galleryItemTitle}>Project 1</h3>*/}
                                </div>
                            </Link>

                            <Link href="/ux_design/projects/project2">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/ux_design/project2/1.jpg" alt="Project 2 Cover" className={styles.galleryImage} width={800} height={600}/>
                                     {/*<h3 className={styles.galleryItemTitle}>Project 2</h3>*/}
                                </div>
                            </Link>

                            <Link href="/ux_design/projects/project3">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/ux_design/project3/1.jpg" alt="Project 3 Cover" className={styles.galleryImage} width={800} height={600} />
                                    {/*<h3 className={styles.galleryItemTitle}>Project 3</h3>*/}
                                </div>
                            </Link>


                            <Link href="/ux_design/projects/project4">
                                <div className={styles.galleryItem}>
                                    <Image src="/projects/ux_design/project4/1.jpg" alt="Project 4 Cover" className={styles.galleryImage} width={800} height={600} />
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
                <Link href="/Contact">
                    <button className={styles.contactButton}>Contact</button>
                </Link>
            </footer>
        </div>
    );
}