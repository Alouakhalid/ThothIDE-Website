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

// Live Telemetry Terminal Simulation
const terminalBody = document.getElementById('live-terminal');
const telemetryMessages = [
    { type: 'info', text: 'Initializing Thoth Engine v2.0.4...' },
    { type: 'info', text: 'Allocating non-blocking QThreads for UI...' },
    { type: 'info', text: 'Loading local Hugging Face API interface...' },
    { type: 'warn', text: 'No MCP servers detected. Starting in standalone mode.' },
    { type: 'info', text: 'Establishing secure IPC socket on port 4519...' },
    { type: 'info', text: 'Agent ready. Waiting for user input...' },
    { type: 'info', text: 'User event: Requesting file edit.' },
    { type: 'info', text: 'Executing function call: multi_replace_file_content...' },
    { type: 'info', text: 'Code generation completed in 412ms.' }
];

let termMsgIndex = 0;
let isTerminalRunning = false;

const observerTerm = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isTerminalRunning) {
        isTerminalRunning = true;
        runTelemetry();
    }
}, { threshold: 0.5 });

if(terminalBody) {
    observerTerm.observe(document.querySelector('.telemetry-section'));
}

function runTelemetry() {
    terminalBody.innerHTML = '<span class="term-cursor"></span>';
    
    function addLine() {
        if (termMsgIndex >= telemetryMessages.length) {
            setTimeout(() => {
                termMsgIndex = 0;
                terminalBody.innerHTML = '<span class="term-cursor"></span>';
                addLine();
            }, 5000);
            return;
        }

        const msg = telemetryMessages[termMsgIndex];
        const date = new Date();
        const timeStr = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}.${date.getMilliseconds().toString().padStart(3, '0')}`;
        
        const line = document.createElement('div');
        line.className = 'term-line';
        line.innerHTML = `<span class="term-time">[${timeStr}]</span><span class="term-${msg.type}">${msg.text}</span>`;
        
        // Insert before cursor
        const cursor = terminalBody.querySelector('.term-cursor');
        terminalBody.insertBefore(line, cursor);
        terminalBody.scrollTop = terminalBody.scrollHeight;
        
        termMsgIndex++;
        
        // Random delay between 100ms and 800ms
        const delay = Math.random() * 700 + 100;
        setTimeout(addLine, delay);
    }
    
    setTimeout(addLine, 1000);
}

