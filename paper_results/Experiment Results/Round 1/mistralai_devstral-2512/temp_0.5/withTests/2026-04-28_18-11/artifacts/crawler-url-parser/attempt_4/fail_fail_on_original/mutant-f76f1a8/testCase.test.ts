import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
  it('should correctly handle paths ending with default.x', () => {
    const linkUrl = "http://example.com/aaa/bbb/default.x/ccc";
    const pageUrl = "http://example.com/aaa/bbb/default.x";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});