import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should not append text when it already exists', () => {
    const html = `
      <a href="http://example.com">Link 1</a>
      <a href="http://example.com">Link 1</a>
    `;
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    if(result && result.length > 0) {
      expect(result[0].text).toBe('Link 1');
    } else {
      expect(true).toBe(false);
    }
  });

  it('should append text when it does not already exist', () => {
    const html = `
      <a href="http://example.com">Link 1</a>
      <a href="http://example.com">Link 2</a>
    `;
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    if(result && result.length > 0) {
      expect(result[0].text).toBe('Link 1 Link 2');
    } else {
      expect(true).toBe(false);
    }
  });
});