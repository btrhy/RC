(() => {
  const assetUrl = document.currentScript.src;
  const list = document.querySelector('#project-list');
  const template = document.querySelector('#project-template');
  const viewer = document.querySelector('#photo-viewer');
  const title = viewer.querySelector('#photo-viewer-title');
  const stage = viewer.querySelector('.photo-viewer-stage');
  const enlarged = stage.querySelector('img');
  const position = viewer.querySelector('.photo-position');
  const previous = viewer.querySelector('.photo-previous');
  const next = viewer.querySelector('.photo-next');
  let photos = [];
  let activeIndex = 0;
  let opener;
  let dragStart;

  function showPhoto(index) {
    activeIndex = (index + photos.length) % photos.length;
    const photo = photos[activeIndex];
    enlarged.alt = photo.alt;
    enlarged.src = photo.src;
    position.textContent = `${activeIndex + 1} of ${photos.length}`;
  }

  previous.addEventListener('click', () => showPhoto(activeIndex - 1));
  next.addEventListener('click', () => showPhoto(activeIndex + 1));

  viewer.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(activeIndex + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });

  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) viewer.close();
  });

  viewer.addEventListener('close', () => {
    dragStart = undefined;
    if (!viewer.open) opener.focus({ preventScroll: true });
  });

  stage.addEventListener('pointerdown', (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    dragStart = { id: event.pointerId, x: event.clientX, y: event.clientY };
    stage.setPointerCapture(event.pointerId);
  });

  stage.addEventListener('pointerup', (event) => {
    if (dragStart?.id !== event.pointerId) return;
    const dx = event.clientX - dragStart.x;
    const dy = event.clientY - dragStart.y;
    dragStart = undefined;
    if (Math.abs(dx) >= 40 && Math.abs(dx) > Math.abs(dy)) {
      showPhoto(activeIndex + (dx < 0 ? 1 : -1));
    }
  });

  stage.addEventListener('lostpointercapture', (event) => {
    if (dragStart?.id === event.pointerId) dragStart = undefined;
  });

  for (const project of projects) {
    const card = template.content.cloneNode(true);
    card.querySelector('h2').textContent = project.title;
    card.querySelector('.project-subtitle').textContent = project.subtitle;
    card.querySelector('.project-description').textContent = project.description;

    const gallery = card.querySelector('.project-gallery');
    gallery.setAttribute('aria-label', `${project.title} photos`);

    const projectPhotos = project.photos.map((photo) => ({
      ...photo,
      src: new URL(photo.src, assetUrl).href,
    }));

    for (const [index, photo] of projectPhotos.entries()) {
      const item = document.createElement('li');
      const button = document.createElement('button');
      button.type = 'button';
      button.setAttribute('aria-label', `Enlarge photo ${index + 1}: ${photo.alt}`);
      button.setAttribute('aria-haspopup', 'dialog');
      button.addEventListener('click', () => {
        opener = button;
        button.focus({ preventScroll: true });
        photos = projectPhotos;
        title.textContent = project.title;
        previous.disabled = next.disabled = photos.length < 2;
        showPhoto(index);
        viewer.showModal();
      });

      const image = document.createElement('img');
      image.src = photo.src;
      image.alt = photo.alt;
      image.loading = 'lazy';
      image.decoding = 'async';
      button.append(image);
      item.append(button);
      gallery.append(item);
    }

    list.append(card);
  }
})();
