import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse https URL', () => {
  it('should parse https://example.com with https protocol', () => {
    const result = parse("https://example.com");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("https:");
    expect(result!.url).toBe("https://example.com/");
  });
});