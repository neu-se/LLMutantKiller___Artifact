import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should remove query parameters matching the pattern", () => {
    const urlWithUtm = "http://example.com/path?utm_source=test&ref=abc&other=value";
    const result = parse(urlWithUtm);

    expect(result).not.toBeNull();
    expect(result.url).toBe("http://example.com/path?other=value");
    expect(result.search).toBe("?other=value");
  });
});