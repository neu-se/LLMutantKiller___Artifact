import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of link', () => {
    let linkurl = "http://example.com/path/to/default.html";
    let pageurl = "http://example.com/path/to/";
    let expectedType = "samelevel";
    let actualType = gettype(linkurl, pageurl);
    expect(actualType).not.toBe("internal");
  });
});