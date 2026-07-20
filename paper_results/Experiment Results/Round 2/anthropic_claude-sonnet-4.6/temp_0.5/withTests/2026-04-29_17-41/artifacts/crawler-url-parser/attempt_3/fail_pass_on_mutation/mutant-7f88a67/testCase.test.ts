import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('normalizeHttps option behavior', () => {
  it('should return https protocol for https URL, not normalize to http', () => {
    const result = parse("https://stackoverflow.com/questions");
    expect(result).not.toBeNull();
    // With normalizeHttps: false (original), protocol stays as https:
    // With normalizeHttps: true (mutant), protocol gets converted to http:
    expect(result.protocol).toBe("https:");
    expect(result.url.startsWith("https://")).toBe(true);
  });
});