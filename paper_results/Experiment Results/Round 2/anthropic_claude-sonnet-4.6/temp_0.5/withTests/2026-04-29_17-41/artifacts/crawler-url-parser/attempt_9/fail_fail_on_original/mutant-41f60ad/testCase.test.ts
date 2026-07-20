import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with encoded ampersand in query value', () => {
  it('should handle encoded ampersand in query string value', () => {
    const result = parse("http://www.example.com/path?a=1%26b=2");
    expect(result).not.toBeNull();
    expect(result!.search).toBe("?a=1%26b=2");
    expect(result!.querycount).toBe(1);
  });
});