import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
  it('should correctly handle paths ending with default.x when comparing with parent path ending with default.y', () => {
    const linkUrl = "http://example.com/aaa/bbb/ccc";
    const pageUrl = "http://example.com/aaa/bbb/default.y";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});