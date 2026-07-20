import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url with base url having + encoded query string', () => {
  it('should preserve + encoding in baseurl when base url has query params with + spaces', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb/ccc?q=hello+world");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.stackoverflow.com/aaa/bbb/ccc?q=hello+world");
  });
});