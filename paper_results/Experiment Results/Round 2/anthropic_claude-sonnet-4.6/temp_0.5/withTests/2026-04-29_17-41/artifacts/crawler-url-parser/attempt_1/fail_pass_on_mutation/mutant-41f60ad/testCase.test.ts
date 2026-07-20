import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with query string', () => {
  it('should return correct search string and querycount for URL with query parameters', () => {
    const result = parse("http://www.example.com/path?q1=data1&q2=data2");
    expect(result).not.toBeNull();
    expect(result.querycount).toBe(2);
    expect(result.url).toBe("http://www.example.com/path?q1=data1&q2=data2");
  });
});