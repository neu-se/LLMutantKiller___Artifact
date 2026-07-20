const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js")

describe('tester with regexp-like object', () => {
  it('should use test.test method when passed an object with a test function (like a RegExp)', () => {
    // Create a regexp - it's an object with a .test function
    const regexp = /^hello/;
    
    const testFn = tester(regexp);
    
    // The original code should detect that regexp is an object with a .test function
    // and return a function that calls regexp.test(data)
    // In the mutated code, the condition is always false, so it falls through to prop(test) || id
    // prop(regexp) would look for a property named by regexp on data, which is not the same behavior
    expect(testFn('hello world')).toBe(true);
    expect(testFn('world hello')).toBe(false);
  });
});