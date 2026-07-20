import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe('tester with regexp-like object', () => {
  it('should call test.test(data) when given an object with a function test property', () => {
    // A RegExp is an object with a `test` function - this is the regexp case
    const regexp = /^hello/;
    
    const fn = tester(regexp);
    
    // Original: 'object' === typeof test && 'function' === typeof test.test
    // => true, so returns function(data) { return test.test(data) }
    // Mutated: 'object' === typeof test && "" === typeof test.test
    // => false (typeof test.test is "function", not ""), so falls through to prop(test) || id
    
    // With original code, fn('hello world') should return true (regexp matches)
    // With mutated code, fn would be prop(regexp) || id, which would not behave the same way
    expect(fn('hello world')).toBe(true);
    expect(fn('goodbye')).toBe(false);
  });
});