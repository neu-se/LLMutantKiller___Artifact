import { gettype } from "./crawler-url-parser.js";

describe('gettype function', () => {
  it('should return the correct type for a link and page URL', () => {
    const linkUrl = "http://example.com/path/to/link";
    const pageUrl = "http://example.com/path/to/page/default.html";
    const resultOriginal = gettype(linkUrl, pageUrl);
    expect(resultOriginal).toBe("sublevel");

    const linkUrl2 = "http://example.com/path/to/link";
    const pageUrl2 = "http://example.com/path/to/page/default";
    const resultMutated = gettype(linkUrl2, pageUrl2);
    expect(resultMutated).not.toBe("sublevel");
  });
});