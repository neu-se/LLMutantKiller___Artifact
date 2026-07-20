import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL containing authentication and query", () => {
  it("should correctly handle base URLs with both authentication and query parameters", () => {
    const result = parse("relative", "http://user:pass@example.com/base?query=value");
    expect(result.baseurl).toBe("http://user:pass@example.com/base?query=value");
    expect(result.url).toBe("http://user:pass@example.com/relative");
  });
});