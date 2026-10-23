(function () {
    document.querySelectorAll('.contact-flip').forEach(function (card) {
        card.addEventListener('click', function () {
            card.setAttribute('aria-pressed', card.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        });
    });
    var form = document.getElementById('professional-contact');
    if (!form) return;
    var subject = form.querySelector('#contact-subject');
    var otherField = form.querySelector('#other-subject-field');
    var otherInput = form.querySelector('#contact-other-subject');
    function updateOtherSubject() {
        var show = subject.value === 'Outro assunto';
        otherField.hidden = !show;
        otherInput.disabled = !show;
        otherInput.required = show;
    }
    subject.addEventListener('change', updateOtherSubject);
    updateOtherSubject();
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;
        var data = new FormData(form);
        var selectedSubject = subject.value === 'Outro assunto' ? otherInput.value.trim() : subject.value;
        var body = 'Nome: ' + data.get('full_name') + '\r\nEmail: ' + data.get('email') + '\r\n\r\n' + data.get('message');
        var mailto = 'mailto:amelia@cerejo.online?subject=' + encodeURIComponent(selectedSubject) + '&body=' + encodeURIComponent(body);
        form.querySelector('.contact-response').textContent = 'A mensagem será aberta no seu programa de email. Reveja-a e clique em Enviar nesse programa. Se não abrir, contacte amelia@cerejo.online.';
        window.location.href = mailto;
    });
})();
