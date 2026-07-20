import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should correctly extract link text', () => {
    const html = '<a href="https://www.example.com">Example</a>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);
    expect(result[0].text).not.toBe('');
  });
});