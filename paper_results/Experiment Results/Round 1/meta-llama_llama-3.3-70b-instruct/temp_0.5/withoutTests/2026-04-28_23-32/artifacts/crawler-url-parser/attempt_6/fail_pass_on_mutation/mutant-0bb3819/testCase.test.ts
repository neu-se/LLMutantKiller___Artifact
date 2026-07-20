import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return correct type when linkurl and pageurl have default.html and /", () => {
    const linkurl = "http://example.com/aaa/bbb/default.html";
    const pageurl = "http://example.com/aaa/bbb/";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
    const linkurl2 = "http://example.com/aaa/bbb/index.html";
    const pageurl2 = "http://example.com/aaa/bbb/default.html";
    expect(gettype(linkurl2, pageurl2)).toBe("samelevel");
  });
});