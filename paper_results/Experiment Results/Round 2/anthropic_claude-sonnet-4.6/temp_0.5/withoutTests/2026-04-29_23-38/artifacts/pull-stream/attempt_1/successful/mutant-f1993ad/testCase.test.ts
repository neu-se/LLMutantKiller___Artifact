import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js"

describe("prop with regexp key", () => {
  it("should return a function that uses regexp exec when key is a regexp", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    
    // The result should be a function (not false/undefined/the regexp itself)
    expect(typeof fn).toBe("function");
    
    // The function should use regexp.exec to extract matches
    const result = fn("say hello world");
    expect(result).toBe("hello");
    
    // Should return null/falsy when no match
    const noMatch = fn("say goodbye world");
    expect(noMatch).toBeFalsy();
  });
});