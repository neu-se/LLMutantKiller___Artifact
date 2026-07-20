import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL with fragment', () => {
  it('should strip fragment but preserve query string in URL with both', () => {
    const res = parse("http://example.com/path?q=1&r=2#section");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path?q=1&r=2");
    expect(res!.querycount).toBe(2);
  });
});