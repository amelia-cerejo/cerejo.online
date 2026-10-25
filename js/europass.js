(() => {
const buttons = document.querySelectorAll('[data-lang]');
function choose(lang) {
  document.documentElement.lang = lang === 'en' ? 'en' : 'pt-PT';
  document.title = (lang === 'en' ? 'CV' : 'Currículo') + ' — Amélia Cerejo Lopes';
  document.querySelectorAll('[data-language]').forEach(section => {section.hidden = section.dataset.language !== lang;});
  buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.lang === lang)));
  document.getElementById('rights').textContent = lang === 'en' ? 'All rights reserved.' : 'Todos os direitos reservados.';
  const url = new URL(location.href); url.searchParams.set('lang', lang); history.replaceState(null, '', url);
}
buttons.forEach(button => button.addEventListener('click', () => choose(button.dataset.lang)));
choose(new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'pt');
})();