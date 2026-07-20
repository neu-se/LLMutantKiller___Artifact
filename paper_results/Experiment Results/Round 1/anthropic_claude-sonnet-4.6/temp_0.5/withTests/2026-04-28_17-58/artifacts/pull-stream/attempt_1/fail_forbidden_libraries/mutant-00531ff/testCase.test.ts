import { describe, it, expect } from '@jest/globals';
import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester', () => {
  it('should use test.test method when test is an object with a function test property (like a RegExp)', () => {
    // A RegExp has typeof === 'object' and test is a function
    const regexp = /hello/;
    const result = tester(regexp);
    
    // The result should be a function that uses regexp.test()
    expect(typeof result).toBe('function');
    
    // With original code: 'object' === typeof regexp && 'function' === typeof regexp.test
    // This is true, so it returns function(data) { return test.test(data) }
    // With mutated code: 'object' === typeof regexp && "" === typeof regexp.test
    // This is false ("" !== "function"), so it falls through to prop(test) || id
    
    // Test that the returned function correctly tests strings against the regexp
    expect(result('hello world')).toBe(true);
    expect(result('goodbye')).toBe(false);
  });
});