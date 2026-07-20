import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string when regexp matches, not always true", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    
    // When regexp matches, original returns the matched string (e.g., "hello")
    // Mutated version returns true instead
    const matchResult = fn("hello world");
    expect(matchResult).toBe("hello");
    expect(matchResult).not.toBe(true);
  });
});