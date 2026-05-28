// Intersection Observer for high-performance scroll reveals
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal').forEach((element) => {
    observer.observe(element);
});


// Tab Switching Logic for Interactive Showcase
function openTab(tabId) {
    // Hide all contents
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(content => content.classList.remove('active'));

    // Remove active class from buttons
    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(btn => btn.classList.remove('active'));

    // Show selected content
    document.getElementById(tabId).classList.add('active');

    // Add active class to clicked button
    const activeBtn = Array.from(buttons).find(btn => btn.getAttribute('onclick').includes(tabId));
    if (activeBtn) activeBtn.classList.add('active');
}


// Typewriter effect in the mockup window
const codeLines = document.querySelectorAll('.mockup-body .code-line');
const cursor = document.querySelector('.cursor');

// Initially hide code lines
codeLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(5px)';
    line.style.transition = 'all 0.3s';
});

// Run typewriter effect after a short delay
setTimeout(() => {
    let delay = 0;
    codeLines.forEach((line) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            line.appendChild(cursor); // Move cursor to end of current line
        }, delay);
        delay += 600; // Type next line every 600ms
    });
}, 1500);
