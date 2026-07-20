import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
  it('should correctly handle paths ending with default.x when comparing with index.y', () => {
    const linkUrl = "http://example.com/aaa/bbb/default.x";
    const pageUrl = "http://example.com/aaa/bbb/index.y";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("samelevel");
  });
});