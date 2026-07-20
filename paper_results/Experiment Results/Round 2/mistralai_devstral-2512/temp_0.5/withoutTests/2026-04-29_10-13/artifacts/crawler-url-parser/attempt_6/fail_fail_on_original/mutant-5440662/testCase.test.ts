import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should handle undefined pageurl.path correctly when comparing with linkurl.path", () => {
    const linkurl = "https://example.com/path";
    const pageurl = "https://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});