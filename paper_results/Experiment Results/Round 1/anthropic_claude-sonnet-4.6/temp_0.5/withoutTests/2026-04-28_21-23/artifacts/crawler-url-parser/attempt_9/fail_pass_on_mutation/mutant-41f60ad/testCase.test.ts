import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should parse a URL where query object vs string affects URL.format output", () => {
    // Test with a URL that has search params after going through URL.resolve
    // The resolved URL's search property behavior
    const result = parse("?newparam=value", "http://example.com/page?old=1");
    expect(result).not.toBeNull();
    expect(result.url).toContain("newparam=value");
    expect(result.search).toBe("?newparam=value");
    expect(result.querycount).toBe(1);
  });
});