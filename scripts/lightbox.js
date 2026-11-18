// Image lightbox for the VFX & Animation page.
// Click any img.work-media to view it enlarged. Arrows (buttons or keys) step through
// the images in that same .work-card; they're hidden when the card has only one.
// Click the backdrop, the image or × (or press Esc) to close.
const lightbox = document.querySelector('.lightbox');

if (lightbox) {
    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    let images = [];
    let current = 0;

    function show(index) {
        current = (index + images.length) % images.length;
        const img = images[current];
        lightboxImage.src = img.currentSrc || img.src;
        lightboxImage.alt = img.alt;
        lightboxCounter.textContent = `${current + 1} / ${images.length}`;
    }

    document.querySelectorAll('img.work-media').forEach((img) => {
        img.tabIndex = 0;
        img.setAttribute('role', 'button');
        const open = () => {
            images = Array.from(img.closest('.work-card').querySelectorAll('img.work-media'));
            lightbox.classList.toggle('single', images.length < 2);
            show(images.indexOf(img));
            lightbox.showModal();
        };
        img.addEventListener('click', open);
        img.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
    });

    lightbox.querySelector('.lightbox-prev').addEventListener('click', (e) => {
        e.stopPropagation();
        show(current - 1);
    });
    lightbox.querySelector('.lightbox-next').addEventListener('click', (e) => {
        e.stopPropagation();
        show(current + 1);
    });
    lightbox.addEventListener('keydown', (e) => {
        if (images.length < 2) return;
        if (e.key === 'ArrowLeft') show(current - 1);
        if (e.key === 'ArrowRight') show(current + 1);
    });
    lightbox.addEventListener('click', () => lightbox.close());
}
