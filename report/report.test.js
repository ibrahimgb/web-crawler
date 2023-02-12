const { sortPages } = require('./report')
const {test , expect } = require('@jest/globals')

test('normalize URL strip protocol ',()=>{
    const input = {
        'https://blog.boot.dev/path': 3,
        'https://blog.boot.dev/': 1,
        'https://blog.boot.dev/api': 2,
    }
    const actual = sortPages(input)
    const expected = [['https://blog.boot.dev/path' , 3],
                    ['https://blog.boot.dev/api', 2,],
                    ['https://blog.boot.dev/', 1]
                    ]
    expect(actual).toEqual(expected) 
})

  