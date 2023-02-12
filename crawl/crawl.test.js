const {normalizeURL , getURLFromHTML} = require('./crawl')
const {test , expect } = require('@jest/globals')

test('normalize URL strip protocol ',()=>{
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})

test('normalize URL strip end slash ',()=>{
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})

test('normalize URL strip capital letter ',()=>{
    const input = 'https://blog.BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})
test('normalize URL strip HTTP ',()=>{
    const input = 'http://blog.BOOT.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected) 
})



test('get URL from HTML',()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="https://blog.boot.dev/path">
        </a>
    </body>
    </html>    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHTML( inputHTMLBody , inputBaseURL)
    const expected = ['https://blog.boot.dev/path']
    expect(actual).toEqual(expected) 
})


test('get URL from HTML reletive',()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="/href">
        </a>
    </body>
    </html>    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHTML( inputHTMLBody , inputBaseURL)
    const expected = ['https://blog.boot.dev/href']
    expect(actual).toEqual(expected) 
})

test('get URL from HTML reletive and a satic one',()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="/href">
        </a>
        <a href="https://blog.boot.dev/href2">
        </a>
    </body>
    </html>    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHTML( inputHTMLBody , inputBaseURL)
    const expected = ['https://blog.boot.dev/href','https://blog.boot.dev/href2']
    expect(actual).toEqual(expected) 
})

test('get URL from HTML invalid link',()=>{
    const inputHTMLBody = `
    <html>
    <body>
        <a href="jpojo">
        </a>
    </body>
    </html>    `
    const inputBaseURL = "https://blog.boot.dev"
    const actual = getURLFromHTML( inputHTMLBody , inputBaseURL)
    const expected = []
    expect(actual).toEqual(expected) 
})