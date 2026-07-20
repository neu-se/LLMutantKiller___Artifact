import tester from "../../../../../../../../../../../subject_repositories/pull-stream/util/tester.js"

describe("tester with regexp-like object", () => {
  it("should return a function that calls test.test(data) when given an object with a test method (like a RegExp)", () => {
    // Create a regexp-like object (an actual RegExp has typeof === 'object' and has a .test method)
    const regexp = /hello/;
    
    const result = tester(regexp);
    
    // The result should be a function
    expect(typeof result).toBe("function");
    
    // When called with matching data, it should return true (using regexp.test)
    expect(result("hello world")).toBe(true);
    
    // When called with non-matching data, it should return false
    expect(result("goodbye world")).toBe(false);
  });
});