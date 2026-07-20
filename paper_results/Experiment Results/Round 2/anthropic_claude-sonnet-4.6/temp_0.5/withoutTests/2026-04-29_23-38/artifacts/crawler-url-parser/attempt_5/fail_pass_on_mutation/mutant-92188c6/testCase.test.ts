import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should not corrupt query string when resolving relative URL", () => {
    // If parseQueryString=false, parsedUrl.query is a string
    // If URL.format ever calls qs.stringify on that string, it produces garbage
    const result = parse("?a=1", "http://example.com/page");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/page?a=1");
  });
});