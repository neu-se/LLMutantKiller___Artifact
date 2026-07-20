import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with query parameters in base URL", () => {
  it("should preserve query parameters when base URL contains them", () => {
    const result = parse("relative", "http://example.com/path?query=value");
    expect(result.baseurl).toBe("http://example.com/path?query=value");
    expect(result.url).toBe("http://example.com/relative");
  });
});