import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should return correct type for same level link", () => {
    const linkurl = "http://example.com/path/to/link";
    const pageurl = "http://example.com/path/to/page";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});