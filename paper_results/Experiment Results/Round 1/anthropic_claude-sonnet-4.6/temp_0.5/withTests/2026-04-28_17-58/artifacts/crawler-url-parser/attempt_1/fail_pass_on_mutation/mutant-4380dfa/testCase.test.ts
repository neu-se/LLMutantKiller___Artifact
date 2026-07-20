import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse protocol-relative URLs without base URL', () => {
  it('should parse protocol-relative URL "//www.stackoverflow.com/questions" as http:// when no base URL is provided', () => {
    const result = parse("//www.stackoverflow.com/questions");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.stackoverflow.com/questions");
    expect(result.protocol).toBe("http:");
    expect(result.host).toBe("www.stackoverflow.com");
  });
});