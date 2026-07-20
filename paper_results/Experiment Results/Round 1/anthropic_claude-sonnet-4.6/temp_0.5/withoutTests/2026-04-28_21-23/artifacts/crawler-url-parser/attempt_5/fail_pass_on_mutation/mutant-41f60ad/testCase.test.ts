import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should handle URL with empty query string correctly", () => {
    const result = parse("http://example.com/path?");
    expect(result).not.toBeNull();
    // With parseQueryString=true: search="?" so querycount=0 (split gives ["?"] length-1=0)
    // With parseQueryString=false: search=null so querycount=0
    // The difference is in search field
    expect(result.search).toBe("?");
  });
});