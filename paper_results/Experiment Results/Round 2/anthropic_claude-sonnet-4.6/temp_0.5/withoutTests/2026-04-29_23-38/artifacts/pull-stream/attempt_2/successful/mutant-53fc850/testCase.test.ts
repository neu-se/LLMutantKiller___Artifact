import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester with regexp-like object", () => {
  it("should use test.test method when passed an object with a test function (like a RegExp)", () => {
    // Create a regexp-like object with a test method
    const regexp = /hello/;
    
    const testFn = tester(regexp);
    
    // The tester should return a function that uses regexp.test
    // With original code: 'object' === typeof regexp && 'function' === typeof regexp.test => true
    // So it returns function(data) { return test.test(data) }
    // With mutated code: 'object' !== typeof regexp && ... => false
    // So it falls through to prop(test) || id, which won't use regexp.test
    
    expect(testFn("hello world")).toBe(true);
    expect(testFn("goodbye")).toBe(false);
  });
});