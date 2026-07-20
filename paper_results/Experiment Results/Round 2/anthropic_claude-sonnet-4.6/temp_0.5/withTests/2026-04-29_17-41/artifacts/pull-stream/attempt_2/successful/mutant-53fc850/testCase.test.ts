import tester = require('../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js')

describe('tester with regexp', () => {
  it('should return a function that uses regexp.test() when given a regexp-like object', () => {
    const regexp = /^hello/
    const testFn = tester(regexp)

    // With original code: condition 'object' === typeof test is true for RegExp,
    // so returns (data) => test.test(data), which correctly matches
    expect(testFn('hello world')).toBe(true)
    expect(testFn('world hello')).toBe(false)

    // With mutated code: condition 'object' !== typeof test is false for RegExp,
    // so falls through to prop(test) || id, returning identity function
    // identity('hello world') returns 'hello world' (truthy, not boolean true/false)
    // but more importantly, testFn('world hello') would return 'world hello' (truthy)
    // instead of false, exposing the mutation
  })
})