import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function", () => {
  it("should correctly handle relative URLs without protocol", () => {
    const result = parse("example.com/path", "http://base.com");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/path");
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});