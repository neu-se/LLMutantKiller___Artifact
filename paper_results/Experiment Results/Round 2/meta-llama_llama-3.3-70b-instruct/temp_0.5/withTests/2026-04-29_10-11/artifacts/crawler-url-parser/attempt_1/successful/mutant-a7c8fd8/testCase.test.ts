import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a link url with a default file extension', () => {
    const linkurl = "http://example.com/path/default.html";
    const pageurl = "http://example.com/path";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });

  it('should return the correct type for a link url without a default file extension', () => {
    const linkurl = "http://example.com/path/index.php";
    const pageurl = "http://example.com/path";
    const result = gettype(linkurl, pageurl);
    expect(result).toBe("samelevel");
  });
});