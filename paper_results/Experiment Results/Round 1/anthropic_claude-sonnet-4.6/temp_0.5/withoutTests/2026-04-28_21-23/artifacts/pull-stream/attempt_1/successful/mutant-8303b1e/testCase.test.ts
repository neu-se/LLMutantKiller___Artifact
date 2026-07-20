import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that executes the regexp against data when key is a RegExp", () => {
    const regex = /hello/;
    const fn = prop(regex);
    
    // fn should be a function (not the regex itself) when original code is used
    expect(typeof fn).toBe("function");
    
    // The returned function should execute the regex and return the match
    const result = fn("say hello world");
    expect(result).toBe("hello");
    
    // Should return null when no match
    const noMatch = fn("say goodbye world");
    expect(noMatch).toBeNull();
  });
});