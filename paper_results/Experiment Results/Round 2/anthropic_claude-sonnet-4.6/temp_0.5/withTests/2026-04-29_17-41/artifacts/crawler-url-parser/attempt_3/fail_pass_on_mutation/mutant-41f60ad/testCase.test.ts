import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with valueless query parameter', () => {
  it('should preserve valueless query parameter in URL', () => {
    const result = parse("http://www.example.com/path?flag");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.example.com/path?flag");
  });
});