import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe('tester', () => {
  it('should return a function that uses regexp.test when given a regexp object', () => {
    const regexp = /^hello/
    const testFn = tester(regexp)
    
    // Original: typeof regexp === 'object' is true, so condition is true,
    // returns function(data) { return regexp.test(data) }
    // Mutated: typeof regexp !== 'object' is false, so condition is false,
    // falls through to prop(regexp) || id, which returns identity function
    // and testFn('hello world') would return 'hello world' instead of true
    
    const resultMatch = testFn('hello world')
    const resultNoMatch = testFn('world hello')
    
    expect(resultMatch).toBe(true)
    expect(resultNoMatch).toBe(false)
  })
})