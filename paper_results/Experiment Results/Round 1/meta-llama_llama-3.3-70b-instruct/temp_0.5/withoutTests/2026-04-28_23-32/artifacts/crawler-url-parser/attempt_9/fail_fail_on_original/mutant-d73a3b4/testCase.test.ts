import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    let linkurl = "http://example.com/index.html";
    let pageurl = "http://example.com/index.html/subpath";
    expect(gettype(linkurl, pageurl)).toBe("uplevel");
  });
});