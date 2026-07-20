import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with default page url', () => {
  it('should return samelevel when link is at same level as page with default.htm', () => {
    const result = gettype("http://example.com/aaa/other", "http://example.com/aaa/default.htm");
    expect(result).toBe("samelevel");
  });
});