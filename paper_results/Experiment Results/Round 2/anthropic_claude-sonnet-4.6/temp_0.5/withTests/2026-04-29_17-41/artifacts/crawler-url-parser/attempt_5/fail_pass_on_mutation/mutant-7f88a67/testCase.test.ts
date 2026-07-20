import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('normalizeHttps option - http to https normalization', () => {
  it('should NOT convert http URLs to https when normalizeHttps is false', () => {
    // With normalizeHttps: false (original), http:// stays as http://
    // With normalizeHttps: true (mutant), http:// gets converted to https://
    const result = parse("http://example.com/page");
    expect(result).not.toBeNull();
    expect(result.protocol).toBe("http:");
    expect(result.url.startsWith("http://")).toBe(true);
    expect(result.url.startsWith("https://")).toBe(false);
  });
});