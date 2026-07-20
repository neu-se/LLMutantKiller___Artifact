import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('normalizeHttps mutation detection', () => {
  it('parse result url field should use https not http for https input when normalizeHttps is false', () => {
    const result = parse('https://example.com/path');
    expect(result).not.toBeNull();
    // normalizeHttps:false => keeps https://
    // normalizeHttps:true => converts to http://
    expect(result.url).toBe('https://example.com/path');
  });
});