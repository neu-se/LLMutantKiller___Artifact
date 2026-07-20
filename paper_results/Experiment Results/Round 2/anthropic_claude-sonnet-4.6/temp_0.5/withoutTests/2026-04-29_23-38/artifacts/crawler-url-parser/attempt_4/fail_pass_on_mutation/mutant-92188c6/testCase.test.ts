import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should correctly handle relative URL with no query string resolved against base with query string", () => {
    // When relative URL has no query string but base has one
    // With parseQueryString=true: relative.query = {} (empty object, truthy)
    // With parseQueryString=false: relative.query = null (falsy)
    // In resolveObject: result.query = relative.query
    // With true: result.query = {} -> format() might behave differently
    const result = parse("page", "http://example.com/base/?x=1");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/base/page");
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});