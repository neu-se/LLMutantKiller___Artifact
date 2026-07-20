const prop = require("../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js");

describe("prop function with regex key", () => {
  it("should return a function that extracts regex matches", () => {
    const regex = /hello/;
    const extractor = prop(regex);
    expect(typeof extractor).toBe("function");
    const result = extractor("hello world");
    expect(result).toBe("hello");
  });
});