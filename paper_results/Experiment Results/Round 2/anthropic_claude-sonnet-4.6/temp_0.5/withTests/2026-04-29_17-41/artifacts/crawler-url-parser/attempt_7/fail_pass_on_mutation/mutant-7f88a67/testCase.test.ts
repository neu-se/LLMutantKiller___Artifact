import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('https URL with www subdomain normalization', () => {
  it('should preserve https protocol for www URLs', () => {
    const result = parse("https://www.google.com/path?q=test");
    expect(result).not.toBeNull();
    // Test the exact url string returned
    expect(result.url).toBe("https://www.google.com/path?q=test");
  });
});