import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return 'samelevel' when linkurl and pageurl are the same level", () => {
    const linkurl = "http://example.com/aaa/bbb/default.html";
    const pageurl = "http://example.com/aaa/bbb/";
    expect(gettype(linkurl, pageurl)).toBe("samelevel");
  });
});