import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing query parameters", () => {
  it("should correctly parse baseurl with query parameters when resolving relative paths", () => {
    const result = parse("relative/path", "http://example.com/base?param1=value1&param2=value2");
    expect(result.baseurl).toBe("http://example.com/base?param1=value1&param2=value2");
    expect(result.url).toBe("http://example.com/relative/path");
  });
});