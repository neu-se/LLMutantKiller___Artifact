import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters in base URL", () => {
  it("should correctly handle base URL query parameters when resolving relative paths", () => {
    const result = parse("relative", "http://example.com/path?key1=value1&key2=value2");
    expect(result.baseurl).toBe("http://example.com/path?key1=value1&key2=value2");
    expect(result.url).toBe("http://example.com/relative");
  });
});