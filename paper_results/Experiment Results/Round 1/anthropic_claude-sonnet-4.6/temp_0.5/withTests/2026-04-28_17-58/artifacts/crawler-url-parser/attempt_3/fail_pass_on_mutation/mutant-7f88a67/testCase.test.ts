import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('https URL normalization', () => {
  it('should not convert https to http (normalizeHttps should be false)', () => {
    const httpsResult = parse("https://example.com/");
    const httpResult = parse("http://example.com/");
    expect(httpsResult).not.toBeNull();
    expect(httpResult).not.toBeNull();
    // If normalizeHttps is true, https would be converted to http making these equal
    expect(httpsResult.url).not.toBe(httpResult.url);
    expect(httpsResult.protocol).toBe("https:");
  });
});