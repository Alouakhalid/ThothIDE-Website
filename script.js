// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { root: null, rootMargin: '0px', threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    document.getElementById('navbar').style.background =
        window.scrollY > 40 ? 'rgba(4,10,20,0.97)' : 'rgba(6,14,24,0.85)';
});

// Tab switching
function openTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    const idx = tabId.replace('tab', '');
    const btn = document.getElementById('tabBtn' + idx);
    if (btn) btn.classList.add('active');
}

// Typewriter on mockup
const codeLines = document.querySelectorAll('.mockup-body .code-line');
const cursorEl  = document.querySelector('.cursor');
codeLines.forEach(l => { l.style.opacity = '0'; l.style.transform = 'translateY(4px)'; l.style.transition = 'all 0.3s'; });
setTimeout(() => {
    let delay = 0;
    codeLines.forEach(line => {
        setTimeout(() => {
            line.style.opacity = '1';
            line.style.transform = 'translateY(0)';
            if (cursorEl) line.appendChild(cursorEl);
        }, delay);
        delay += 500;
    });
}, 1200);

// Live Telemetry Terminal
const termEl = document.getElementById('live-terminal');
const msgs = [
    { t:'info', s:'Initializing ThothIDE v2.0 — LayerMind AI...' },
    { t:'info', s:'Loading PyQt6 framework (C++ runtime)...' },
    { t:'info', s:'Allocating non-blocking QThreads for UI isolation...' },
    { t:'info', s:'Connecting to Hugging Face Inference API...' },
    { t:'info', s:'Registering MCP tool registry (17 tools)...' },
    { t:'warn', s:'No MCP servers detected. Starting in embedded mode.' },
    { t:'info', s:'Secure IPC socket established on port 4519...' },
    { t:'info', s:'Agent mode: ACTIVE — tool calling enabled.' },
    { t:'info', s:'Workspace: /Users/ali/projects/my_app loaded.' },
    { t:'info', s:'User event: "Build a FastAPI server with /health endpoint"' },
    { t:'info', s:'Executing tool call: write_file → server.py' },
    { t:'info', s:'Tool executed successfully. File written: server.py (42 lines)' },
    { t:'info', s:'Code generation complete in 387ms.' },
    { t:'info', s:'Refreshing file explorer tree...' },
    { t:'info', s:'Ready. Waiting for next instruction...' },
];
let idx = 0, running = false;

const termObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !running) { running = true; startTelemetry(); }
}, { threshold: 0.4 });
if (termEl) termObs.observe(document.querySelector('.telemetry-section'));

function startTelemetry() {
    termEl.innerHTML = '<span class="term-cursor"></span>';
    idx = 0;
    addLine();
}
function addLine() {
    if (idx >= msgs.length) { setTimeout(startTelemetry, 4000); return; }
    const m = msgs[idx];
    const now = new Date();
    const ts = `${h(now.getHours())}:${h(now.getMinutes())}:${h(now.getSeconds())}.${String(now.getMilliseconds()).padStart(3,'0')}`;
    const div = document.createElement('div');
    div.className = 'term-line';
    div.innerHTML = `<span class="term-time">[${ts}]</span><span class="term-${m.t}">${m.s}</span>`;
    const cur = termEl.querySelector('.term-cursor');
    termEl.insertBefore(div, cur);
    termEl.scrollTop = termEl.scrollHeight;
    idx++;
    setTimeout(addLine, 150 + Math.random() * 600);
}
function h(n) { return String(n).padStart(2,'0'); }
