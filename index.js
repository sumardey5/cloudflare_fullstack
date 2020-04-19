class changeHTML {
   element(element) {
     if(element.tagName === "title") {
       element.setInnerContent("Cloudflare's product review");
     }
     if(element.tagName === "h1") {
       element.setInnerContent("Product X");
     }
     if(element.tagName === "p") {
       element.setInnerContent("In today's video we'll discuss the benefits of Product X");
     }
     if(element.tagName === "a") {
       element.setAttribute("href", "https://www.youtube.com");
       element.setInnerContent("Watch Video");
     }
   }
 }

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

/** @param {Request} request*/

async function handleRequest(request) {
  try {
    const urls = await fetch("https://cfw-takehome.developers.workers.dev/api/variants")
    .then((response) => {
      return response.json();
    });
    const newURL = await fetch(urls['variants'][Math.floor(Math.random() * 2)])
    .then((response) => {
      return response.text();
    });
    result = new Response(newURL, {headers: { "content-type": "text/html" },});
    const htmlWriter = new HTMLRewriter();
    htmlWriter.on("p", new changeHTML()).on("title", new changeHTML()).on("h1", new changeHTML())
    .on("a", new changeHTML());
    return htmlWriter.transform(result);
  }
  catch {
    window.location.href = "https://www.cloudflare.com/";
  }
}