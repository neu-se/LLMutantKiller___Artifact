import { describe, it, expect } from '@jest/globals'
import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js'

describe('tester', () => {
  it('should use regexp .test method when given an object with a test function (like RegExp)', () => {
    const regexp = /^hello/
    const testFn = tester(regexp)
    
    // The tester should return a function that uses regexp.test()
    expect(typeof testFn).toBe('function')
    
    // Should return true for matching strings
    expect(testFn('hello world')).toBe(true)
    
    // Should return false for non-matching strings
    expect(testFn('world hello')).toBe(false)
  })
})