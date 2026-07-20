import { prop } from "./util/prop.js";

describe("prop function with object key", () => {
  it("should return a function that extracts matched value when key is a regex", () => {
    const regexKey = /test/;
    const extractor = prop(regexKey);
    expect(typeof extractor).toBe("function");
    const result = extractor("this is a test string");
    expect(result).toBe("test");
  });
});