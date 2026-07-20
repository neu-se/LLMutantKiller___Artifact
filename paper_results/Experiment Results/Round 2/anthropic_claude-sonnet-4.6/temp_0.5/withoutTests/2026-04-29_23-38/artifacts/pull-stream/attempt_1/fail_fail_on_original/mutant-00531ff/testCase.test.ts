import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester with regexp-like object", () => {
  it("should use test.test method when test is an object with a function test property (like a RegExp)", () => {
    // Create a regexp-like object with a test function
    const regexp = /hello/;
    
    // tester should return a function that calls regexp.test(data)
    const testFn = tester(regexp);
    
    // Test with matching data
    expect(testFn("hello world")).toBe(true);
    
    // Test with non-matching data
    expect(testFn("goodbye world")).toBe(false);
  });
});