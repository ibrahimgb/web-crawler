const {JSDOM} = require('jsdom')

async function crawlPage(currentURL){
    console.log(`currently crawling: ${currentURL}`)
    try{
        const resp = await fetch(currentURL)
        if (resp.status > 399){
            console.log(`errer in fetch with status ${resp.status} on page ${currentURL}`)
            return
        }

        const contentType = resp.headers.get("content-type")

        if(!contentType.includes('text/html')){
            console.log(`errer no HTML responce, content type: ${contentType}, on page ${currentURL}`)
            return
        }


        console.log( await resp.text())
    }catch(err){
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
}
function getURLFromHTML(htmlBody, baseURL){
    const urls =  []
    const dom = new JSDOM(htmlBody)
    const linkElements =dom.window.document.querySelectorAll('a');
    for(const linkElement of linkElements){

        
        if(linkElement.href.slice(0,1) === '/'){

            try{
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urls.push(`${baseURL}${linkElement.href}`)
            }catch(err){
                console.log(err)
            }

        } else {

            try{
                const urlObj = new URL(linkElement.href)
                urls.push(linkElement.href)
            }catch(err){
                console.log(err)
            }
        }
        
    }
    return urls;
}


function normalizeURL(urlString){

    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`
    if (hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0,-1)
    }
 return (hostPath);    
}

module.exports = {
    normalizeURL,
    getURLFromHTML,
    crawlPage
}