(function () {
    document.querySelectorAll('.contact-flip').forEach(function (card) {
        card.addEventListener('click', function () {
            card.setAttribute('aria-pressed', card.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        });
    });
})();
