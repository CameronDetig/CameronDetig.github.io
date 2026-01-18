// Handle Hugging Face iframe loading
const hfIframe = document.querySelector('.hf-iframe');
const hfLoading = document.getElementById('hf-loading');
const hfError = document.getElementById('hf-error');

if (hfIframe && hfLoading) {
    // Show iframe when it loads successfully
    hfIframe.addEventListener('load', () => {
        console.log('Hugging Face Space loaded successfully');
        hfLoading.style.display = 'none';
        hfIframe.style.display = 'block';
        hfError.style.display = 'none';
    });

    // Handle load errors
    hfIframe.addEventListener('error', () => {
        console.error('Failed to load Hugging Face Space');
        hfLoading.style.display = 'none';
        hfIframe.style.display = 'none';
        if (hfError) {
            hfError.style.display = 'block';
        }
    });

    // Show iframe after 3 seconds to allow HF to display its own loading state
    // This handles sleeping Spaces - HF will show a "Building" message
    setTimeout(() => {
        if (hfIframe.style.display === 'none') {
            hfIframe.style.display = 'block';
            hfLoading.style.display = 'none';
        }
    }, 3000);

    // Final timeout fallback - if iframe still hasn't loaded after 30 seconds
    // (Sleeping Spaces can take 20-30 seconds to wake up)
    setTimeout(() => {
        // Check if iframe is still hidden (didn't load)
        if (hfIframe.style.display === 'none' || hfIframe.style.display === '') {
            try {
                // Try to check if iframe has content
                const iframeDoc = hfIframe.contentDocument || hfIframe.contentWindow.document;
                // If we can't access it or it's blank, show error
                if (!iframeDoc || iframeDoc.location.href === 'about:blank') {
                    hfLoading.style.display = 'none';
                    hfIframe.style.display = 'none';
                    if (hfError) {
                        hfError.style.display = 'block';
                    }
                }
            } catch (e) {
                // CORS error is expected - iframe is trying to load from different origin
                // This actually means the iframe IS loading, so we're good
                console.log('Iframe is loading from HF (CORS detected, this is normal)');
            }
        }
    }, 30000);
}
