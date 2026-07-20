import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'external' when pageurl.path is undefined and linkurl is from a different domain", () => {
    const linkurl = "https://example.com/path";
    const pageurl = "https://otherdomain.com";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("external");
  });
});