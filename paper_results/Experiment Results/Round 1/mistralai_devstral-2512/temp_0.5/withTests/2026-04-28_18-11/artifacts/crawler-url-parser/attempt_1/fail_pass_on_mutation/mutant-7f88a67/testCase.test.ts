import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('normalizeHttps mutation test', () => {
  it('should preserve https protocol when normalizeHttps is false', () => {
    const result = parse('https://example.com/some/path');
    expect(result.protocol).toBe('https:');
    expect(result.url).toBe('https://example.com/some/path');
  });
});