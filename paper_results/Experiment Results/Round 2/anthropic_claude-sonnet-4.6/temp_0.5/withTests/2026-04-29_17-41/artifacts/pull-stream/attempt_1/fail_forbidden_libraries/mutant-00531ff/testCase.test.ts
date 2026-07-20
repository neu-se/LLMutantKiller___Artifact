import { describe, it, expect } from '@jest/globals';
import tester from '../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js';

describe('tester with regexp', () => {
  it('should use regexp test method when given a regexp object', () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);
    
    // With original code: testFn calls regexp.test(data), so 'hello world' matches and 'goodbye' does not
    // With mutated code: the regexp branch is never taken (because "" === typeof test.test is always false),
    // so it falls through to prop(test) || id, which returns the identity function (id),
    // meaning all values pass through as truthy
    
    expect(testFn('hello world')).toBe(true);
    expect(testFn('goodbye')).toBe(false);
  });
});