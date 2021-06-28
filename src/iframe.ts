let highlighIframe = false;
export default function toggleIframeOutline() {
    const iframe = document.getElementsByTagName('iframe');
    if (!highlighIframe) {
        highlighIframe = true;
        for (let i = 0; i < iframe.length; i++) {
            iframe[i].style.outline = '10px solid tomato';
        }
    } else {
        highlighIframe = false;
        for (let i = 0; i < iframe.length; i++) {
            iframe[i].style.outline = 'initial';
        }
    }
}
