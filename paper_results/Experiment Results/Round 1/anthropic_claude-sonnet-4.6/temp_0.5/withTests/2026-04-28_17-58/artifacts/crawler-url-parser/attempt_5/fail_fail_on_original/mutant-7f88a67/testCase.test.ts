import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('utm parameter removal', () => {
  it('should remove utm parameters from URLs', () => {
    const result = parse("https://example.com/path?utm_source=test&q=1");
    expect(result).not.toBeNull();
    expect(result.url).not.toContain("utm_source");
  });
});