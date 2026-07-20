import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URL handling", () => {
  it("should correctly handle relative URLs starting with a colon", () => {
    const result = parse(":example.com/path", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://:example.com/path");
  });
});