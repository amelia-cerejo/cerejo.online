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
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        var status = form.querySelector('.contact-response');
        var button = form.querySelector('button');
        if (window.location.protocol === 'file:' || ['localhost', '127.0.0.1', '[::1]'].indexOf(window.location.hostname) !== -1) {
            status.textContent = 'Pré-visualização local: o envio estará disponível quando o formulário estiver configurado no alojamento. Contacto: info@cerejo.online.';
            return;
        }
        button.disabled = true;
        status.textContent = 'A enviar…';
        try {
            var data = new FormData(form);
            var response = await fetch('/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(data).toString()
            });
            if (!response.ok) throw new Error('Falha no envio');
            status.textContent = 'Mensagem enviada. Obrigada pelo seu contacto.';
            form.reset();
            updateOtherSubject();
        } catch (error) {
            status.textContent = 'Não foi possível enviar. Contacte diretamente info@cerejo.online.';
        } finally {
            button.disabled = false;
        }
    });
})();
