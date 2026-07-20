import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should return an array of objects when input is a string', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    expect(result).not.toBeNull();
    expect(result).toBeInstanceOf(Array);
  });

  it('should throw an error when input is not a string', () => {
    const html = 123;
    const baseUrl = 'https://www.example.com';
    expect(() => extract(html, baseUrl)).toThrowError();
  });
});