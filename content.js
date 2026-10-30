/* =====================================================================
   YOUR WEBSITE CONTENT
   ---------------------------------------------------------------------
   This is the ONLY file you need to edit. Everything on the website
   comes from here. Every field already has sample text in it, so you
   can see where it shows up. Replace the samples with your own.

   Three rules that keep the site from breaking:
     1. Only change the text INSIDE the quotes "like this".
     2. Every item in a list ends with a comma  },
     3. To add an item, copy a whole block from {  to  },  and paste it.
        To remove one, delete the whole block from {  to  },

   Text formatting you can use inside any quotes:
     **bold words**                     ->  bold words
     *italic words*                     ->  italic words
     [link text](https://example.com)   ->  a clickable link

   Pictures and files:
     - Pictures go in the "images" folder, PDFs in the "files" folder.
     - Easiest way to swap a picture: upload yours with the SAME file name
       as the sample (e.g. banner.jpg) and nothing here needs to change.

   If the page goes blank after an edit, you most likely deleted a
   quote mark, a comma, or a bracket. Undo your last change and retry.
   ===================================================================== */

window.SITE = {

  /* ===== 1. ABOUT YOU (sidebar + top of Home) ===== */
  name: "Nahyun (Lena) Lee",
  title: "Ph.D. Candidate in Information Sciences and Technology",
  affiliation: "College of IST · Penn State University",
  location: "State College, PA",
  photo: "images/profile.jpg",     // your profile photo (square works best)
  banner: "images/IMG_2226.jpeg",     // wide banner on Home, like LinkedIn (about 1600 × 400)
  cv: "files/cv.pdf",              // your CV. Leave "" to hide the CV button.

  // Your name as it appears in author lists. It is shown in bold there.
  authorName: "Lee, N.",

  // Your bio. Each set of quotes is one paragraph.
  bio: [
    "I am a Ph.D. candidate at the [College of Information Sciences and Technology](https://ist.psu.edu) at **Penn State University**. (Sample text: replace with one or two sentences about who you are.)",
    "My research looks at how people perceive and make decisions with AI systems and autonomous vehicles. (Sample text: describe what you study and why it matters.)",
    "Before Penn State, I earned my M.S. in Behavioral and Cognitive Neuroscience at **Korea University** and worked as a researcher in the Human Performance Lab. (Sample text: add your background.)"
  ],

  /* ===== 2. LINKS (sidebar icons + Contact page) =====
     Leave a link as "" to hide its icon. */
  links: {
    email: "nbl5304@psu.edu",
    linkedin: "https://www.linkedin.com/in/your-profile",
    scholar: "https://scholar.google.com/citations?user=YOUR-ID",
    github: "https://github.com/nahyunli",
    instagram: "https://www.instagram.com/nahyunli"
  },

  /* ===== 3. NEWS on Home (newest first) ===== */
  news: [
    { date: "Oct 2026", text: "Launched my personal website. (Sample: replace with your latest update.)" },
    { date: "2025",     text: "New paper published in *Journal Name*. [Read it here](https://example.com)." },
    { date: "2024",     text: "Presented at **OPAM 32**." },
    { date: "Fall 2024", text: "Started my Ph.D. at the College of IST, **Penn State University**." },
  ],

  /* ===== 4. PUBLICATIONS (newest first) =====
     selected: true  -> also shown on Home
     image           -> optional picture. Leave "" for none.
     links           -> any buttons you want. Delete the ones you don't need. */
  publications: [
    {
      title: "Sample paper title: replace with the full title of your newest paper",
      authors: "Lee, N., Coauthor, A., & Coauthor, B.",
      venue: "Journal Name",
      year: "2025",
      image: "images/pub-sample-1.png",
      selected: true,
      links: [
        { label: "Paper", url: "https://example.com" },
        { label: "PDF",   url: "files/cv.pdf" }
      ]
    },
    {
      title: "Second sample paper on spatial cognition and arrow direction processing",
      authors: "Coauthor, A., Lee, N., & Coauthor, C.",
      venue: "Journal or Conference Name",
      year: "2023",
      image: "images/pub-sample-2.png",
      selected: true,
      links: [
        { label: "Paper", url: "https://example.com" }
      ]
    },
    {
      title: "Third sample paper without a picture",
      authors: "Lee, N., & Coauthor, A.",
      venue: "Conference Proceedings",
      year: "2022",
      image: "",
      selected: false,
      links: []
    },
  ],

  /* ===== 5. WORK (newest first) ===== */
  work: [
    {
      role: "Ph.D. Candidate · Graduate Researcher",
      org: "College of Information Sciences and Technology, Penn State University",
      location: "State College, PA",
      start: "Fall 2024",
      end: "Present",
      points: [
        "Sample: what you research or work on in this role.",
        "Sample: a result, paper, or responsibility you're proud of."
      ]
    },
    {
      role: "Researcher",
      org: "Behavioral Science Center & Human Performance Lab, Korea University",
      location: "Seoul, Korea",
      start: "Year",
      end: "2024",
      points: [
        "Sample: programmed attention and conflict tasks for behavioral experiments.",
        "Sample: analyzed reaction-time and mouse-tracking data."
      ]
    },
  ],

  /* ===== 6. PROJECTS (bigger research projects) ===== */
  projects: [
    {
      title: "Sample project: security in autonomous vehicles",
      date: "2024 – Present",
      description: "Sample text: two or three sentences about the project, your role in it, and what came out of it.",
      image: "images/portfolio-3.jpg",
      tags: ["Autonomous vehicles", "Computer vision"],
      links: [
        { label: "Website", url: "https://example.com" }
      ]
    },
    {
      title: "Sample project without a picture",
      date: "2022 – 2024",
      description: "Sample text: projects without a picture still look tidy. Leave image as \"\" to skip it.",
      image: "",
      tags: ["Spatial cognition"],
      links: []
    },
  ],

  /* ===== 7. TALKS & POSTERS (on the Projects page, newest first) =====
     HOW TO ADD ONE:
       a) Export your slides or poster as a PDF (or a poster as .jpg/.png).
       b) Upload it into the "files" folder.
       c) Copy a block below and set file: to the new file name.
     type must be "Talk" or "Poster". Leave file: "" if you have no file. */
  talks: [
    {
      type: "Talk",
      title: "Sample talk title (replace)",
      event: "OPAM 32",
      location: "City, State",
      date: "2024",
      file: "files/sample-talk.pdf"
    },
    {
      type: "Poster",
      title: "Sample poster on spatial cognition and cognitive control",
      event: "Annual Meeting of the Psychonomic Society",
      location: "City, State",
      date: "2023",
      file: "files/sample-poster.pdf"
    },
    {
      type: "Poster",
      title: "Sample poster on attention modulation in driving",
      event: "Applied Human Factors and Ergonomics (AHFE) Conference",
      location: "City, State",
      date: "2022",
      file: ""
    },
  ],

  /* ===== 8. PORTFOLIO (picture grid of smaller things) =====
     Each item is a picture with a title and one short line.
     link is optional: leave "" and clicking the picture just enlarges it. */
  portfolio: [
    { title: "Sample item one",   caption: "One short line about what this is.", date: "2026", image: "images/portfolio-1.jpg", link: "" },
    { title: "Sample item two",   caption: "A design, figure, event, or side project.", date: "2026", image: "images/portfolio-2.jpg", link: "https://example.com" },
    { title: "Sample item three", caption: "Anything small you made or did.", date: "2025", image: "images/portfolio-3.jpg", link: "" },
    { title: "Sample item four",  caption: "One short line about what this is.", date: "2025", image: "images/portfolio-4.jpg", link: "" },
    { title: "Sample item five",  caption: "One short line about what this is.", date: "2024", image: "images/portfolio-5.jpg", link: "" },
    { title: "Sample item six",   caption: "One short line about what this is.", date: "2024", image: "images/portfolio-6.jpg", link: "" },
  ],

  /* ===== 9. MORE (casual page: activities + photo gallery) ===== */
  more: {
    intro: "Outside of research, here's what keeps me busy. (Sample text: replace with a sentence about yourself.)",

    activities: [
      { name: "Tennis",            text: "Sample: a line about how you play or how long." },
      { name: "Art museums",       text: "Sample: a favorite museum or gallery." },
      { name: "Cello",             text: "Sample: what you like to play." },
      { name: "Travel",            text: "Sample: a favorite place you've been." },
    ],

    // Photo gallery. Click a photo to enlarge it. Any picture shape works.
    gallery: [
      { image: "images/gallery-1.jpg", caption: "Sample caption: where and when" },
      { image: "images/gallery-2.jpg", caption: "Sample caption" },
      { image: "images/gallery-3.jpg", caption: "Sample caption" },
      { image: "images/gallery-4.jpg", caption: "Sample caption" },
      { image: "images/gallery-5.jpg", caption: "Sample caption" },
      { image: "images/gallery-6.jpg", caption: "Sample caption" },
    ]
  },

  /* ===== 10. CONTACT PAGE ===== */
  contact: {
    note: "Feel free to contact me for any discussions or project collaborations.",
    office: "Westgate Building, Penn State University (Sample: your office or room)",
    address: "State College, PA 16802"
  },
};
