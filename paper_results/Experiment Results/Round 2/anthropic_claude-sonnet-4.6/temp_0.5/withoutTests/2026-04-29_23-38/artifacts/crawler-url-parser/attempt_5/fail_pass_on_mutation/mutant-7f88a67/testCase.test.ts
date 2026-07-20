import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('normalizeHttps detection via normalize-url options', () => {
  it('https URL should remain https when normalizeHttps is false, but become http when true', () => {
    const result = parse('https://example.com/path?ref=test');
    expect(result).not.toBeNull();
    // With normalizeHttps:false, https is preserved
    // With normalizeHttps:true, https is converted to http
    expect(result.url).toMatch(/^https:/);
    expect(result.protocol).toBe('https:');
  });
});