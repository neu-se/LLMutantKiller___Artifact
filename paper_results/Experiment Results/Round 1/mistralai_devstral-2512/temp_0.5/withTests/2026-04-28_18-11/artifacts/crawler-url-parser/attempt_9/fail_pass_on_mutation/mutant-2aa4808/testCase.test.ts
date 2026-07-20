import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with relative URL and base URL containing query parameters", () => {
  it("should correctly resolve relative URLs when base URL contains query parameters and hash", () => {
    const result = parse("../sibling", "http://example.com/base/path?query=value#fragment");
    expect(result.url).toBe("http://example.com/sibling");
    expect(result.baseurl).toBe("http://example.com/base/path?query=value");
  });
});