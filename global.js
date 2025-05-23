function introduceLineHighlight() {
    document.querySelectorAll('.line-highlight').forEach(line => {
        const rect = line.getBoundingClientRect();
        const isVisible = window.innerHeight - rect.bottom > 100;
        if (isVisible) {
            line.classList.add('line-highlight-visible');
        } else {
            line.classList.remove('line-highlight-visible');
        }
    })
}

window.onscroll = () => {
    introduceLineHighlight();
}
