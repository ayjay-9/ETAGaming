"use strict";

document.addEventListener('DOMContentLoaded', (event) => {
    const aboutDescription = document.getElementById('about-description');
    const aboutMissionVision = document.getElementById('about-mission-vision');
    const aboutMission = document.getElementById('about-mission');
    const aboutVision = document.getElementById('about-vision');
    const locations = document.getElementById('locations');

    function checkScroll() {
        const rect = aboutDescription.getBoundingClientRect();
        const rectLocations = locations.getBoundingClientRect();
        // If the bottom of about-description is above the middle of the viewport
        if (rect.bottom < window.innerHeight / 1.5) {
            aboutMissionVision.classList.add('visible');
            aboutMission.classList.add('visible');
            aboutVision.classList.add('visible');
        } else {
            aboutMissionVision.classList.remove('visible');
            aboutMission.classList.remove('visible');
            aboutVision.classList.remove('visible');
        }

        // If the top of locations is above the middle of the viewport
        if (rectLocations.top < window.innerHeight * 0.8) {
            locations.classList.add('visible');
            aboutMissionVision.classList.remove('visible');
            aboutMission.classList.remove('visible');
            aboutVision.classList.remove('visible');
        } else {
            locations.classList.remove('visible');
            aboutMissionVision.classList.add('visible');
            aboutMission.classList.add('visible');
            aboutVision.classList.add('visible');
        }
    }

    const world = Globe()
        .width(800)  // Set your desired width
        .height(500) // Set your desired height
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
        .pointsData([
            { lat: 51.8894, lng: -8.4942, size: 1, label: 'Griffith College Cork' },
            { lat: 53.3498, lng: -6.2603, size: 1, label: 'Dublin' },
            { lat: 6.5244, lng: 3.3792, size: 1, label: 'Lagos' },
            { lat: 35.6895, lng: 139.6917, size: 1, label: 'Tokyo' },
            { lat: 34.0522, lng: -118.2437, size: 1, label: 'Los Angeles' },          // North America
            { lat: 37.5665, lng: 126.9780, size: 1, label: 'Seoul' },                 // Asia
            { lat: -23.5505, lng: -46.6333, size: 1, label: 'São Paulo' },            // South America
            { lat: -33.8688, lng: 151.2093, size: 1, label: 'Sydney' },               // Australia/Oceania
            { lat: -77.8419, lng: 166.6863, size: 1, label: 'McMurdo Station' }       // Antarctica
        ])
        .pointAltitude(0.1)
        .pointLabel('label')
        .pointColor(() => '#3CA9E2');

    const container = document.getElementById('globe-container');
    world(container);

    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Run on load
});