import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string when a regexp is provided and there is a match", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    const result = fn("say hello world");
    expect(result).toBe("hello");
  });
});