import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester with regexp-like object", () => {
  it("should use test.test method when passed an object with a test function (like a RegExp)", () => {
    // Create a regexp - typeof regexp === 'object' is true
    const regexp = /hello/;
    
    // The tester should return a function that uses regexp.test
    const testFn = tester(regexp);
    
    // With original code: 'object' === typeof regexp is true, so it returns a function using test.test
    // With mutated code: "" === typeof regexp is false, so it falls through to prop(test) || id
    // which would return id (identity function), meaning testFn("hello world") returns "hello world" not true
    
    expect(testFn("hello world")).toBe(true);
    expect(testFn("goodbye")).toBe(false);
  });
});