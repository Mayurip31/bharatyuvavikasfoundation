// Toggle mobile navigation menu
const menuIcon = document.getElementById('menu-icon');
const menuList = document.getElementById('menu-list');

menuIcon.addEventListener('click', () => {
    menuList.classList.toggle('active');
});

// Handle "Donate Now" button click
function handleDonateClick() {


     // Function to handle page load animations
     window.addEventListener('load', function() {
        const homeSection = document.querySelector('.home');
        const overlay = document.querySelector('.overlay');
        const homeContent = document.querySelector('.home-content');

        // Start the animations
        homeSection.style.opacity = '1';
        overlay.style.opacity = '1';
        homeContent.style.opacity = '1';
        homeContent.style.transform = 'translateY(0)';
    });
    // Logic to handle donation click, such as navigating to a payment page
    window.location.href = "donation-page.html"; // Replace with your actual donation page URL
}

document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.upcoming-projects-box h2');
    const projectList = document.querySelector('.project-list');

    toggleButton.addEventListener('click', () => {
        projectList.classList.toggle('show-list');
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.getElementById('menu-icon');
    const menuList = document.getElementById('menu-list');
    
    menuIcon.addEventListener('click', function() {
        menuList.classList.toggle('active');
    });

    // Handle dropdown toggle
    const dropdownToggle = document.querySelector('.dropdown-toggle');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    
    dropdownToggle.addEventListener('click', function(event) {
        event.preventDefault();
        // Toggle the visibility of the dropdown menu
        dropdownMenu.classList.toggle('active');
    });

    // Close dropdown if clicking outside of it
    document.addEventListener('click', function(event) {
        if (!dropdownToggle.contains(event.target) && !dropdownMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
});

// script.js
document.addEventListener('DOMContentLoaded', () => {
    const menuIcon = document.getElementById('menu-icon');
    const menuList = document.getElementById('menu-list');

    menuIcon.addEventListener('click', () => {
        menuList.classList.toggle('active');
    });
});



// Function to handle "Read More" button click
function readMore(project) {
    // Redirect to detailed project pages based on the project parameter
    switch (project) {
        case 'life-skills':
            window.location.href = 'life-skill.html'; // Ensure the file name is correct
            break;
        case 'health':
            window.location.href = 'health.html'; // Ensure the file name is correct
            break;
        case 'education':
            window.location.href = 'education.html'; // Ensure the file name is correct
            break;

        case 'about-us' :
            window.location.href = 'about-us.html'; // Ensure the file name is correct
            break;

        default:
            console.error('Project not found');
    }
    // Function to handle "Read More" button click
function readMore(page) {
    // Redirect to the 'about-us.html' page for more detailed content
    if (page === 'about-us') {
        window.location.href = 'about-us.html'; // Ensure the file name is correct
    } else {
        console.error('Page not found');
    }
}
}



///contact us home



