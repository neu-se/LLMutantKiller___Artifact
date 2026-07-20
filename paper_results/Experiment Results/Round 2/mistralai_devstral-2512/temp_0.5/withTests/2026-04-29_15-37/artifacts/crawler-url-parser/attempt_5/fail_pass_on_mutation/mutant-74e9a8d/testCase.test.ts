import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype mutation test', () => {
  it('should correctly handle default.html in path comparison', () => {
    const linkUrl = "http://example.com/aaa/bbb";
    const pageUrl = "http://example.com/aaa/default.html";
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe("sublevel");
  });
});