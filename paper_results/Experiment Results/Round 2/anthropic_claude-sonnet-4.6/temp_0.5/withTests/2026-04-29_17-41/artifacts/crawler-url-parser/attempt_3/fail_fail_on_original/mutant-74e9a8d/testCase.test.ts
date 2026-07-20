import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with default.htm in pageurl', () => {
  it('should return internal when link and page are at different depths with default.htm page', () => {
    const result = gettype("http://example.com/aaa/bbb", "http://example.com/aaa/bbb/default.htm");
    expect(result).toBe("internal");
  });
});