import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse https URL with base URL', () => {
  it('should correctly parse an absolute https URL when a base URL is provided', () => {
    const result = parse("https://www.example.com/page", "http://www.facebook.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://www.example.com/page");
  });
});