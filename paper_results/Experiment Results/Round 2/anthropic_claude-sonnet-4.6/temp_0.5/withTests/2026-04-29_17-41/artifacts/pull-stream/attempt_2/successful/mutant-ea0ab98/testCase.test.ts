const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop with regexp key", () => {
  it("should return the matched string when a regexp is provided as key", () => {
    const regexp = /hello/;
    const fn = prop(regexp);
    const result = fn("hello world");
    expect(result).toBe("hello");
  });
});