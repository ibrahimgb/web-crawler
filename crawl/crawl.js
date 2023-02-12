const {JSDOM} = require('jsdom')

async function crawlPage(baseURL , currentURL , pages ){
    

    const baseURLObj = new URL(baseURL);
    const currentURLObj = new URL(currentURL);

    if(baseURLObj.hostname !== currentURLObj.hostname){
        return pages     
    }

    const normalizeCurrentURL = normalizeURL(currentURL)

    if(pages[normalizeCurrentURL] > 0 ){
        pages[normalizeCurrentURL]++ 
        return pages  
    }
    pages[normalizeCurrentURL] = 1

    console.log(`currently crawling: ${currentURL}`)

    try{
        const resp = await fetch(currentURL)
        if (resp.status > 399){
            console.log(`errer in fetch with status ${resp.status} on page ${currentURL}`)
            return pages
        }

        const contentType = resp.headers.get("content-type")

        if(!contentType.includes('text/html')){
            console.log(`errer no HTML responce, content type: ${contentType}, on page ${currentURL}`)
            return pages
        }

        const htmlBody = await resp.text()

        const nextURLs = getURLFromHTML(htmlBody, baseURL)
        //console.log("three")
        for (nextUrl of nextURLs){
            const newPages = await crawlPage(baseURL, nextUrl , pages)
            pages = {...pages, ...newPages}
        }

    }catch(err){
        console.log(`error in fetch: ${err.message}, on page ${currentURL}`)
    }
    return pages
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