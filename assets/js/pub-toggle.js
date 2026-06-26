document.addEventListener('click', function (event) {
  var button = event.target.closest('.pub-abstract-toggle');
  if (!button) return;

  var host = button.closest('p') || button;
  var abstract = host.nextElementSibling;
  if (!abstract || !abstract.classList.contains('pub-abstract')) return;

  var open = abstract.classList.toggle('is-open');
  button.classList.toggle('is-open', open);
  button.setAttribute('aria-expanded', open ? 'true' : 'false');
  button.textContent = open ? 'Hide abstract' : 'Abstract';
});
