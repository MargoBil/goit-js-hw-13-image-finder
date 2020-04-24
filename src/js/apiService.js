export default async function (keyWord, numberOfPage, userKey) {
  try {
    const response = await fetch (
      `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${keyWord}&page=${numberOfPage}&per_page=12&key=${userKey}`
    );
    const images = response.json ();
    return images;
  } catch (error) {
    throw err;
  }
}
