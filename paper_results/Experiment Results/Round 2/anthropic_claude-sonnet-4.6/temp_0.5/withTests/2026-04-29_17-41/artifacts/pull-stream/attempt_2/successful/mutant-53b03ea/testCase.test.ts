const tester = require("../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js");

describe("tester with regexp", () => {
  it("should use regexp test method when given a regexp-like object with a test function", () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);
    
    // With the original code, tester detects that regexp is an object with a .test method
    // and returns a function that calls regexp.test(data)
    // So testFn("hello world") should return true and testFn("world") should return false
    //
    // With the mutated code (false instead of the condition), it falls through to
    // prop(test) || id, which would not call regexp.test() directly
    
    expect(testFn("hello world")).toBe(true);
    expect(testFn("world hello")).toBe(false);
  });
});