import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters", () => {
  it("should remove utm_* query parameters from URL", () => {
    const url = "http://example.com/path?utm_source=test&utm_medium=email&ref=somevalue";
    const result = parse(url);
    expect(result.url).toBe("http://example.com/path?ref=somevalue");
    expect(result.search).toBe("?ref=somevalue");
    expect(result.querycount).toBe(1);
  });
});