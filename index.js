  
class changeHTML {
  element(element) {
    if(element.tagName === "title") {
      element.setInnerContent("Cloudflare Product Review");
    }
    if(element.tagName === "h1") {
      element.setInnerContent("Cloudflare Gateway");
    }
    if(element.tagName === "p") {
      element.setInnerContent("In today's presentation we'll discuss the benefits of using Cloudflare Gateway");
    }
    if(element.tagName === "a") {
      element.setAttribute("href", "https://www.youtube.com/watch?v=lVZt6u03b4U");
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