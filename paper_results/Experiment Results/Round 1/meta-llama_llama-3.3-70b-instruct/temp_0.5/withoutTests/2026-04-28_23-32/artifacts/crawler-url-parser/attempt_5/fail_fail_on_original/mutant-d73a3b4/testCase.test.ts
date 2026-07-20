import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    let linkurl = "http://example.com/path/index.html";
    let pageurl = "http://example.com/path";
    let linkurlModified = linkurl.replace(/\/index\.[a-z]+$/, '/');
    let pageurlModified = pageurl;
    expect(gettype(linkurl, pageurl)).toBe(gettype(linkurlModified, pageurlModified));
  });
});