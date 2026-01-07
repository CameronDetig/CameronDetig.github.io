# Portfolio Site for Pixar Storage Analytics Intern Application

A modern, responsive portfolio website built for applying to Pixar's Storage Analytics Intern position (Summer 2026). This site showcases projects, experience, education, and skills with a focus on AI/ML technologies and data analytics.

## Features

- **Modern, Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Project Showcase**: Embedded Hugging Face Space for interactive project demonstration
- **Smooth Navigation**: Fixed navbar with smooth scrolling between sections
- **Professional Sections**: 
  - About Me
  - Featured Project with development process
  - Experience
  - Education
  - Skills
  - Contact Information

## Setup Instructions for GitHub Pages

### 1. Create a GitHub Repository

1. Go to [GitHub](https://github.com) and create a new repository
2. Name it `yourusername.github.io` (replace `yourusername` with your GitHub username)
   - This naming convention enables GitHub Pages automatically
   - Alternatively, you can use any repository name and enable Pages in settings

### 2. Upload Files to GitHub

You can upload files using one of these methods:

**Option A: Using GitHub Web Interface**
1. Click "Add file" → "Upload files"
2. Drag and drop all files from this directory
3. Commit the changes

**Option B: Using Git Command Line**
```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit files
git commit -m "Initial portfolio site commit"

# Add your GitHub repository as remote (replace with your repo URL)
git remote add origin https://github.com/yourusername/yourusername.github.io.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click on "Settings" tab
3. Scroll down to "Pages" in the left sidebar
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"
7. Your site will be available at `https://yourusername.github.io` within a few minutes

## Customization Guide

### 1. Update Personal Information

Edit `index.html` and replace placeholder content:

- **Hero Section**: Update name and subtitle
- **About Section**: Write your personal introduction
- **Contact Links**: Update email, GitHub, and LinkedIn URLs
- **Footer**: Update copyright information

### 2. Add Your Hugging Face Space

In `index.html`, find the iframe in the project section:

```html
<iframe 
    src="https://huggingface.co/spaces/your-username/your-space-name"
    frameborder="0"
    width="100%"
    height="600"
    title="Hugging Face Space Embed"
    class="hf-iframe">
</iframe>
```

Replace `your-username/your-space-name` with your actual Hugging Face Space URL.

**Note**: To embed a Hugging Face Space, you need to:
1. Go to your Space settings on Hugging Face
2. Enable "Embed this Space" option
3. Use the embed URL provided, or use the format: `https://huggingface.co/spaces/username/spacename`

### 3. Update Project Information

In the "Featured Project" section, fill in:
- Project title
- Project description
- Development process details:
  - Problem Statement
  - Approach
  - Implementation
  - Results & Learnings
- Technology tags

### 4. Add Your Experience

Add experience items in the Experience section:

```html
<div class="experience-item">
    <div class="experience-header">
        <h3 class="experience-title">Your Job Title</h3>
        <span class="experience-company">Company Name</span>
        <span class="experience-date">Date Range</span>
    </div>
    <ul class="experience-details">
        <li>Your responsibility or achievement</li>
        <li>Another responsibility or achievement</li>
    </ul>
</div>
```

### 5. Add Your Education

Update the Education section with your degree information:

```html
<div class="education-item">
    <h3 class="education-degree">Your Degree</h3>
    <span class="education-school">University Name</span>
    <span class="education-date">Graduation Date</span>
    <p class="education-details">Relevant details, coursework, honors</p>
</div>
```

### 6. Customize Skills

Update the skills in each category to match your expertise. The current categories are:
- Programming Languages
- AI & Machine Learning
- Data & Analytics
- Systems & Infrastructure

### 7. Customize Colors (Optional)

In `styles.css`, you can modify the CSS variables at the top:

```css
:root {
    --primary-color: #0066cc;      /* Main brand color */
    --secondary-color: #ff6b35;    /* Accent color */
    --text-dark: #1a1a1a;          /* Dark text */
    --text-light: #666666;         /* Light text */
    /* ... */
}
```

## File Structure

```
pixar_portfolio_site/
├── index.html          # Main HTML file
├── styles.css          # All styling
├── script.js           # JavaScript for interactivity
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- The site uses Google Fonts (Inter) - ensure you have internet connection for fonts to load
- All images and external resources should be optimized for web
- Test the site on multiple devices before submitting your application
- Make sure your Hugging Face Space is public and embeddable

## Tips for Pixar Application

Based on the internship requirements, make sure to highlight:

1. **LLM/AI Experience**: Emphasize your work with LangChain, OpenAI API, Hugging Face
2. **Data Analytics**: Showcase metadata extraction, database querying, data structures
3. **Scripting Skills**: Highlight Python and Shell scripting experience
4. **Creative Pipeline Understanding**: If you have any experience with media/entertainment workflows, mention it
5. **Problem-Solving**: Clearly explain how your project solves real problems

## License

This portfolio template is free to use and modify for personal use.

---

Good luck with your Pixar application! 🎬✨

