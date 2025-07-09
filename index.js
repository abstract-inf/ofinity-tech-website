function toggleVideo(container, show) {
const video = container.querySelector('.robot-video');
const img = container.querySelector('.robot-image');
if (!video || !img) return;

if (show) {
    img.style.display = 'none';
    video.style.display = 'block';
    video.play().catch(e => console.log('Video play failed:', e));
} else {
    img.style.display = 'block';
    video.style.display = 'none';
    video.pause();
    video.currentTime = 0;
}
}

window.addEventListener('scroll', () => {
const backToTop = document.getElementById('backToTop');
backToTop.classList.toggle('visible', window.scrollY > 300);
});

// Preload videos when page loads
document.addEventListener('DOMContentLoaded', () => {
document.querySelectorAll('.robot-video').forEach(video => {
    video.load();
});
});