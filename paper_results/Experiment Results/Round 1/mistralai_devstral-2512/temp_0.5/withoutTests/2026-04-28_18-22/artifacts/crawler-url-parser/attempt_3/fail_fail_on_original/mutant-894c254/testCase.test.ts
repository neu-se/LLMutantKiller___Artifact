import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function query parameter handling", () => {
  it("should remove UTM parameters case-insensitively", () => {
    const urlWithUtm = "http://example.com/path?utm_Source=test&ref=abc&other=value";
    const result = parse(urlWithUtm);

    expect(result).not.toBeNull();
    if (result) {
      expect(result.url).toBe("http://example.com/path?other=value");
      expect(result.search).toBe("?other=value");
    }
  });
});