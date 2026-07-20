import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with www subdomain URLs', () => {
  it('should classify http://www.google.com relative to http://google.com as updomain when stripWWW is true', () => {
    const result = gettype("http://google.com/", "http://www.google.com/");
    expect(result).toBe("updomain");
  });
});