import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL mutation test', () => {
  it('should correctly handle query string parsing', () => {
    const result = parse("http://www.example.com/path?a=1&b=2");
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    expect(result!.search).toBe("?a=1&b=2");
    expect(result!.url).toBe("http://www.example.com/path?a=1&b=2");
  });
});