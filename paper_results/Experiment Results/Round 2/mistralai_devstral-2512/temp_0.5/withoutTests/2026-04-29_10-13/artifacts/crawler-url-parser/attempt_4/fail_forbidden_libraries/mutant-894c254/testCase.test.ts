import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";
import { normalizeUrl } from "normalize-url";

describe("parse function with query parameters", () => {
  it("should remove UTM parameters case-insensitively using normalize-url", () => {
    const url = "https://example.com/path?UTM_SOURCE=test&other=value";
    const result = parse(url);
    expect(result).not.toBeNull();
    const normalized = normalizeUrl(result.url, {
      removeQueryParameters: [/^utm_\w+/i, 'ref']
    });
    expect(normalized).toBe("https://example.com/path?other=value");
  });
});