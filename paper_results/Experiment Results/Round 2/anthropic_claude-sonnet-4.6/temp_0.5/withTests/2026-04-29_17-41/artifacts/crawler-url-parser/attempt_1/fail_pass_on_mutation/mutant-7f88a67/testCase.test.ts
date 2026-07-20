import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse https URL protocol preservation', () => {
  it('should preserve https protocol and not normalize it to http', () => {
    const result = parse("https://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.protocol).toBe("https:");
    expect(result.url).toMatch(/^https:/);
  });
});