import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with protocol detection", () => {
  it("should correctly handle URLs starting with non-word characters", () => {
    const result = parse("123example.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://123example.com/");
  });
});