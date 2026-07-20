import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'internal' when pageurl.path is empty and linkurl has same path structure", () => {
    const linkurl = "https://example.com/path";
    const pageurl = "https://example.com/";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("internal");
  });
});