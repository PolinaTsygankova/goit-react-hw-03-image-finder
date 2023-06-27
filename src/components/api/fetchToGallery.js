export function fetchToGallery(textQuery, currentPage) {
  return fetch(
    `https://pixabay.com/api/?q=${textQuery}&page=${currentPage}&key=35869427-65f66342165db7316d77cd90d&image_type=photo&orientation=horizontal&per_page=12`
  ).then(res => {
    if (res.ok) {
      return res.json();
    }

    return new Error('Something goes wrong');
  });
}
