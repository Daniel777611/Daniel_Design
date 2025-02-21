"use client"; // Enables client-side interactivity

import styles from './contact.module.css';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Image from "next/image";

export default function Contact() {
   
    const [expandedSections, setExpandedSections] = useState({});
    const [expandedWorkSections, setExpandedWorkSections] = useState({});
    const [expandedProjectSections, setExpandedProjectSections] = useState({});
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    
   
    
        
    

    


    const toggleWorkSection = (section) => {
        setExpandedWorkSections((prev) => ({
            ...prev,
            [section]: !prev[section], // 切换单个工作经验的展开状态
        }));
    };
    
    const toggleProjectSection = (section) => {
        setExpandedProjectSections((prev) => ({
            ...prev,
            [section]: !prev[section], // 切换单个项目经验的展开状态
        }));
    };
        
        
    function toggleSection(section) {
        setExpandedSections((prev) => ({ ...prev, [section]: !prev[section], }));

        const toggleSection = (section) => {
            setExpandedSections((prev) => ({
                ...prev,
                [section]: !prev[section],
            }));
        };
        
    }



    const handlePlayPause = () => {
        const video = videoRef.current;
        if (video) {
            if (video.paused) {
                video.play();
                setIsPlaying(true);
            } else {
                video.pause();
                setIsPlaying(false);
            }
        }
    };

    

    const handleVideoEnd = () => {
        setIsPlaying(false); // Show play button again after video ends
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
                <div className={styles.videoContainer}>
                    <video
                        ref={videoRef}
                        id="portfolioVideo"
                        controls
                        crossOrigin="use-credentials"

                        className={styles.video}
                        onEnded={handleVideoEnd}
                        onPause={() => setIsPlaying(false)}
                        onPlay={() => setIsPlaying(true)}
                    >
                        <source src="https://danieldesignvideo.org/videos/Daniel_Design_De.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {!isPlaying && (
                        <button
                            className={styles.playButton}
                            onClick={handlePlayPause}
                        >
                            <Image  src="/icon/videoPlay2.png" alt="Play Video" className={styles.playIcon} width={1000} height={1000}/>
                        </button>
                    )}
                </div>
            </section>



         {/* Left Column */}
        {/* Middle Section */}
        <div className={styles.resumeWrapper}>
        <section className={styles.middleSection}>
                <div className={styles.leftColumn}>
                    <h2 className={styles.level1}>Daniel Wang</h2>
                    <div className={styles.separator1}></div>
                    <h2 className={styles.level1}>UX Designer</h2>
                    <div className={styles.separator3}></div>
                    <p className={styles.content}>wangding070@gmail.com</p>
                    <p className={styles.content}>9122726623</p>
                    <div className={styles.separator2}></div>
                    <div className={styles.education}>
                    
                        <h2 className={styles.level1}>Savannah College of Art and Design (SCAD)</h2>
                        <p className={styles.level2}>Sep 2024 - Now</p>
                        <p className={styles.level2}>Interactive Design</p>
                        <p className={styles.content}>Master of Arts</p>
                        <p className={styles.content}>GPA: 3.9 / 4.0</p>
                        <div className={styles.educationSpace}></div>
                        <h2 className={styles.level1}>Savannah College of Art and Design (SCAD)</h2>
                        <p className={styles.level2}>Sep 2018 - May 2021</p>
                        <p className={styles.level2}>Industrial Design</p>
                        <p className={styles.content}>Master of Arts</p>
                        <p className={styles.content}>GPA: 3.9 / 4.0</p>
                    </div>
                </div>


                {/* Right Column */}
                 <div className={styles.rightColumn}>
                    {/* Work Experience Section */}
                    
                    <h2 className={styles.sectionTitle}>Work Experience</h2>
                    <div className={styles.sectionSeparator}></div>
                
                    {[
                        { title: "WAYDOO", date: "Aug 2023 - July 2024", 
                            position: "Design Group Leader", 
                            work: "At Waydoo, a company specializing in electric hydrofoil surfboards and marine mobility solutions, I led the overall design direction in both interaction and industrial design. I oversaw the development of the marine safety geofence feature in the Waydoo app, enhancing user experience. I also managed the CMF design of the third-generation electric hydrofoil surfboard and led the concept development for the upcoming hydrofoil motorcycle, ensuring a cohesive and innovative design across all products." },
                        { title: "Yaxin Creative Design", date: "Aug 2022 - Aug 2023", 
                            position: "Designe Manager", 
                            work: "At Yaxin Creative, a design company I founded, I led a multidisciplinary team consisting of industrial designers, UX/UI designers, and software developers. Our team collaborated on diverse projects, including smart hardware, digital platforms, and branding solutions.I was responsible for the overall design direction and hands-on execution in both industrial and interaction design. My work included designing a smart fishing boat, developing a smart scheduling system for a high-land coffee shop, and creating branding and visual identity for startups. I ensured a seamless integration of hardware and software design, leading the team to deliver innovative and user-centered solutions." },
                        { title: "MUROBOTIX", date: "Dec 2021 - July 2022", position: "UX Designer / Industrial Designer", 
                            work: "At MUROBOTIX, a startup specializing in intelligent agricultural robotics, I was the first full-time UX and industrial designer, leading the design of the company’s first batch production agricultural robot with a strong focus on HCI. I designed the touchscreen UI with intuitive gesture-based controls, adaptive information hierarchy, and real-time feedback to enhance human-machine interaction in field operations. I also led the mobile app design for remote robot coordination and developed the XPOL cloud-based farm management system, ensuring a seamless transition between physical and digital interfaces. In industrial design, I optimized the robot’s ergonomics and usability, ensuring intuitive operation and accessibility in complex agricultural environments." },
                        { title: "Lime MicroMobility (Inter)", date: "Mar 2018 - May 2018", 
                            position: "Industrial Designer", 
                            work: "At Lime MicroMobility, I worked as an Industrial Design Intern, contributing to the design of Lime Scooter 1.0, the company’s first independently developed shared e-scooter. Collaborating with mechanical engineers, product managers, and engineers, I translated functional requirements into the vehicle's form. I used hand sketches, 3D modeling, and rendering to develop and refine the design, resulting in a durable and user-friendly micro-mobility product deployed in cities like Los Angeles, San Diego, and Paris." }
                        ].map((item, index) => (
                            <div key={index} className={styles.experienceItem}>
                                <h3
                                    onClick={() => toggleWorkSection(`work-${index}`)}
                                    className={styles.experienceTitle}>
                                    <span>{item.title}</span>
                                    <span className={styles.date}>{item.date}</span>
                                    <Image
                                        src={expandedWorkSections[`work-${index}`] ? "/icon/Folde.png" : "/icon/Unfold.png"}
                                        alt="Toggle"
                                        className={styles.toggleIcon} width={800} height={600}
                                    />
                                </h3>
                                {expandedWorkSections[`work-${index}`] && (
                                <div className={styles.expandedContent}>
                                    <div className={styles.position}>
                                        <span className={styles.label}>Position:</span> 
                                        <span>{item.position}</span>
                                    </div>
                                    <div className={styles.work}>
                                        <span className={styles.label}>Work:</span> 
                                        <span>{item.work}</span>
                                    </div>
                                </div>
                            )}
                                <div className={styles.itemSeparator}></div>
                            </div>
                    ))}

{/*<div className={styles.sectionSpace}></div>
<div className={styles.sectionSeparator}></div>*/}
                    {/* Main Project Experience Section */}
                    <div className={styles.sectionSpace}></div>
                    <h3 className={styles.sectionTitle}>Main Project Experience</h3>
                    <div className={styles.sectionSeparator}></div>
                    {[
                        { title: "MUROBOTIX TracTouch HCI System", 
                            position: "Lead UX/UI Designer", 
                            work: "As the first full-time UX/ID designer at Murobotix, I led the development of the TracTouch HCI system, designing a touch-screen user interface for a vineyard operation robot. My responsibilities included comprehensively understanding the product's requirements, leading brainstorming sessions, and managing the entire design cycle from concept to final presentation. The user interface I developed was recognized as superior to existing market offerings, reflecting my ability to deliver innovative and functional design solutions under tight deadlines." },
                        { title: "XPOL Smart Farm Management", 
                            position: "UX Design Lead", 
                            work: "As the UX Designer for the XPOL Smart Farm Management project, I was responsible for developing user interfaces that streamlined the management and monitoring of farm operations. My work included detailed user flow analyses, prototype development for real-time data visualization tools, and iterative testing to refine the interfaces for optimal user engagement and efficiency. I implemented design solutions that facilitated easier navigation and interaction, improving the user experience for farmers managing diverse agricultural assets." },
                            { title: "Waydoo App Marine Safety Fence", 
                            position: "UX Design Lead", 
                            work: "At Waydoo, I designed the interaction elements for the maritime safety electronic fence feature within the Waydoo app. My work focused on conceptualizing and implementing the user interface, ensuring seamless integration with real-time location tracking technologies. This feature enhances user safety by providing dynamic boundary alerts, enabling a safer and more controlled water sports experience. My efforts significantly improved the app’s functionality and user satisfaction, emphasizing usability in aquatic environments." },
                        { title: "Agricultural Tractor Industrial Design 2021", 
                            position: "Industrial Designer", 
                            work: "In the Agricultural Tractor Industrial Design project at Murobotix, I led the redesign of a smart tractor, focusing on enhancing its ergonomics, usability, and integration of advanced technologies. My responsibilities included the entire design process from conceptual sketches to detailed 3D modeling and prototype development. I incorporated features like GPS-based navigation and automated field monitoring systems, significantly improving operational efficiency and precision in farming tasks. This project aligned the tractor’s design with the evolving technological demands of modern agriculture, enhancing its market acceptance and usability for farmers." }
                        
                    ].map((item, index) => (
                        <div key={index} className={styles.experienceItem}>
                            <h3
                                onClick={() => toggleProjectSection(`project-${index}`)}
                                className={styles.experienceTitle}>
                                <span>{item.title}</span>
                                <span className={styles.date}>{item.date}</span>
                                <Image
                                    src={expandedProjectSections[`project-${index}`] ? "/icon/Folde.png" : "/icon/Unfold.png"}
                                    alt="Toggle"
                                    className={styles.toggleIcon} width={800} height={600}
                                />
                            </h3>
                            {expandedProjectSections[`project-${index}`] && (
                            <div className={styles.expandedContent}>
                                <div className={styles.position}>
                                    <span className={styles.label}>Position:</span> 
                                    <span>{item.position}</span>
                                </div>
                                <div className={styles.work}>
                                    <span className={styles.label}>Work:</span> 
                                    <span>{item.work}</span>
                                </div>
                            </div>
                        )}
                            <div className={styles.itemSeparator}></div>
                        </div>
                    ))}

                    {/* Skills Section */}
                    <div className={styles.sectionSpace}></div>
                    
                    
                    <h3
                        className={`${styles.skillsSectionTitle} ${styles.clickable}`}
                            onClick={() => toggleSection("skills")}
>                          
                        Skills {" "}
                        
                        <Image src={ expandedSections.skills ? "/icon/Folde.png": "/icon/Unfold.png"}
                        alt="Toggle Icon"
                        className={styles.skillsToggleIcon} width={800} height={600}/>
                       
                    </h3>
                    <div className={styles.skillsSeparatorTop}></div> {/* Adds bottom line when expanded */}
                        {expandedSections.skills && (
                            <div className={styles.expandedSkillsContent}>
                                {[
                                    {
                                        skill: "Design Thinking",
                                        tools: [],
                                    },
                                    {
                                        skill: "Design Research",
                                        tools: [],
                                    },
                                    {
                                        skill: "Prototyping",
                                        tools: [],
                                    },
                                    {
                                        skill: "3D Modeling and Rendering",
                                        tools: ["Rhino", "KeyShot", "C4D", "Blender"],
                                    },
                                    {
                                        skill: "2D Graphic",
                                        tools: ["Illustrator", "Photoshop", "InDesign"],
                                    },
                                    {
                                        skill: "User Interface",
                                        tools: ["Figma", "XD"],
                                    },
                                    {
                                        skill: "Motion and Video",
                                        tools: ["After Effects", "Premiere"],
                                    },
                                    {
                                        skill: "Coding and Development",
                                        tools: ["PHP", "CSS", "HTML", "JavaScript", "C++", "Processing", "Arduino"],
                                    },
                                ].map((item, index) => (
                                    <div key={index}>
                                        <h4 className={styles.skillTitle}>{item.skill}</h4>
                                        {item.tools.length > 0 && (
                                            <ul className={styles.skillTools}>
                                                {item.tools.map((tool, toolIndex) => (
                                                    <li key={toolIndex}>{tool}</li>
                                                ))}
                                            </ul>
                                        )}
                                         
                                    </div>
                                    
                                ))}
                                 <div className={styles.skillsSeparator}></div> {/* Adds bottom line when expanded */}
                            </div>
                                        )}
                                
                                        </div>
                         </section>
                         </div>

                         

             {/* ProjectGallery Section */}
             <section id="comeBack" className={styles.comeBack}>
                <div >
                <Link href="/">
                    <h1 className={styles.comeBackTitle}>DANIEL DESIGN</h1>
                </Link>
                </div>
            </section>
            
            {/* Footer */}
            <footer className={styles.footer}>
                <Link href="/#project-gallery">
                    <button className={styles.contactButton}>Projects</button>
                </Link>
            </footer>
        </div>
    );
}

