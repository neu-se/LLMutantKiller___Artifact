import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return the matched string, not true, when a regexp is used", () => {
    const regex = /hello/;
    const fn = prop(regex);
    const result = fn("hello world");
    expect(result).toBe("hello");
    expect(result).not.toBe(true);
  });
});