import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string when a regexp matches the data", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    const result = fn("hello world");
    expect(result).toBe("hello");
  });
});