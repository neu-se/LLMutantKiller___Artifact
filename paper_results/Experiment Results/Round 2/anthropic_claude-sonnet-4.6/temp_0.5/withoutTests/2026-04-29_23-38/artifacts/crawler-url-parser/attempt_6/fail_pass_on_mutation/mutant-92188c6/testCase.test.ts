import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly handle a URL where query string parsing affects resolution", () => {
    // Use a URL with multiple query params to maximize chance of detecting difference
    const result = parse("path/to/page?a=1&b=2&c=3&d=4", "http://example.com/base/");
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(4);
    expect(result!.url).toBe("http://example.com/base/path/to/page?a=1&b=2&c=3&d=4");
  });
});