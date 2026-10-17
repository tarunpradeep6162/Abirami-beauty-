export function connectBooking() {
  const fragments = document.body.dataset.contact;
  const digits = fragments?.split(':').reverse().join('') ?? '';
  const phone = /^[1-9]\d{7,14}$/.test(digits) ? digits : null;
  const message = 'Hello Abirami, I would like to ask about an appointment.';
  const link = (text: string) => `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  if (phone) document.querySelectorAll<HTMLAnchorElement>('[data-contact-action]').forEach(anchor => {
    if (anchor.dataset.contactAction === 'call') anchor.textContent = `Call +${phone}`;
    anchor.href = anchor.dataset.contactAction === 'call' ? `tel:+${phone}` : link(message);
    if (anchor.dataset.contactAction === 'whatsapp') { anchor.target = '_blank'; anchor.rel = 'noopener noreferrer'; }
  });
  const form = document.querySelector<HTMLFormElement>('.enquiry-form');
  if (!form) return;
  const submit = form.querySelector<HTMLButtonElement>('[data-book-submit]')!;
  submit.disabled = !phone;
  const clean = (value: FormDataEntryValue | null, limit: number) => String(value ?? '').normalize('NFC').replace(/[\u0000-\u001f\u007f\ud800-\udfff]/g, ' ').trim().slice(0, limit);
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!phone || !form.reportValidity()) return;
    const data = new FormData(form);
    const name = clean(data.get('name'), 80);
    const service = clean(data.get('service'), 120);
    if (!name || !service) { form.querySelector('.form-status')!.textContent = 'Please add your name and what you would like to ask about.'; return; }
    const date = clean(data.get('date'), 10);
    const note = clean(data.get('note'), 800);
    location.assign(link(`Hello Abirami, I’m ${name}.\nI’d like to ask about: ${service}.\nPreferred date: ${/^\d{4}-\d{2}-\d{2}$/.test(date) ? date : 'Let’s discuss'}.\n${note}`));
  });
  const date = form.querySelector<HTMLInputElement>('input[type=date]');
  if (date) { const today = new Date(); date.min = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`; }
}
