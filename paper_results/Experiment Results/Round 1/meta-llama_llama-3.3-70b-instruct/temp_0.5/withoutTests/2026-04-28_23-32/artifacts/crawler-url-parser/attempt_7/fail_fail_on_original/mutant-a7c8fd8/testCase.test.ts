import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = "http://example.com/default.asdf";
    const pageurl = "http://example.com/";
    const resultOriginal = gettype(linkurl, pageurl);
    expect(resultOriginal).toBe("samelevel");
  });
});