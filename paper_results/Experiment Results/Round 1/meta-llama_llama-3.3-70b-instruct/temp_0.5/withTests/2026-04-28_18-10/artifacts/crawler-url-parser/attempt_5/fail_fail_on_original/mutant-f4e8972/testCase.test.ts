import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should return an array of objects with the correct length when input is a string', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Array);
    expect(result.length).toBe(1);
  });
});