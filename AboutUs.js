document.addEventListener('DOMContentLoaded', function() {
    // Journey timeline data
    const journeyData = [
        {
            date: "September 2023",
            title: "The Beginning",
            content: "A couple of high school graduates enrolled at Al Hussein Technical University, majoring in engineering and I.T. This marked the start of our academic journey.",
            icon: "fas fa-graduation-cap"
        },
        {
            date: "First Year",
            title: "Discovering Our Passions",
            content: "As we progressed through our first year, we all discovered our passions for STEM. Some through university STEM classes, while others had known beforehand but never fully focused on it.",
            icon: "fas fa-lightbulb"
        },
        {
            date: "2023-2024",
            title: "Competition Era",
            content: "Our dedication for STEM grew as we started joining multiple competitions throughout our first and second years. This period was crucial for our team's development.",
            icon: "fas fa-trophy"
        },
        {
            date: "2024",
            title: "Winning Streak",
            content: "We began winning prestigious competitions like the HTU Stem competition, Firefighting IEE competition, and RoboLine. These victories fueled our ambition and confidence.",
            icon: "fas fa-medal"
        },
        {
            date: "Present",
            title: "Birth of Ofinity Tech",
            content: "Realizing the current market wasn't meeting our ambitions, we founded Ofinity Tech - a shop offering innovative products to help customers stand out and gain a competitive advantage.",
            icon: "fas fa-rocket"
        }
    ];

    const timelineItemsContainer = document.querySelector('.timeline-items');
    const timelineProgress = document.querySelector('.timeline-progress');

    // Create a new element for the progress bar fill
    const progressFill = document.createElement('div');
    progressFill.className = 'progress-fill';
    timelineProgress.appendChild(progressFill);

    // Create timeline items
    journeyData.forEach((item, index) => {
        const timelineItem = document.createElement('div');
        timelineItem.className = 'timeline-item';
        timelineItem.innerHTML = `
            <div class="timeline-date">
                <i class="${item.icon}"></i>
                ${item.date}
            </div>
            <h3 class="timeline-title">${item.title}</h3>
            <p class="timeline-content">${item.content}</p>
        `;
        timelineItemsContainer.appendChild(timelineItem);
    });

    // Intersection Observer for scroll-triggered animations and progress
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                updateProgress();
            }
        });
    }, { threshold: 0.1 });

    // Function to update progress based on visible items
    function updateProgress() {
        const allItems = document.querySelectorAll('.timeline-item');
        let visibleCount = 0;
        
        allItems.forEach(item => {
            if (item.classList.contains('active')) {
                visibleCount++;
            }
        });
        
        const progressPercentage = (visibleCount / allItems.length) * 100;
        progressFill.style.height = `${progressPercentage}%`;
    }

    // Observe all timeline items
    document.querySelectorAll('.timeline-item').forEach(item => {
        observer.observe(item);
    });
});