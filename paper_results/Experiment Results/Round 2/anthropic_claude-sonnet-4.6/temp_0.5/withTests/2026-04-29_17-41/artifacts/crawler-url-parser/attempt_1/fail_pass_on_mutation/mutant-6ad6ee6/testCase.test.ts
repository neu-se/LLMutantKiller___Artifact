import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with multi-character fragment', () => {
  it('should strip a fragment with multiple characters from a URL', () => {
    const result = parse("http://www.example.com/page#section");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/page");
  });
});