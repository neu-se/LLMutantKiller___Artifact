import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe('tester with regexp-like object', () => {
  it('should use test.test method when passed an object with a test function (like a RegExp)', () => {
    // Create a regexp-like object with a test method
    const regexp = /^hello/;
    
    const testFn = tester(regexp);
    
    // The original code should detect that regexp is an object with a .test function
    // and return a function that calls regexp.test(data)
    expect(testFn('hello world')).toBe(true);
    expect(testFn('world hello')).toBe(false);
  });
});