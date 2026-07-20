import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js";

describe("tester with regexp", () => {
  it("should return a function that uses regexp.test when given a regexp object", () => {
    const regexp = /^hello/;
    const testFn = tester(regexp);
    
    // With original code: typeof regexp === 'object' is true, so it returns
    // a function that calls regexp.test(data)
    // With mutated code: "" === typeof regexp is false, so it falls through
    // to prop(regexp) || id, which would behave differently
    
    expect(testFn("hello world")).toBe(true);
    expect(testFn("world hello")).toBe(false);
  });
});