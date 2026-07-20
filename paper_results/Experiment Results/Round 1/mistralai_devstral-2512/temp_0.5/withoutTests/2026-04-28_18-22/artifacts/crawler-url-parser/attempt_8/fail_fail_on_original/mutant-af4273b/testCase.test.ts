import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with base URL query parameters", () => {
  it("should correctly handle base URL query parameters when parsing relative URLs with existing query", () => {
    const baseUrl = "http://example.com/base?param=value";
    const relativeUrl = "path?newparam=newvalue";
    const result = parse(relativeUrl, baseUrl);

    expect(result).not.toBeNull();
    expect(result?.url).toBe("http://example.com/base/path?newparam=newvalue");
    expect(result?.search).toBe("?newparam=newvalue");
    expect(result?.querycount).toBe(1);
  });
});