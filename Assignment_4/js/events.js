"use strict";

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const discoverEventsLink = document.querySelector('.discover-events-link');
    const backgroundImage = document.querySelector('.events-background');
    const images = [
        '../images/Event_Background_Image/apex-legends-background.png',
        '../images/fortnite.png',
        '../images/callofduty.jpg',
        '../images/Batman.jpg',
        '../images/EA-FC-25-Premier-League-POTM-.avif',
        '../images/zelda.jpg',
        '../images/forza-background.jpg',
        '../images/NBA2k25.jpg',
        '../images/mortal-kombat.jpg',
    ];
    let currentIndex = 0;
    const dimOverlay = document.getElementById('dim-overlay');

    // Hamburger menu toggle
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('show');
        hamburger.classList.toggle('active');
    });

    // Discover events link scroll
    discoverEventsLink.addEventListener('click', function (e) {
        e.preventDefault();
        const eventList = document.getElementById('event-list');
        eventList.classList.toggle('show');
        eventList.scrollIntoView({ behavior: 'smooth' });
    });

    // Learn more logic for all events
    const learnMoreLinks = document.querySelectorAll('.learn-more');

    learnMoreLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();

            // Reset all popups first
            document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
            document.body.classList.remove('popup-active');
            dimOverlay.classList.remove('active');

            const card = link.closest('.event-card');
            const title = card.querySelector('h1')?.textContent || '';

            // Determine which popup to show
            let popupId = '';
            if (title.includes('Fortnite')) popupId = 'learn-more-fortnite';
            else if (title.includes('Call of Duty')) popupId = 'learn-more-callOfDuty';
            else if (title.includes('Batman')) popupId = 'learn-more-batman';
            else if (title.includes('EA Sports')) popupId = 'learn-more-eaSports';
            else if (title.includes('Zelda')) popupId = 'learn-more-zelda';
            else if (title.includes('Forza')) popupId = 'learn-more-forza';
            else if (title.includes('NBA')) popupId = 'learn-more-nba';
            else if (title.includes('Mortal Kombat')) popupId = 'learn-more-mortalKombat';

            if (popupId) {
                const popup = document.getElementById(popupId);
                if (popup) {
                    popup.classList.add('show');
                    document.body.classList.add('popup-active');
                    dimOverlay.classList.add('active');
                    popup.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            }
        });
    });

    // Close all popups when clicking X buttons
    const closeButtons = document.querySelectorAll('[class^="close-"]');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
            document.body.classList.remove('popup-active');
            dimOverlay.classList.remove('active');
        });
    });

    // Preload images
    function preloadImages() {
        images.forEach(img => {
            new Image().src = img;
        });
    }
    preloadImages();

    // Background image slideshow with fade
    setInterval(() => {
        backgroundImage.style.opacity = 0.4;
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % images.length;
            backgroundImage.src = images[currentIndex];
            backgroundImage.style.opacity = 1;
        }, 1000);
    }, 5000);

    /* ---------- RSVP FORM HANDLING ---------- */
    function showRSVPForm(eventDetails) {
        // First close any existing popups
        document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
        document.querySelectorAll('.rsvp-form-popup').forEach(p => p.remove());

        // Create form popup
        const popup = document.createElement('div');
        popup.className = 'rsvp-form-popup';
        popup.innerHTML = `
        <div class="rsvp-form-container">
            <button class="close-rsvp-form">X</button>
            <h3>RSVP for ${eventDetails.title}</h3>
            <form id="rsvpForm">
                <div class="form-group">
                    <label for="name">Full Name</label>
                    <input type="text" id="name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" required>
                </div>
                <div class="form-group">
                    <label for="ticket">Ticket Type</label>
                    <select id="ticket" required>
                        <option value="General Admission">General Admission</option>
                        <option value="VIP">VIP</option>
                        <option value="Premium">Premium</option>
                    </select>
                </div>
                <button type="submit" class="submit-rsvp">Confirm RSVP</button>
            </form>
        </div>
    `;

        // Add to DOM and activate overlay
        document.body.appendChild(popup);
        dimOverlay.classList.add('active');
        document.body.classList.add('popup-active');

        // Add click handler to the popup to stop propagation
        popup.addEventListener('click', function (e) {
            e.stopPropagation();
        });

        // Form submission handler
        const form = popup.querySelector('#rsvpForm');
        const submitBtn = form.querySelector('.submit-rsvp');

        form.addEventListener('submit', async function (e) {
            e.preventDefault();

            // Validate form
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
            }

            // Set loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Generating Ticket...';

            const formData = {
                attendeeName: form.querySelector('#name').value,
                attendeeEmail: form.querySelector('#email').value,
                ticketType: form.querySelector('#ticket').value,
                confirmationCode: 'EVT-' + Math.random().toString(36).substr(2, 8).toUpperCase(),
                ...eventDetails
            };

            try {
                // Generate QR code
                const qr = qrcode(0, 'L');
                qr.addData(formData.confirmationCode);
                qr.make();
                const qrCode = qr.createDataURL(10, 4);

                // Generate PDF
                const { jsPDF } = window.jspdf;
                const doc = new jsPDF();

                // Add styling and content
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(20);
                doc.setTextColor(40, 53, 147);
                doc.text('EVENT RSVP CONFIRMATION', 105, 25, { align: 'center' });

                // Event details section
                doc.setFontSize(14);
                doc.setTextColor(0, 0, 0);
                doc.setFont('helvetica', 'bold');
                doc.text('Event Details:', 20, 45);
                doc.setFont('helvetica', 'normal');

                doc.text(`Title: ${formData.title}`, 20, 55);
                doc.text(`Date: ${formData.date}`, 20, 65);
                doc.text(`Time: ${formData.time}`, 20, 75);
                doc.text(`Location: ${formData.location}`, 20, 85);

                // Attendee info section
                doc.setFont('helvetica', 'bold');
                doc.text('Your Information:', 20, 105);
                doc.setFont('helvetica', 'normal');

                doc.text(`Name: ${formData.attendeeName}`, 20, 115);
                doc.text(`Email: ${formData.attendeeEmail}`, 20, 125);
                doc.text(`Ticket Type: ${formData.ticketType}`, 20, 135);

                // Add QR code at middle of A4 (210mm wide)
                const pageWidth = doc.internal.pageSize.getWidth();
                const pageHeight = doc.internal.pageSize.getHeight();
                const qrSize = 100;
                const bottomPadding = 50; // Space above footer text

                // Position QR code just above the footer text
                const qrX = (pageWidth - qrSize) / 2;
                const qrY = pageHeight - bottomPadding - qrSize;

                doc.addImage(qrCode, 'PNG', qrX, qrY, qrSize, qrSize);
                doc.text('Scan for check-in', pageWidth / 2, qrY + qrSize + 6, { align: 'center' });

                // Footer
                doc.setFontSize(10);
                doc.setTextColor(100);
                doc.text('Thank you for registering!', 105, 280, { align: 'center' });
                doc.text('ETA Gaming Events', 105, 285, { align: 'center' });

                // Save the PDF
                doc.save(`ETA_RSVP_${formData.title.replace(/\s+/g, '_')}.pdf`);

                // Close form
                closeRSVPForm(popup);

                // Show success message
                alert('RSVP confirmed! Your ticket has been downloaded.');
            } catch (error) {
                console.error('PDF generation failed:', error);
                alert('Error generating ticket. Please try again.');
            } finally {
                // Reset loading state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm RSVP';
            }
        });

        // Close button handler
        popup.querySelector('.close-rsvp-form').addEventListener('click', () => {
            closeRSVPForm(popup);
        });

        function closeRSVPForm(popup) {
            if (popup && popup.parentNode) {
                popup.parentNode.removeChild(popup);
            }
            document.querySelectorAll('.popup').forEach(p => p.classList.remove('show'));
            dimOverlay.classList.remove('active');
            document.body.classList.remove('popup-active');
        }
    }

    /* ---------- SETUP RSVP BUTTONS ---------- */
    function setupRSVPButtons() {
        document.querySelectorAll('.event-link').forEach(button => {
            button.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();

                let eventCard = this.closest('.event-card');
                let popup = this.closest('.popup');

                let eventDetails = {};

                if (eventCard) {
                    // Button is inside an event-card
                    eventDetails = {
                        title: eventCard.querySelector('h1').textContent,
                        date: eventCard.querySelector('.event-date').textContent.split('–')[0].trim(),
                        time: eventCard.querySelector('.event-date').textContent.split('–')[1].trim(),
                        location: eventCard.querySelector('.see-physical-location')?.textContent || 'Online Event'
                    };
                } else if (popup) {
                    // Button is inside a popup
                    eventDetails = {
                        title: popup.querySelector('h2').textContent,
                        date: popup.querySelector('.event-date').textContent.split('–')[0].trim(),
                        time: popup.querySelector('.event-date').textContent.split('–')[1].trim(),
                        location: popup.querySelector('.see-physical-location')?.textContent || 'Online Event'
                    };
                } else {
                    console.error('No event-card or popup found for RSVP button');
                    return;
                }

                showRSVPForm(eventDetails);
            });
        });
    }

    // Initialize RSVP buttons
    setupRSVPButtons();
});