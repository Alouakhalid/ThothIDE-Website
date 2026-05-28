// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add("active");
        }
    }
}
window.addEventListener("scroll", reveal);
// Trigger once on load
reveal();

// Typewriter effect in mockup
const codeLines = document.querySelectorAll('.mockup-body .code-line');
const cursor = document.querySelector('.cursor');

// Initially hide code lines
codeLines.forEach(line => {
    line.style.opacity = '0';
    line.style.transform = 'translateY(5px)';
    line.style.transition = 'all 0.3s';
});

setTimeout(() => {
    let delay = 0;
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            // Move cursor to end of current line
            line.appendChild(cursor);
        }, delay);
        delay += 600; // Type next line every 600ms
    });
}, 1000);
