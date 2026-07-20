import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should handle empty pageurl.path correctly when comparing paths", () => {
    const linkurl = "https://example.com/path";
    const pageurl = "https://example.com/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});