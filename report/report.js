function sortPages(pages){
    const pagesArr = Object.entries(pages)
    pagesArr.sort((a,b)=>{
        aCount = a[1]
        bCount = b[1]

        return b[1] - a[1]
    })
    return pagesArr
}



function printReport(pages){
    console.log("---------REPORT-----------")
    const sortedPages = sortPages(pages)

    sortedPages.map((sortedPage)=>{
        const url = sortedPage[0]
        const score = sortedPage[1]
        console.log(` ${url} has score ${score}`);
    })

    console.log("---------END-----------")
}


module.exports = {
    printReport,
    sortPages
}
