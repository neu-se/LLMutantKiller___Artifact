import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string (v[0]), not the match array, when regex matches", () => {
    const fn = prop(/hello/);
    const result = fn("say hello world");
    // Original: returns v && v[0] => "hello" (a string)
    // Mutated: returns v || v[0] => the match array object (not a string)
    expect(result).toBe("hello");
    expect(typeof result).toBe("string");
  });
});