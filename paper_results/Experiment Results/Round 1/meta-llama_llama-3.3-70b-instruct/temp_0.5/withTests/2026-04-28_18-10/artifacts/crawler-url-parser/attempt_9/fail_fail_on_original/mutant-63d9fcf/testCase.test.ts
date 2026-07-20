import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should extract links and append different text', () => {
    const html = `
      <a href="http://example.com">Link 1</a>
      <a href="http://example.com">Link 2</a>
    `;
    const baseUrl = 'http://example.com';
    const result = extract(html, baseUrl);
    if(result && result.length > 0) {
      expect(result[0].text).toContain('Link 1');
      expect(result[0].text).toContain('Link 2');
    } else {
      expect(true).toBe(false);
    }
  });

  it('should extract links and not append duplicate text', () => {
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
});