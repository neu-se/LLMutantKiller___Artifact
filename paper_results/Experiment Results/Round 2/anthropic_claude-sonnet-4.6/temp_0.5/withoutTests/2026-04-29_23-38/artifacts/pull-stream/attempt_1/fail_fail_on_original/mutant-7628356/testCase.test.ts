import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester with regexp-like object", () => {
  it("should use test.test method when passed an object with a test function (like a RegExp)", () => {
    // Create a regexp-like object (has typeof === 'object' and test is a function)
    const regexp = /hello/;
    
    // The tester function should return a function that calls regexp.test(data)
    const testFn = tester(regexp);
    
    // Test with matching data
    expect(testFn("hello world")).toBe(true);
    
    // Test with non-matching data
    expect(testFn("goodbye world")).toBe(false);
  });
});