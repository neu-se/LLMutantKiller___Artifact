import { gettype } from "../../../crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a link and page URL', () => {
    const linkUrl = "http://example.com/path/to/link";
    const pageUrl = "http://example.com/path/to/page/default.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});