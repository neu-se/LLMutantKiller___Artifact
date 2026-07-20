import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with /default.html path normalization', () => {
  it('should return internal when link ends with /default.html and page path has a segment starting with the same name but with a suffix', () => {
    const result = gettype(
      "http://example.com/aaa/default.html",
      "http://example.com/aaa-extra/bbb"
    );
    expect(result).toBe("internal");
  });
});