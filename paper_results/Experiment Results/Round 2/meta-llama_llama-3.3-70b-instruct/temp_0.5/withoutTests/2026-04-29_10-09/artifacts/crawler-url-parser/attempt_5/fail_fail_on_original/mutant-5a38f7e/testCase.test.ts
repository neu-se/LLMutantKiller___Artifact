import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("crawler-url-parser", () => {
  it("should not return 'Stryker was here!' as the link type", () => {
    const linkurl = "http://example.com";
    const pageurl = "http://example.com";
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe("Stryker was here!");
  });
});