import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that executes the regexp and returns the first match", () => {
    const regexp = /hello/;
    const fn = prop(regexp);

    // In original code: fn is a function that runs key.exec(data) and returns v[0]
    // In mutated code: fn is the regexp itself (not a function that applies exec)
    expect(typeof fn).toBe("function");

    // The returned function should apply the regexp to data and return the match
    const result = fn("say hello world");
    expect(result).toBe("hello");

    // When no match, should return null/falsy
    const noMatch = fn("say goodbye world");
    expect(noMatch).toBeFalsy();
  });
});