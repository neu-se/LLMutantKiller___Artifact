import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse https URL protocol normalization', () => {
  it('should keep https protocol intact and not convert it to http', () => {
    const result = parse("https://example.com/page");
    expect(result).not.toBeNull();
    expect(result.url).toBe("https://example.com/page");
  });
});