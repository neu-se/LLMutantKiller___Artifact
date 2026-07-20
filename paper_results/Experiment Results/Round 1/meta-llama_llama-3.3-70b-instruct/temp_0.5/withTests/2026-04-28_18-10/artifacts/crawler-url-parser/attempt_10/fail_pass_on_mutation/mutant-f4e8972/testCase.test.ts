import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should return an object with a specific property when input is a string and base URL is provided', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Array);
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('url');
      expect(result[0]).toHaveProperty('text');
      expect(result[0]).toHaveProperty('type');
    }
  });
});