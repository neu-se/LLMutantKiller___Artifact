import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return querycount of 1 for URL with only utm_source parameter since utm params are tracked", () => {
    const result = parse("http://example.com/page?utm_source=google");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(1);
    expect(result.search).toBe("?utm_source=google");
  });
});