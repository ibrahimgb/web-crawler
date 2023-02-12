const {normalizeURL} = require('./crawl')
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