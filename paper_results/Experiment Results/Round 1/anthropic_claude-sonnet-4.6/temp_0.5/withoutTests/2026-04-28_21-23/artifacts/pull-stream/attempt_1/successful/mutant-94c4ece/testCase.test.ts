import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string when a regexp matches", () => {
    const fn = prop(/hello/);
    const result = fn("say hello world");
    expect(result).toBe("hello");
  });
});