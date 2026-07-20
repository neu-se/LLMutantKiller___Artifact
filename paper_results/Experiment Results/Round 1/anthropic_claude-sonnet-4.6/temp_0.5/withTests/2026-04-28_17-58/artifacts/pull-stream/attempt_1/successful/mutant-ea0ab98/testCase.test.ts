import prop from "../../../../../../../../../../../subject_repositories/pull-stream/util/prop.js";

describe("prop with regexp key", () => {
  it("should return a function that extracts the first match from data when given a regexp", () => {
    const regexp = /\d+/;
    const extractor = prop(regexp);
    
    expect(typeof extractor).toBe("function");
    
    const result = extractor("abc123def");
    expect(result).toBe("123");
  });
});