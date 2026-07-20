import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string (v[0]), not the match array, when regex matches", () => {
    const fn = prop(/hello/);
    const result = fn("say hello world");
    // Original: v && v[0] returns the matched string "hello"
    // Mutated:  v || v[0] returns the RegExpExecArray object (truthy v itself)
    expect(result).toBe("hello");
    expect(typeof result).toBe("string");
  });
});