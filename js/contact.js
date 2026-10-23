(function () {
    document.querySelectorAll('.contact-flip').forEach(function (card) {
        card.addEventListener('click', function () {
            card.setAttribute('aria-pressed', card.getAttribute('aria-pressed') === 'true' ? 'false' : 'true');
        });
    });
    var form = document.getElementById('professional-contact');
    if (!form) return;
    var endpoint = 'https://script.google.com/macros/s/AKfycbwvycloRbtoYajAzx1hNY5wqwa4Pcsj8IB840f-1QiHJD6I2WOkMnsSV1j5HyW9q24Q/exec';
    var subject = form.querySelector('#contact-subject');
    var other = form.querySelector('#contact-other-subject');
    var status = form.querySelector('.contact-response');
    var tokenPromise;
    function getToken() {
        return fetch(endpoint, {credentials: 'omit', redirect: 'follow'})
            .then(function (r) { if (!r.ok) throw new Error('Ligação indisponível.'); return r.json(); })
            .then(function (r) { if (!r.ok || !r.token) throw new Error('Resposta inválida.'); return r.token; });
    }
    // Obter o token quando o visitante começa a preencher, sem abrir páginas Google.
    form.addEventListener('focusin', function () {
        if (!tokenPromise) tokenPromise = getToken().catch(function () { tokenPromise = null; return null; });
    });
    function updateOther() {
        var show = subject.value === 'Outro assunto';
        form.querySelector('#other-subject-field').hidden = !show;
        other.required = show;
        other.disabled = !show;
    }
    subject.addEventListener('change', updateOther);
    form.addEventListener('submit', async function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;
        var button = form.querySelector('button');
        button.disabled = true;
        status.textContent = 'A enviar…';
        try {
            var token = await (tokenPromise || getToken());
            if (!token) throw new Error('Não foi possível ligar ao serviço.');
            var data = Object.fromEntries(new FormData(form));
            data.token = token;
            var response = await fetch(endpoint, {
                method: 'POST', credentials: 'omit', redirect: 'follow',
                headers: {'Content-Type': 'text/plain;charset=UTF-8'},
                body: JSON.stringify(data)
            });
            if (!response.ok) throw new Error('Resposta indisponível.');
            var result = await response.json();
            if (!result.ok) { status.textContent = result.mensagem; tokenPromise = null; return; }
            status.textContent = result.mensagem;
            tokenPromise = Promise.resolve(result.token);
            form.reset();
            updateOther();
        } catch (error) {
            status.textContent = 'Não foi possível confirmar o envio. Os dados foram mantidos. Antes de repetir, verifique se recebeu confirmação ou contacte amelia@cerejo.online.';
            tokenPromise = null;
        } finally { button.disabled = false; }
    });
})();
