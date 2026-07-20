import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URLs", () => {
  it("should correctly handle URLs starting with 'www.' by adding http:// prefix", () => {
    const result = parse("www.example.com/path");
    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://www.example.com/path");
    expect(result?.protocol).toBe("http:");
  });
});