import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should return an array of objects when input is a string and base URL is provided', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBeGreaterThan(0);
    expect(Object.keys(result[0])).toContain('url');
    expect(Object.keys(result[0])).toContain('text');
    expect(Object.keys(result[0])).toContain('type');
  });
});