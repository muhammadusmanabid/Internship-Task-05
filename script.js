const images = document.querySelectorAll('img[data-src]');

const lazyLoad = (image) => {
  const src = image.getAttribute('data-src');
  if (!src) return;
  image.setAttribute('src', src);
  image.onload = () => image.classList.add('loaded');
  image.removeAttribute('data-src');
};

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      lazyLoad(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

images.forEach(image => {
  imageObserver.observe(image);
});