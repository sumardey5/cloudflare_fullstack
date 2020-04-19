addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {
  try {
    const urls = await fetch('https://cfw-takehome.developers.workers.dev/api/variants')
    .then((response) => {
      return response.json();
    });
    const newURL = await fetch(urls['variants'][Math.floor(Math.random() * 2)])
    .then((response) => {
      return response.text();
    });
    return new Response(newURL, {headers: { 'content-type': 'text/html' },});
  }
  catch{
    window.location.href = "http://www.w3schools.com"
  }
}