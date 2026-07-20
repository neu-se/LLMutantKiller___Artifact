import { tester } from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester with regexp", () => {
  it("should use regexp test method when given a regexp-like object with a test function", () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);
    
    // With the original code, tester detects that regexp is an object with a .test method
    // and returns a function that calls test.test(data)
    // With the mutated code (false), it falls through to prop(test) || id
    // which would return a different function
    
    expect(testFn("hello world")).toBe(true);
    expect(testFn("world hello")).toBe(false);
  });
});