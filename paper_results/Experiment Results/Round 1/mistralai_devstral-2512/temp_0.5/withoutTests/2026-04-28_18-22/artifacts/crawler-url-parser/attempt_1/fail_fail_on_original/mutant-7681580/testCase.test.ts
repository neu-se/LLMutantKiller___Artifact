import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle relative URLs without protocol by adding http:// prefix", () => {
    const result = parse("example.com/path", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.protocol).toBe("http:");
  });
});