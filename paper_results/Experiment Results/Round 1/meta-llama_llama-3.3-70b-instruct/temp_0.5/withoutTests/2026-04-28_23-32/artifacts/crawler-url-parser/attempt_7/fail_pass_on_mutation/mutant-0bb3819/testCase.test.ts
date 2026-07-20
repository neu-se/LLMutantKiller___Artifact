import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("gettype function", () => {
  it("should return correct type when linkurl and pageurl have index.html and default.html", () => {
    const linkurl = "http://example.com/aaa/bbb/index.html";
    const pageurl = "http://example.com/aaa/bbb/default.html";
    const modifiedLinkurl = linkurl.replace(/\/index\.[a-z]+$/, '/');
    const modifiedPageurl = pageurl.replace(/\/default\.[a-z]+$/, '/');
    expect(gettype(linkurl, pageurl)).toBe(gettype(modifiedLinkurl, modifiedPageurl));
  });
});