import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with default.htm in pageurl', () => {
  it('should return internal when linkurl has no trailing slash and pageurl ends with default.htm', () => {
    const result = gettype("http://example.com/aaa/bbb", "http://example.com/aaa/default.htm");
    expect(result).toBe("internal");
  });
});