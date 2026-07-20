import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function initialization", () => {
  it("should return an object with all expected properties initialized to null or default values", () => {
    const result = parse("http://example.com");
    expect(result).toHaveProperty("url", "http://example.com/");
    expect(result).toHaveProperty("baseurl", null);
    expect(result).toHaveProperty("protocol", "http:");
    expect(result).toHaveProperty("host", "example.com");
    expect(result).toHaveProperty("domain", "example.com");
    expect(result).toHaveProperty("subdomain", null);
    expect(result).toHaveProperty("path", "/");
    expect(result).toHaveProperty("search", null);
    expect(result).toHaveProperty("querycount", 0);
  });
});