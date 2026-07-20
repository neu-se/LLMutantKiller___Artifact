import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing special characters in query", () => {
  it("should correctly handle base URLs with encoded characters in query parameters", () => {
    const result = parse("relative", "http://example.com/base?param=hello%20world&other=test");
    expect(result.url).toBe("http://example.com/relative");
    expect(result.baseurl).toBe("http://example.com/base?param=hello%20world&other=test");
  });
});