import { memo, useEffect, useMemo, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { FiArrowDown, FiArrowUpRight } from "react-icons/fi";
import logo from "./assets/mhlogo3.png";
import headshot from "./assets/mhoskins.png";
import loanercart from "./assets/loanercart.png";
import mac from "./assets/mac98.jpg";
import desk from "./assets/mydesk.jpg";
import old from "./assets/oldDrive.jpg";
import setup from "./assets/mysetup.png";
import stock from "./assets/stock.png";
import computerAssets from "./assets/computerassets.jpg";
import deskSetup from "./assets/deskSetup.jpg";
import imageLaptop from "./assets/imagelaptop.jpg";

const resumePdfUrl = `${import.meta.env.BASE_URL}Matthew_Hoskins_Resume.pdf`;

const resumeSections = [
  {
    title: "Contact",
    items: [
      "Matthew Hoskins",
      "mhoskins5150@gmail.com",
      "226-220-5108",
      "github.com/Hosser5150",
      "linkedin.com/in/matthew-hoskins51",
    ],
  },
  {
    title: "Education",
    items: [
      "University of Guelph: Bachelor of Computing Honours, Computer Science (Co-op) | Sep. 2022-Present",
      "Pursuing a minor in Business, with a focus on Marketing and Management courses.",
      "Admitted with entrance Academic Scholarship (90% - 94.9%).",
    ],
  },
  {
    title: "Academic Projects",
    items: [
      "Professor Management Project | Mar. 2023: Created an application in C that used multiple data structures and sorting methods to organize professor and class statistics.",
      "Allowed for creation, deletion, and searching with various filters.",
      "Mancala Game Project | Nov. 2023: Created a version of Mancala in Java using common object-oriented best practices.",
      "Implemented robust error detection and standard test cases for efficient testing.",
    ],
  },
  {
    title: "Personal Projects",
    items: [
      "3JS Website | Nov. 2024-Present: Working to create a personal website that uses 3JS and JavaScript to render a dynamic 3D scene in the browser.",
      "Uses knowledge from previous classes and design knowledge from current ones.",
    ],
  },
  {
    title: "Extra Curricular",
    items: [
      "Team Member - FRC Team Dave | Sep. 2017-Jul. 2021: Worked in the programming sub team to code robot controls using Java.",
      "Gained professional teamwork experience and communication skills.",
      "Competed against hundreds of teams and advanced to the world stage of FRC in Detroit with the team's robust control system.",
      "Team Ambassador - First Lego League | Sep. 2018-May 2020: Helped teams with coding problems in Java and general support, acknowledged for outstanding work.",
      "Gained communication, customer service, issue resolution, and troubleshooting skills.",
    ],
  },
  {
    title: "Work Experience",
    items: [
      "Managed Desktops Student IT Technician - University of Guelph | Apr. 2024-Dec. 2024: Provided support for technologies used by University of Guelph departments.",
      "Diagnosed and resolved issues, tracked tickets, trained clients, replaced failed hardware, installed and configured software/hardware, communicated with vendors, and maintained inventory/support ticket systems.",
      "Gained experience documenting process improvements through SOPs and WIs.",
      "Built experience with Windows and macOS, printing and USB peripherals, malware/antivirus remediation, rebuilding and building systems, Active Directory, and MECM.",
      "Meat Clerk - Sobey's | Aug. 2022-Jan. 2024: Packaged and curated products using an online database while multitasking with the team to support shoppers.",
      "Full Time Student Employee - Piller's Fine Foods | Jul.-Aug. 2021: Worked on the production floor, assisted packaging and shipment, organized database entries, and wrote detailed reports.",
      "Student Employee - Junior Achievement | Jan. 2018-Jun. 2020: Helped create a business with guidance from industry veterans, managing logistics, manufacturing, distribution, deadlines, and sales events.",
      "Summer Employee - Miltera Machining Research Corp | Apr.-Aug. 2018: Tracked and labeled parts independently using an online database.",
    ],
  },
  {
    title: "Technical Skills",
    items: [
      "Languages: C, Java, HTML, CSS, JavaScript, SQL, Python.",
      "Operating Systems: Windows, Linux.",
      "Tools: GitHub, Google and Microsoft suite of products, BMC Footprints, Active Directory, Microsoft Endpoint Config Manager, R Studio.",
      "Other Skills: Communications, Customer Service, Teamwork and Collaboration, Problem Solving.",
    ],
  },
];

const reports = [
  {
    id: "s24",
    shortTitle: "S24",
    title: "Summer 2024 Work Term Report",
    eyebrow: "Work Term 01",
    meta: "Student IT Technician / University of Guelph CCS Managed Desktops",
    accent: "cyan",
    paragraphs: [
      "Greetings, and welcome to my Summer 2024 Coop WT report. I hope through reading this report, I can explain and document the many experiences I have had throughout my first co-op work term. You'll find an overview of the university environment and my experiences working in it, as well as a look at some of the notable things I was involved in. Through this report, I aim to share the highlights of my journey and the growth I've achieved along the way.",
      "I work for the University of Guelph, specifically for the CCS Managed Desktops department. I'm sure the University does not need much of an introduction; founded in 1964 and primarily having strong roots in agriculture and animal research, U of G is one of the most accredited schools in the world. U of G actually has one of the top veterinary programs in the world, and since I had the liberty of starting in OVC before the term ended, I can see why the degree is state of the art. OVC is a sprawling building with lots of professionals working together to care for animals. I found it interesting that OVC itself is actually a combination of multiple different buildings, including the Stewart, Former VMI, ACC, Small Animal Centre, the Main Building (aptly named), and a few more that go by varying names. This lends itself to a very unique interior that has lots of interesting and varied places to go, all under one roof. But back to Johnston Hall, where I spent the bulk of my first term, I worked specifically in MD, a sub-organization of CCS, where our service involves handling all tech-related issues for university employees. At MD, we manage the deployment of all employee computers at the school, using various tools and software to ensure proper management. The area most connected with my job in a CS sense would be network management and information systems. While this isn't computer science in a coding sense, and many might look down on the job, I have come to realize just how integral these roles are to keeping the campus running smoothly.",
      "I had a few different goals for the term that I'll briefly list now. Firstly, I aimed to improve my oral communication skills this term, specifically in customer service, an area where I had previously encountered challenges. I worked towards this goal by actively engaging in more client interactions, such as handling door buzzer requests and meeting requests. I measured my success by following up before closing tickets to gauge their satisfaction and making sure that I encouraged clients to reach out for further help as a courtesy. Secondly, I sought to enhance my time management and multitasking skills during this work term to perform my IT tasks more effectively, particularly with tools like Footprints, Active Directory, and Microsoft Config Manager. I achieved this by planning my days, maintaining a list of critical tasks, and setting reminders to stay on track. My success was measured by the speed and efficiency with which I completed my tickets, ensuring a professional standard throughout. Finally, I aimed to tackle a higher quantity and more complex tasks during the less busy summer term, which allowed me to expand my IT knowledge and improve my problem-solving skills. This involved creating new SOPs and contributing to documentation to streamline handling uncommon tickets. I measured my success by comparing the complexity of new tasks with those I had handled previously and evaluating the improvements in my ability to diagnose and address various issues.",
      "In terms of developing new goals related to my tasks, I tried to take some more initiative with tasks, improve my troubleshooting skills, and enhance the speed at which I could resolve issues. As I took on more complex tasks, I believe I achieved these goals effectively, becoming more comfortable and proficient at the job.",
      "I think that I learned most of the skills I wanted. I would have liked to learn more about networking and IT automation workflows, such as learning more about Office 365 specifics and tools like PowerAutomate. These would represent advanced offshoots of the IT work that I was already doing as a student technician. They would introduce more interesting complexities that could be useful not only in the fall work term but also in future networking and IT system jobs, potentially including QA Engineering or Network Administration roles. Additionally, these skills would provide a good background in a software development environment as well.",
      "Specifically in terms of technologies that I wanted to work with, I listed PowerAutomate, which I didn't get to use, but I also wanted to work with Active Directory, Microsoft Endpoint Manager, Footprints, and the Office 365 Suite of tools that I did use. These tools are integral to IT, networking, and information systems jobs. Footprints is a widely used ticketing system, and understanding it is important for other service jobs as well. Active Directory (AD) and Microsoft Endpoint Configuration Manager (MECM) are critical for managing and securing endpoint devices in many companies. Having a working knowledge of these applications is vital for many networking and IT administration roles I am interested in pursuing. Office 365 is essential because it is one of the most common suites of applications used in professional environments. Skills in navigating and using these apps are valuable for a variety of jobs, even outside of the computer science field, such as management, administration, or analytics roles.",
      "Reflecting on my goals and learning outcomes, I am happy to report significant progress in enhancing my customer service skills and interactions. I believe that I successfully engaged with a variety of clients, leveraging even challenging interactions to gain valuable insights on handling difficult situations. This allowed me to improve my ability to manage client relations and encourage open communication through follow-ups and personal outreach. In terms of work ethic, I consistently met the goal of completing my tickets promptly, with response times averaging only an hour or two, and planned my tasks effectively to accommodate any unforeseen issues. Additionally, I expanded my responsibilities by tackling more complex tasks, including intricate software installations that required multiple steps and attention to detail, as well as troubleshooting. I also collaborated with a fellow Co-op student on developing a new guide for the upcoming term to help new Co-op students, contributing to its content and ensuring its accessibility by creating and proofreading several SOPs for our CCS SharePoint. Overall, I believe that I successfully achieved my goals related to customer service, timeliness, and task complexity, while also contributing meaningfully to the MD team.",
      "An overview of my job would be providing support to clients who pay for the managed desktops services at our school. This could range from helping to install special or paid apps like Adobe Acrobat Pro 2020, providing user guidance and troubleshooting, building Windows devices for users, rebuilding and repairing devices, assisting with the setup of new devices, and helping on-site with various other issues users might encounter. I would say the most unique and interesting aspect of my job was the sheer variety of tasks performed on any given day. Thanks to the ticketing system and the range of problems that occur on campus, I was never bored with my tasks. Some days I was troubleshooting a monitor, while other times I was building a high-end computer or setting up engineering computers. The variety kept the work engaging. I got to visit nearly every building on campus to help with various issues, which was enriching personally, as I usually stick to only the necessary buildings during school terms. The skills needed for the job included having solid foundations in time management, problem compartmentalization, critical thinking, and being friendly and personable with clients. I believe that many of my sociable skills were developed on the job and through previous public-facing roles, such as working at Sobeys, rather than in class. However, my critical thinking skills were definitely honed during coding courses, where I learned to brainstorm multiple solutions to problems and break them down into manageable steps. Being computer-literate was also essential for swift troubleshooting and resolution, and I developed this literacy both through classes and extensive use of computers at home.",
      "I hope that by reading this site, you will understand that IT is not a job to be dismissed lightly; it is integral to the success of organizations. Even in roles that might seem lowly, you can still learn many new skills and hone both personal and technical abilities that will help you succeed in the future, even if you don't plan to pursue a career in IT. Personally, I have greatly enjoyed my first work term here, and I hope that I have conveyed this in a way that is both interesting and insightful, shedding light on my experiences both technically and professionally, as well as personally.",
    ],
    media: [
      {
        src: setup,
        alt: "A multi-monitor desk setup with Footprints and Teams open.",
        caption: "My desk, with teams and footprints open",
      },
      {
        src: stock,
        alt: "Storage shelves with boxes and bins in the stock room.",
        caption:
          "The stock room, where all new parts and computers are kept to be built for clients",
      },
      {
        src: loanercart,
        alt: "Loaner computers in a cart with network and power cables.",
        caption:
          "The loaner cart, which houses loaner PCs that we give out when we are rebuilding client PCs",
      },
    ],
  },
  {
    id: "f24",
    shortTitle: "F24",
    title: "Fall 2024 Work Term Report",
    eyebrow: "Work Term 02",
    meta: "Student IT Technician / University of Guelph OVC Managed Desktops Support",
    accent: "rose",
    paragraphs: [
      "Greetings, and thank you for reading my F24 Workterm report. I hope that in reading this report you are able to better understand my role and responsibilities working at the University during my second work term at the school providing technical support for clients.",
      "For the fall term I returned for the last 4 months of my 8 month term working as a Student IT Technician at the school. I worked my first 4 months in Johnston Hall providing support for clients and this term I was working specifically providing support for OVC clients. As I stated last term, OVC really is a sprawling building that easily makes up for a third of the campus spaces and buildings. It is world renowned for animal sciences and I had the opportunity to support multiple systems there working as an MD Technician in OVC. Similarly to Johnston Hall we provided the same services of helping repair computers and help clients. In terms of the most related areas in computer science to my specific department, I would actually change my answer from last term and say information systems and human computer interaction. I think this because our jobs handle the logistics of how the staff access their computers and we implement many different systems to ensure that the interaction and setup for new university devices is as seamless as possible, which is important as new trends constantly come along and people need to be taught how to use them effectively.",
      "I had a few goals for this term that build on what I had listed in the summer while also trying to foster some new skills too.",
      "Firstly, I wanted to take on more tasks that require physical networking or support. I didnt have the opportunity to do this as much in JH, and I wanted to take the opportunity to get more hands on experience with the different technologies and tools that are used in OVC.",
      "Secondly, I wanted to improve my time management and multitasking skills. In OVC specifically, this was important because most requests were in person and I had to factor in the time for physical labor and other factors when dealing with tickets. As well I took courses so I prioritized good time management so I can get all of my work tasks done in a timely manner so I can either take on more tasks or afford myself time to work on schoolwork.",
      "Thirdly, I wanted to improve my communication skills this term specifically in terms of customer service and in person interaction with clients.",
      "Finally, I wanted to take on more complex tasks than I did last term, such as making new SOP's as I had done before, specifically for OVC, to make handling uncommon tickets easier. This would help me improve the depth and breadth of my IT knowledge and OVC specific knowledge and thus improve my skills in helping people diagnose issues as well.",
      "I would say that my last goal was related to my job tasks specifically. I wanted to take on some more initiative by helping with some larger more complex tasks at OVC. I also tried to write more SOPs and WIs to contribute to the team outside of fulfilling tickets.",
      "I think I learned all of the skills that I had wanted to this term. I became more proficient in Footprints and AD, which are crucial support tools, and I definitely improved my personal soft skills and my communication skills throughout the term. These soft transferable skills are all beneficial to future work terms and I believe that they show I have more than just the technical skills for the job, it shows that I have had experience learning and solving problems in a work environment for a client.",
      "In terms of technologies I wanted to work with I simply continued improving my proficiency in the administration tools used on campus such as Active Directory, MECM, Footprints, Office, among a few others. In learning all of these tools and how to troubleshoot them I think that is useful because these tools are critical to networking, support and IT admin jobs. Having a good knowledge in these technologies would be a strong foundation for any QA engineering, support or technical analyst roles.",
      "Reflecting on my learning goals I would say I was successful in completing them. In regards to more in person support and networking I would say that I completed that goal. I would say a good portion of my work was in person support for clients which was nice. Whether it be helping fix broken setups, swapping out parts or helping install new parts and software. Or just coordinating to move around the surface hubs and fix problems that informatics needed us on site for. I was also able to provide support for some old systems and medical computers and cameras when they needs some computers changed out too.",
      "For my second goal, I believe that I managed my time effectively as proven by my prompt resolutions to all the tickets I received while also maintaining a 92% in my courses.",
      "For my third goal, due to the nature of all of the increased in person meetings I was able to improve my customer service and interaction skills. I've found that actively listening to clients' concerns and responding with clear, concise information has helped improve the quality of my interactions.",
      "Finally, for my last goal, While I didn't create more SOPs or WIs till the end of term (turns out most stuff is covered well). I did get the opportunity to help handle a few larger assignments for the clean out of MacNabb house on campus and the transferring of multiple departments to different offices. I learned teamwork with my fellow coops as I went to MacNabb and helped plan out the logistics for cleaning out all of the old technology. Jonathan and I also handled how many new supplies would need to be ordered for the new setups when we handled that ticket and we handled the moving and testing of all of the new and old equipment.",
      "An overview of my Job would once again be providing technical support to MD clients located in the OVC buildings. This ranged from online appointments, to physical appointments such as learning how to use surface hubs, or in person installs for certain pierces of software. We also handled a few builds, as well as in person support for clients using informations machines, so collaborating with their team was key to our success too. The most interesting and unique aspect to me this term was once again the variety of work to be done, even more so that Johnston Hall, OVC had tons of different technology from different eras that were still in various stages of support. So the variety of tickets coming in was interesting and I was always working on a new challenge. I was also able to contribute to the larger things like cleaning out MacNabb which was cool because MacNabb had a lot of old and interesting technology for us to go through. Once again for skills needed I would say that having good time management, communication, and customer service, as well as a strong analytical mind are crucial for success in this job. I think that these skills were learned both in class and on the job, learning how to think like a developer, and having a strong analytical mind in class. But I definitely learned the customer service and interaction skills primarily through my job experiences in the past S24 Term and prior.",
      "By reading my F24 report I hope you were able to understand my role as a Technician working at the school but also how I was able to improve on my existing technical and soft skills. I hope you were able to see how I was able to improve over my 8 months at the school and some of the interesting things I was involved with will having the opportunity to work on the OVC support side of Managed Desktops.",
    ],
    media: [
      {
        src: mac,
        alt: "A working old PowerBook G3 laptop found in MacNabb.",
        caption: "A working old Powerbook G3 mac that we found in MacNabb",
      },
      {
        src: desk,
        alt: "A desk filled with OVC technology, displays, and older Apple computers.",
        caption: "my desk with all of the varied tech from OVC",
      },
      {
        src: old,
        alt: "A large opened hard drive with exposed internal platters.",
        caption:
          "An interesting old hard drive we found that held 760MB at this size",
      },
    ],
  },
  {
    id: "w26",
    shortTitle: "W26",
    title: "Winter 2026 Work Term Report",
    eyebrow: "Work Term 03",
    meta: "IT Help Desk Co-op / Wellington-Dufferin-Guelph Public Health",
    accent: "violet",
    sections: [
      {
        heading: "Abstract / Introduction",
        paragraphs: [
          "During the Winter 2026 work term, I worked at Wellington-Dufferin-Guelph Public Health as an IT Help Desk Co-op from January 12 to May 2. Over the four-month placement, I supported the organization by helping triage and resolve day-to-day technology issues, assisting staff with hardware and software problems, and contributing to longer-term IT projects. My role included work related to asset management, corporate software license cleanup, endpoint support, computer imaging, and automation. This report outlines my employer, my learning goals, the skills I developed, and how this experience helped me grow as a computing student and future IT professional.",
        ],
      },
      {
        heading: "Information About the Employer",
        paragraphs: [
          "Wellington-Dufferin-Guelph Public Health is a government-funded public health agency that serves Wellington County, Dufferin County, and the City of Guelph. The organization focuses on protecting and promoting the health of local communities through programs such as immunization, disease surveillance, health promotion, and public health education. Its mission is centered on improving health outcomes and supporting the well-being of the communities it serves.",
          "Although public health may not seem directly related to computing science at first, technology plays an important role in supporting the agency's work. WDG Public Health relies on IT systems to manage computers, networks, email, VPN access, security tools, databases, and other systems that allow staff to complete their work effectively. The computing areas most related to the agency include systems administration, networking, cybersecurity, database support, automation, web support, and technical help desk services.",
          "In addition to the IT team, WDG Public Health also has teams involved in web development, applications, and data analytics. These teams help develop digital tools, maintain websites, and transform collected data into useful insights that can guide public health programs and decision-making. This made the placement interesting because I was able to see how computing supports not just internal operations, but also the broader goal of improving community health.",
        ],
      },
      {
        heading: "Goals / Learning Outcomes",
        groups: [
          {
            subheading: "Learning Goal 1: Critical & Creative Thinking - Depth & Breadth of Understanding",
            paragraphs: [
              "My first goal was to develop a broader and deeper understanding of enterprise IT systems used in a public health environment. This included learning more about hardware, networking, email systems, VPNs, endpoint security, and automation tools. To work toward this goal, I planned to take on a variety of tickets and projects, ask questions when encountering unfamiliar systems, and learn from the other IT Administrators through documentation, observation, and hands-on experience.",
              "I believe I achieved this goal well. Throughout the term, I contributed to solving a wide variety of technical issues, including both daily support tickets and longer-term projects related to asset management and computer imaging. I learned how asset management is handled in a smaller organization and gained experience with tools such as Bitdefender, Microsoft Azure, ManageEngine, and Active Directory. This helped me better understand how different enterprise systems work together to keep an organization's devices secure, organized, and functional.",
            ],
          },
          {
            subheading: "Learning Goal 2: Communicating - Oral Communication",
            paragraphs: [
              "My second goal was to strengthen my oral communication and customer service skills, especially when supporting staff in a public health environment where clear and professional communication is important. My plan was to actively communicate with end users through in-person support, phone calls, and Microsoft Teams meetings. I also wanted to adapt my communication style depending on each user's comfort level with technology.",
              "I believe I achieved this goal as well. Compared to my previous co-op, this role involved supporting a smaller and more familiar group of users, which made it easier to build professional relationships and become comfortable communicating in the work environment. I was able to explain technical issues clearly, help users feel supported, and follow up when needed to make sure issues were resolved properly.",
            ],
          },
          {
            subheading: "Learning Goal 3: Professional & Ethical Behaviour - Personal Organization / Time Management",
            paragraphs: [
              "My third goal was to improve my time management skills so I could effectively balance ticket resolution, on-site support, system deployments, long-term projects, and academic responsibilities during the work term. I also wanted to take more initiative by asking for additional work when I had extra time available.",
              "I believe I was successful in achieving this goal. During the term, I was assigned both time-sensitive tickets and longer-term projects, including asset management tasks and backend cleanup work. This required me to prioritize my workload, plan my tasks, and manage my time effectively. I was able to balance urgent support requests with ongoing project work without compromising the quality of my work.",
            ],
          },
          {
            subheading: "Learning Goal 4: Critical & Creative Thinking - Inquiry & Analysis",
            paragraphs: [
              "My fourth goal was to strengthen my ability to analyze technical issues and identify root causes instead of relying only on predefined solutions. My plan was to ask diagnostic questions, review logs or system information where applicable, consider multiple possible causes, and verify my findings before implementing solutions.",
              "I achieved this goal through my work on a variety of hardware and software issues. I gained valuable experience troubleshooting laptops, user-facing technology, software problems, and computer imaging issues. I also worked on creating automated install scripts, which involved trial and error, testing, and refining solutions. These experiences helped improve my critical thinking skills and made me more confident in diagnosing IT problems independently.",
            ],
          },
          {
            subheading: "Learning Goal 5: Professional & Ethical Behaviour - Ethical Reasoning",
            paragraphs: [
              "My fifth goal was to develop strong ethical reasoning skills when handling sensitive information and systems within a public health organization. My plan was to follow organizational policies related to privacy, security, and access control, and to ask for guidance when unsure about how to handle confidential information.",
              "This goal was less central to my day-to-day work because I did not directly handle much confidential information. However, I still understood the importance of privacy and professionalism in a public health setting. Even when working with user accounts, devices, and internal systems, it was important to follow proper procedures and respect access control policies. If I encounter more sensitive information in future IT roles, I will continue to follow organizational standards and seek guidance when needed.",
            ],
          },
        ],
      },
      {
        heading: "Did You Develop Goals Relating to Your Job Tasks?",
        paragraphs: [
          "Yes, many of my goals were directly related to my job tasks. I focused on developing better time management, accuracy, troubleshooting, communication, and initiative. These skills were important because the IT Help Desk Co-op role involved a mix of daily support tickets, user communication, hardware support, software troubleshooting, and longer-term projects.",
          "For example, I was trusted with projects related to asset management and cleanup of the backend Bitdefender dashboard. These tasks required attention to detail, accuracy, and the ability to ask questions when I was unsure. I also developed my initiative by working on a project to help automate the Windows installation process. This project came from my own curiosity and interest in improving deployment workflows, and my supervisor was supportive of the work I completed.",
        ],
      },
      {
        heading: "What Skills Did You Want to Learn? How Will These Tasks Benefit Your Next Work Experience?",
        paragraphs: [
          "During this work term, I wanted to improve both my technical and soft skills. On the technical side, I wanted to gain more experience with enterprise IT tools, endpoint management, computer imaging, asset management, automation, networking, and cybersecurity-related systems. On the soft skills side, I wanted to improve my communication, customer service, time management, attention to detail, and ability to work independently.",
          "These skills will benefit my next work experience because they are highly transferable to many IT and computing roles. For example, troubleshooting user issues helped me become more confident in diagnosing problems and communicating solutions clearly. Working with tools like Bitdefender, ManageEngine, Microsoft Azure, and Active Directory helped me better understand how organizations manage devices, users, security, and software at scale. My work with automation and imaging also gave me practical experience in making IT processes more efficient.",
          "Overall, this placement helped me build a stronger foundation for future roles in IT support, systems administration, cybersecurity, endpoint management, or technical project work.",
        ],
      },
      {
        heading: "What Technologies Did You Want to Work With and Why?",
        paragraphs: [
          "I wanted to work mainly with Microsoft tools and enterprise IT systems because they are widely used in professional computing environments. I was especially interested in tools related to endpoint management, device deployment, user management, and security.",
          "During the term, I gained experience with Bitdefender GravityZone, ManageEngine, Microsoft Azure, Active Directory, Microsoft Office, VPN tools, and computer imaging processes. These technologies were useful because they showed me how organizations manage their hardware, software, users, and security from a centralized backend. I also worked with automation scripts, which helped me understand how repetitive IT tasks can be streamlined and made more reliable.",
          "I also learned more about audiovisual and presentation technology used in office environments. This included troubleshooting and supporting projectors, ClickShare devices, deployment processes for presentation-sharing hardware, and MirrorOp as office presentation sharing software. Working with these systems gave me a better understanding of how meeting room technology connects hardware, networking, and user experience, especially when staff need reliable ways to present and collaborate.",
        ],
      },
      {
        heading: "Reflecting on Your Goals / Learning Outcomes",
        paragraphs: [
          "Overall, I believe I was successful in completing most of my learning goals. I improved my understanding of enterprise IT systems, gained more confidence communicating with users, strengthened my time management skills, and improved my troubleshooting process. I was able to work on a mix of daily tickets and longer-term projects, which gave me a more complete view of what IT support looks like in a public health organization.",
          "The goal I was least successful in completing was my ethical reasoning goal, mainly because I did not directly encounter many situations involving confidential information. However, I still learned the importance of privacy, access control, and professionalism in a public health setting. Even when sensitive data was not directly involved, it was important to follow proper procedures and respect the organization's security standards.",
        ],
      },
      {
        heading: "Job Description",
        paragraphs: [
          "As an IT Help Desk Co-op at WDG Public Health, my role was to provide daily technical support for the organization's staff and systems. This included helping with computer hardware, software, office productivity tools, user issues, computer imaging, endpoint management, asset tracking, and general troubleshooting. The position also involved supporting organizational systems across multiple locations, maintaining hardware and software inventory, helping with automation where possible, and creating or following IT documentation.",
          "One of the most interesting parts of the job was seeing how many different technologies are needed to support a public health agency. The work was not limited to fixing individual computer issues. It also involved understanding how backend systems, security tools, networks, user accounts, and deployment processes all connect together. I also found the automation and imaging work especially interesting because it allowed me to apply problem-solving and scripting skills to improve real IT workflows.",
          "The job required strong troubleshooting skills, communication skills, attention to detail, customer service, adaptability, and comfort with learning new technologies. Some of these skills were developed in class, such as programming, problem solving, and general computing knowledge. However, many of the practical IT skills were developed on the job through hands-on experience, asking questions, observing other IT staff, and working directly with users and enterprise systems.",
        ],
      },
      {
        heading: "Conclusion",
        paragraphs: [
          "My work term at WDG Public Health was a valuable experience that helped me grow both technically and professionally. I gained hands-on experience with enterprise IT systems, endpoint management tools, asset management, computer imaging, automation, and help desk support. I also improved my communication, time management, troubleshooting, and professional workplace skills.",
          "The most important takeaway from this work term is that IT plays a major role in supporting public health work. Reliable technology allows staff to communicate, access systems, manage information, and deliver services to the community. Through this placement, I was able to contribute to that support while developing skills that will help me in future computing and IT roles.",
        ],
      },
    ],
    media: [
      {
        src: computerAssets,
        alt: "Computer assets prepared for inventory and deployment work.",
        caption:
          "Computer assets organized for inventory, imaging, and deployment work during the Winter 2026 term.",
      },
      {
        src: deskSetup,
        alt: "A desk setup with IT equipment and workstation hardware.",
        caption:
          "A workstation setup showing the day-to-day hardware support and desk equipment I worked with.",
      },
      {
        src: imageLaptop,
        alt: "A laptop prepared for imaging, support, or deployment.",
        caption:
          "Laptop support and deployment work, including imaging, troubleshooting, and preparing devices for users.",
      },
    ],
  },
];

function App() {
  const [activeSection, setActiveSection] = useState("menu");

  const activeReport = useMemo(
    () => reports.find((report) => activeSection === report.id),
    [activeSection],
  );

  useEffect(() => {
    const sections = document.querySelectorAll("[data-section]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-38% 0px -48% 0px", threshold: 0.01 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const jumpTo = (id) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleInteractiveMove = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--local-x", `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty("--local-y", `${event.clientY - rect.top}px`);
    event.currentTarget.style.setProperty(
      "--tilt-x",
      `${((event.clientY - rect.top) / rect.height - 0.5) * -7}deg`,
    );
    event.currentTarget.style.setProperty(
      "--tilt-y",
      `${((event.clientX - rect.left) / rect.width - 0.5) * 7}deg`,
    );
  };

  const clearInteractiveMove = (event) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <main className={`site-shell active-${activeReport?.accent || "menu"}`}>
      <DepthBackdrop />

      <header className="top-bar">
        <button className="brand-mark" type="button" onClick={() => jumpTo("menu")}>
          <img src={logo} alt="MH logo" />
        </button>
        <nav className="social-links" aria-label="Social links">
          <a href="https://github.com/Hosser5150">
            <FaGithub aria-hidden="true" />
            GitHub
            <FiArrowUpRight aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/matthew-hoskins51/">
            <FaLinkedin aria-hidden="true" />
            LinkedIn
            <FiArrowUpRight aria-hidden="true" />
          </a>
        </nav>
      </header>

      <nav className="snap-menu" aria-label="Report navigation">
        {reports.map((report) => (
          <button
            className={activeSection === report.id ? "is-active" : ""}
            key={report.id}
            onClick={() => jumpTo(report.id)}
            type="button"
          >
            {report.shortTitle}
          </button>
        ))}
      </nav>

      <section className="menu-panel snap-panel" data-section id="menu">
        <div className="menu-card">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Co-op Work Term Reports</p>
              <MotionHeading as="h1" text="Matthew Hoskins" />
            </div>
            <figure
              className="headshot-card interactive-surface"
              onPointerLeave={clearInteractiveMove}
              onPointerMove={handleInteractiveMove}
            >
              <div className="headshot-image-box">
                <img
                  src={headshot}
                  alt="Matthew Hoskins headshot"
                  decoding="async"
                />
              </div>
              <figcaption>
                <span>MH</span>
                <p>Matthew Hoskins</p>
              </figcaption>
            </figure>
          </div>
          <div className="report-jump-grid">
            {reports.map((report) => (
              <button
                className={`report-jump ${report.accent}`}
                key={report.id}
                onClick={() => jumpTo(report.id)}
                type="button"
              >
                <span>{report.eyebrow}</span>
                <MotionHeading as="strong" text={report.title} />
                <small>{report.meta}</small>
                <FiArrowDown aria-hidden="true" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <ResumeSection />

      {reports.map((report) => (
        <ReportSection key={report.id} report={report} />
      ))}
    </main>
  );
}

function DepthBackdrop() {
  return (
    <div className="depth-backdrop" aria-hidden="true">
      <TerminalWebGLScene />
      <div className="cursor-aura" />
      <div className="terminal-dither-plane" />
      <RetroParallaxField />
      <div className="terminal-frame" />
      <div className="scanline-field" />
    </div>
  );
}

function RetroParallaxField() {
  const fieldRef = useRef(null);

  useEffect(() => {
    const field = fieldRef.current;
    if (!field) {
      return undefined;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    let frameId = 0;
    const syncParallax = () => {
      frameId = 0;
      const tileHeight = Math.max(window.innerHeight * 1.2, 720);
      const scroll = window.scrollY;
      field.style.setProperty("--retro-back-y", `${-((scroll * 0.075) % tileHeight).toFixed(1)}px`);
      field.style.setProperty("--retro-mid-y", `${-((scroll * 0.16) % tileHeight).toFixed(1)}px`);
      field.style.setProperty("--retro-front-y", `${-((scroll * 0.32) % tileHeight).toFixed(1)}px`);
    };
    const requestParallaxSync = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(syncParallax);
      }
    };

    requestParallaxSync();
    window.addEventListener("scroll", requestParallaxSync, { passive: true });
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", requestParallaxSync);
    };
  }, []);

  return (
    <div className="retro-parallax-stack" ref={fieldRef}>
      <div className="retro-parallax-layer retro-parallax-layer-back" />
      <div className="retro-parallax-layer retro-parallax-layer-mid" />
      <div className="retro-parallax-layer retro-parallax-layer-front" />
    </div>
  );
}

function TerminalWebGLScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl", {
      alpha: true,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
      powerPreference: "high-performance",
    });

    if (!gl) {
      return undefined;
    }

    const vertexShaderSource = `
      attribute vec3 aPosition;
      attribute float aSeed;
      attribute float aLayer;
      uniform float uAspect;
      uniform float uClick;
      uniform float uScroll;
      uniform float uTime;
      uniform vec2 uPointer;
      varying float vDepth;
      varying float vLayer;
      varying float vSeed;
      varying float vPulse;

      mat2 rotate2d(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      void main() {
        float terminalFlow = uScroll * (12.6 + aLayer * 7.4) + uTime * (0.1 + aLayer * 0.12);
        float z = mod(aPosition.z + terminalFlow + 12.0, 16.5) - 10.8;
        vec2 pos = aPosition.xy;
        float lane = floor(aSeed * 18.0);
        float rowSnap = floor((pos.y + 4.0) * 8.0) / 8.0 - 4.0;
        float commandWave = step(0.36, fract(aSeed * 29.0));
        float ribbon = sin(pos.x * 1.16 + lane + uTime * 0.62 + uScroll * 12.0);
        float scanDrift = cos(rowSnap * 2.1 + aSeed * 42.0 + uTime * 0.32);
        pos.y = mix(pos.y, rowSnap, 0.58 + aLayer * 0.18);
        pos.y += ribbon * (0.045 + aLayer * 0.1) + commandWave * 0.018;
        pos.x += scanDrift * (0.032 + aLayer * 0.042);
        pos = rotate2d((uScroll - 0.5) * 0.08 + z * 0.004 + sin(uTime * 0.12) * 0.025) * pos;

        vec2 pointer = vec2(uPointer.x * 6.0 * uAspect, uPointer.y * 3.7);
        vec2 delta = pos - pointer;
        float pointerDistance = max(length(delta), 0.34);
        float pulse = sin(uTime * 1.9 + aSeed * 38.0 + uScroll * 18.0) * 0.08;
        float hoverMagnetic = 0.16 / (pointerDistance * pointerDistance + 0.6);
        float clickRange = smoothstep(13.5, 0.16, pointerDistance);
        float clickOrbit = sin(uTime * 3.2 + aSeed * 44.0) * 0.18;
        vec2 tangent = vec2(-delta.y, delta.x) / pointerDistance;
        vec2 pull = -delta * clickRange * uClick * (0.22 + aLayer * 0.38);
        vec2 orbit = tangent * clickOrbit * clickRange * uClick;
        pos += (delta / pointerDistance) * hoverMagnetic * (0.18 + aLayer * 0.24);
        pos += pull + orbit;
        pos.x += sin(uTime * 0.42 + aSeed * 18.0 + z) * (0.03 + aLayer * 0.032);
        pos.y += cos(uTime * 0.34 + aSeed * 21.0 + z) * (0.026 + aLayer * 0.035) + pulse;

        float camera = 6.2;
        float scale = camera / (camera - z);
        vec2 projected = vec2(pos.x / uAspect, pos.y) * scale;
        gl_Position = vec4(projected, 0.0, 1.0);
        float twinkle = 0.78 + 0.32 * sin(uTime * 2.2 + aSeed * 30.0 + uScroll * 7.0);
        gl_PointSize = (0.78 + aLayer * 1.95 + clickRange * uClick * 1.35) * scale * twinkle;
        vDepth = scale;
        vLayer = aLayer;
        vSeed = aSeed;
        vPulse = twinkle;
      }
    `;

    const fragmentShaderSource = `
      precision mediump float;
      varying float vDepth;
      varying float vLayer;
      varying float vSeed;
      varying float vPulse;

      void main() {
        vec2 uv = gl_PointCoord - 0.5;
        float d = length(uv);
        float dither = fract(sin(dot(gl_PointCoord + vSeed, vec2(12.9898, 78.233))) * 43758.5453);
        float shapeBucket = floor(fract(vSeed * 19.73) * 5.0);
        float circleMask = 1.0 - smoothstep(0.22, 0.48, d);
        float diamondMask = 1.0 - smoothstep(0.34, 0.52, abs(uv.x) + abs(uv.y));
        float squareMask = 1.0 - smoothstep(0.34, 0.5, max(abs(uv.x), abs(uv.y)));
        float barMask = (1.0 - smoothstep(0.1, 0.2, abs(uv.x))) * (1.0 - smoothstep(0.3, 0.5, abs(uv.y)));
        float ringMask = smoothstep(0.11, 0.2, d) * (1.0 - smoothstep(0.28, 0.48, d));
        float isCircle = 1.0 - step(0.5, abs(shapeBucket - 0.0));
        float isDiamond = 1.0 - step(0.5, abs(shapeBucket - 1.0));
        float isSquare = 1.0 - step(0.5, abs(shapeBucket - 2.0));
        float isBar = 1.0 - step(0.5, abs(shapeBucket - 3.0));
        float isRing = 1.0 - step(0.5, abs(shapeBucket - 4.0));
        float pixelMask = circleMask * isCircle + diamondMask * isDiamond + squareMask * isSquare + barMask * isBar + ringMask * isRing;
        float smear = 1.0 - smoothstep(0.05, 0.46, length(vec2(uv.x * 1.75 + 0.16, uv.y * 0.72 - 0.04)));
        float halo = 1.0 - smoothstep(0.18, 0.5, d);
        float dotMask = pixelMask * mix(0.7, 1.0, dither);
        float core = (1.0 - smoothstep(0.0, 0.09, d)) * mix(0.7, 1.0, isCircle + isDiamond);
        vec2 screenCell = floor(gl_FragCoord.xy * 0.5);
        float screenDither = fract(sin(dot(screenCell, vec2(17.17, 91.73))) * 43758.5453);
        float scanline = mix(0.66, 1.0, smoothstep(0.18, 0.82, fract(gl_FragCoord.y * 0.5)));
        float phosphorColumn = mod(floor(gl_FragCoord.x), 3.0);
        vec3 phosphorMask = mix(vec3(0.68, 1.08, 0.78), vec3(0.72, 0.86, 1.18), step(1.5, phosphorColumn));
        phosphorMask = mix(phosphorMask, vec3(1.12, 0.72, 0.78), 1.0 - step(0.5, phosphorColumn));
        float particleInk = clamp(dotMask * 0.82 + halo * 0.18 + smear * 0.12, 0.0, 1.0);
        float ditherGate = smoothstep(screenDither - 0.26, screenDither + 0.26, particleInk);
        float terminalBand = step(0.54, fract(vSeed * 17.0));
        float hotBand = step(0.91, fract(vSeed * 53.0));
        vec3 green = vec3(0.08, 1.0, 0.28);
        vec3 cyan = vec3(0.0, 0.94, 1.0);
        vec3 magenta = vec3(1.0, 0.08, 0.86);
        vec3 amber = vec3(1.0, 0.78, 0.0);
        vec3 color = mix(green, cyan, terminalBand);
        color = mix(color, amber, step(0.82, fract(vSeed * 41.0)) * 0.54);
        color = mix(color, magenta, hotBand * 0.42);
        color *= phosphorMask * scanline;
        float alpha = mix(particleInk * 0.34, particleInk, ditherGate) * (0.16 + vDepth * 0.68 + vLayer * 0.16) * vPulse;
        gl_FragColor = vec4(color + core * vec3(0.42), alpha * scanline);
      }
    `;

    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
      }
      return shader;
    };

    const program = gl.createProgram();
    const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "WebGL program link failed");
    }

    gl.useProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.disable(gl.DEPTH_TEST);
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
    const deviceMemory = navigator.deviceMemory || 8;
    const particleCount = reducedMotion ? 1200 : coarsePointer ? 3600 : deviceMemory < 8 ? 6200 : 9200;
    const stride = 5;
    const particleData = new Float32Array(particleCount * stride);
    const laneCount = coarsePointer ? 96 : 176;
    const rowCount = Math.max(18, Math.ceil(particleCount / laneCount));

    for (let index = 0; index < particleCount; index += 1) {
      const structured = index % 6 !== 0;
      const col = (index % laneCount) / (laneCount - 1);
      const row = (Math.floor(index / laneCount) % rowCount) / (rowCount - 1);
      const rowNumber = Math.floor(index / laneCount);
      const promptIndent = rowNumber % 5 === 0 ? 0.7 : rowNumber % 3 === 0 ? -0.35 : 0;
      const lineNoise = Math.sin(row * Math.PI * 9) * 0.24;
      const x = structured
        ? (col - 0.5) * 13.9 + lineNoise + promptIndent
        : (Math.random() - 0.5) * 15.8;
      const y = structured
        ? (row - 0.5) * 8.1 + Math.cos(col * Math.PI * 12) * 0.05
        : (Math.random() - 0.5) * 8.8;
      const z = -10.2 + Math.random() * 15.4;
      const seed = Math.random();
      const layer = structured ? 0.25 + Math.random() * 0.55 : Math.random();
      const offset = index * stride;
      particleData[offset] = x + (Math.random() - 0.5) * 0.035;
      particleData[offset + 1] = y + (Math.random() - 0.5) * 0.025;
      particleData[offset + 2] = z;
      particleData[offset + 3] = seed;
      particleData[offset + 4] = layer;
    }

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, particleData, gl.STATIC_DRAW);

    const bytes = Float32Array.BYTES_PER_ELEMENT;
    const aPosition = gl.getAttribLocation(program, "aPosition");
    const aSeed = gl.getAttribLocation(program, "aSeed");
    const aLayer = gl.getAttribLocation(program, "aLayer");
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, stride * bytes, 0);
    gl.enableVertexAttribArray(aSeed);
    gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, stride * bytes, 3 * bytes);
    gl.enableVertexAttribArray(aLayer);
    gl.vertexAttribPointer(aLayer, 1, gl.FLOAT, false, stride * bytes, 4 * bytes);

    const uniforms = {
      aspect: gl.getUniformLocation(program, "uAspect"),
      click: gl.getUniformLocation(program, "uClick"),
      pointer: gl.getUniformLocation(program, "uPointer"),
      scroll: gl.getUniformLocation(program, "uScroll"),
      time: gl.getUniformLocation(program, "uTime"),
    };

    const pointer = { x: 0, y: 0 };
    const pointerTarget = { x: 0, y: 0 };
    const clickState = { value: 0, target: 0 };
    const updatePointer = (event) => {
      pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    const activateClickMagnet = (event) => {
      if (event.button === 0) {
        updatePointer(event);
        clickState.target = 1;
      }
    };
    const releaseClickMagnet = () => {
      clickState.target = 0;
    };

    const viewportState = {
      maxScroll: document.documentElement.scrollHeight - window.innerHeight || 1,
      scroll: 0,
    };

    const syncScrollBounds = () => {
      viewportState.maxScroll =
        document.documentElement.scrollHeight - window.innerHeight || 1;
      viewportState.scroll = window.scrollY / viewportState.maxScroll;
    };

    const updateScroll = () => {
      viewportState.scroll = window.scrollY / viewportState.maxScroll;
    };

    const resize = () => {
      const viewportPixels = Math.max(1, window.innerWidth * window.innerHeight);
      const maxCanvasPixels = reducedMotion ? 520000 : coarsePointer ? 820000 : 1500000;
      const pixelCap = Math.sqrt(maxCanvasPixels / viewportPixels);
      const dprCap = reducedMotion ? 0.75 : coarsePointer ? 0.9 : 1;
      const dpr = Math.max(0.5, Math.min(window.devicePixelRatio || 1, dprCap, pixelCap));
      const width = Math.max(1, Math.floor(window.innerWidth * dpr));
      const height = Math.max(1, Math.floor(window.innerHeight * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      syncScrollBounds();
    };

    let frameId = 0;
    let lastFrame = 0;
    const start = performance.now();
    const minFrameTime = 1000 / (reducedMotion ? 18 : coarsePointer ? 28 : 38);
    const render = (now = performance.now()) => {
      if (now - lastFrame < minFrameTime) {
        frameId = requestAnimationFrame(render);
        return;
      }
      lastFrame = now;
      pointer.x += (pointerTarget.x - pointer.x) * 0.11;
      pointer.y += (pointerTarget.y - pointer.y) * 0.11;
      clickState.value += (clickState.target - clickState.value) * 0.16;
      const time = (now - start) / 1000;
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(uniforms.aspect, canvas.width / canvas.height);
      gl.uniform1f(uniforms.click, clickState.value);
      gl.uniform1f(uniforms.time, time);
      gl.uniform2f(uniforms.pointer, pointer.x, pointer.y);
      gl.uniform1f(uniforms.scroll, viewportState.scroll);
      gl.drawArrays(gl.POINTS, 0, particleCount);
      frameId = requestAnimationFrame(render);
    };

    const startRenderLoop = () => {
      if (!frameId) {
        frameId = requestAnimationFrame(render);
      }
    };

    const stopRenderLoop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    const updateVisibility = () => {
      if (document.hidden) {
        stopRenderLoop();
      } else {
        startRenderLoop();
      }
    };

    const handleContextLost = (event) => {
      event.preventDefault();
      stopRenderLoop();
    };

    resize();
    syncScrollBounds();
    startRenderLoop();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    window.addEventListener("pointerdown", activateClickMagnet, { passive: true });
    window.addEventListener("pointerup", releaseClickMagnet);
    window.addEventListener("pointercancel", releaseClickMagnet);
    window.addEventListener("blur", releaseClickMagnet);
    window.addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", updateVisibility);
    canvas.addEventListener("webglcontextlost", handleContextLost, false);

    return () => {
      stopRenderLoop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
      window.removeEventListener("pointerdown", activateClickMagnet);
      window.removeEventListener("pointerup", releaseClickMagnet);
      window.removeEventListener("pointercancel", releaseClickMagnet);
      window.removeEventListener("blur", releaseClickMagnet);
      window.removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", updateVisibility);
      canvas.removeEventListener("webglcontextlost", handleContextLost);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas className="webgl-terminal" ref={canvasRef} />;
}

const MotionHeading = memo(function MotionHeading({ as: Element = "span", text }) {
  return (
    <Element className="motion-words">
      {text.split(" ").map((word, index) => (
        <span className="motion-word" key={`${word}-${index}`}>
          {word}
        </span>
      ))}
    </Element>
  );
});

const ResumeSection = memo(function ResumeSection() {
  return (
    <section className="resume-section snap-panel" data-section id="resume">
      <div className="resume-shell">
        <header className="resume-header">
          <div>
            <p className="eyebrow">Resume Breakdown</p>
            <MotionHeading as="h2" text="Resume Snapshot" />
          </div>
          <a className="resume-download" href={resumePdfUrl} download>
            Download Resume
            <FiArrowDown aria-hidden="true" />
          </a>
        </header>

        <div className="resume-grid">
          {resumeSections.map((section) => (
            <article className="resume-card" key={section.title}>
              <h3>{section.title}</h3>
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
});

const ReportSection = memo(function ReportSection({ report }) {
  return (
    <section
      className={`report-section snap-panel report-${report.accent}`}
      data-section
      id={report.id}
    >
      <div className="report-layout">
        <article className="report-copy">
          <p className="eyebrow">{report.eyebrow}</p>
          <MotionHeading as="h2" text={report.title} />
          <p className="report-meta">{report.meta}</p>
          <div className="article-body">
            {report.sections
              ? report.sections.map((section) => (
                  <section className="article-section" key={section.heading}>
                    <h3>{section.heading}</h3>
                    {section.paragraphs?.map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                    {section.groups?.map((group) => (
                      <div className="article-subsection" key={group.subheading}>
                        <h4>{group.subheading}</h4>
                        {group.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))}
                      </div>
                    ))}
                  </section>
                ))
              : report.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
          </div>
        </article>

        <aside className="media-rail" aria-label={`${report.shortTitle} report photos`}>
          {report.media.map((item, index) => (
            <figure
              className="photo-frame"
              key={`${report.id}-${index}-${item.caption}`}
            >
              <div className="photo-image-box">
                {item.placeholder ? (
                  <div className="photo-placeholder" aria-label={item.alt}>
                    <span>{`${report.shortTitle}-${String(index + 1).padStart(2, "0")}`}</span>
                    <p>Image pending</p>
                  </div>
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt}
                    decoding="async"
                    fetchPriority={report.id === "s24" && index === 0 ? "high" : "auto"}
                    loading={report.id === "s24" && index === 0 ? "eager" : "lazy"}
                    sizes="(max-width: 760px) 100vw, (max-width: 1020px) 33vw, 32vw"
                  />
                )}
              </div>
              <figcaption>
                <span>{`${report.shortTitle}-${String(index + 1).padStart(2, "0")}`}</span>
                <p>{item.caption}</p>
              </figcaption>
            </figure>
          ))}
        </aside>
      </div>
    </section>
  );
});

export default App;
