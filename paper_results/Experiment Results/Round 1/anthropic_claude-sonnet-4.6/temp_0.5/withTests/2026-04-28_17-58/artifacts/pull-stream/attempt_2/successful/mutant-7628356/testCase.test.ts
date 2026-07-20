import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js')

describe('tester', () => {
  it('should return a function that uses regexp.test() when given a regexp object', () => {
    const regexp = /^hello/
    const testFn = tester(regexp)
    
    // Original: typeof regexp === 'object' is true, returns fn using regexp.test(data)
    // Mutated: "" === typeof regexp is false, falls through to prop(regexp) || id
    // which does NOT call regexp.test(data) and returns different results
    
    expect(testFn('hello world')).toBe(true)
    expect(testFn('world hello')).toBe(false)
  })
})