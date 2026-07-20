import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'external' when pageurl.path is undefined and linkurl is from same domain but different path structure", () => {
    const linkurl = "https://example.com/aaa/bbb";
    const pageurl = "https://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("sublevel");
  });
});