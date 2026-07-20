import { describe, it, expect } from '@jest/globals'
import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js'

describe('tester with regexp', () => {
  it('should use regexp test method when given a regexp object', () => {
    const regexp = /^hello/
    const testFn = tester(regexp)
    
    // With the original code: typeof regexp === 'object' is true,
    // so it returns function(data) { return test.test(data) }
    // which correctly tests the string against the regexp.
    //
    // With the mutated code: "" === typeof regexp is false (typeof regexp is 'object'),
    // so it falls through to prop(test) || id, which returns the identity function
    // and every value passes through unchanged (truthy or not based on the value itself).
    
    expect(testFn('hello world')).toBe(true)
    expect(testFn('world hello')).toBe(false)
  })
})