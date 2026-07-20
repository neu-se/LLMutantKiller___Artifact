import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a link and page URL', () => {
    const linkUrl = "http://example.com/path/to/link";
    const pageUrl = "http://example.com/path/to/page/default.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
    const linkUrl2 = "http://example.com/path/to/link";
    const pageUrl2 = "http://example.com/path/to/page/default";
    const result2 = gettype(linkUrl2, pageUrl2);
    expect(result2).toBe("sublevel");
  });
});