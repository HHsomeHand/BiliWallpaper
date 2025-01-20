export function setMovable(Ele)
{
    let scale = 1;
    let originX = 0;
    let originY = 0;
    let isDragging = false;
    let startX, startY;

    Ele.addEventListener('mousedown', (event) => {
        event.stopPropagation();
        event.preventDefault();
        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        Ele.style.cursor = 'grabbing';
    });

    Ele.onclick = event => event.stopPropagation();

    window.addEventListener('mouseup', (event) => {
        event.stopPropagation();
        event.preventDefault();
        isDragging = false;
        Ele.style.cursor = 'grab';
    });

    window.addEventListener('mousemove', (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (!isDragging) return;

        const dx = event.clientX - startX;
        const dy = event.clientY - startY;

        originX += dx;
        originY += dy;

        startX = event.clientX;
        startY = event.clientY;

        Ele.style.transform = `translate(${originX}px, ${originY}px) scale(${scale})`;
    });

    Ele.reset = function() {
        scale = 1;
        originX = 0;
        originY = 0;
        Ele.style.transform = `translate(0, 0) scale(${scale})`;
    }


}
