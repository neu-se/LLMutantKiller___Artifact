import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly parse URL with multiple query parameters of same name", () => {
    const result = parse("http://example.com/?tag=a&tag=b&tag=c");
    expect(result).not.toBeNull();
    // With parseQueryString=true, query={tag:['a','b','c']}
    // The url should preserve the original query string
    expect(result!.url).toBe("http://example.com/?tag=a&tag=b&tag=c");
    expect(result!.querycount).toBe(3);
  });
});