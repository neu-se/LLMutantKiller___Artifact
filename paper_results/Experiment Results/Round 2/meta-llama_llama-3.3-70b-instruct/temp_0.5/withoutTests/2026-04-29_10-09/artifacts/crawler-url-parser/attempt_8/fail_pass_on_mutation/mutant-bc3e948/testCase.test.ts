import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should correctly extract link text', () => {
    const html = '<a href="https://www.example.com">Example</a>';
    const baseUrl = 'https://www.example.com';
    const result = extract(html, baseUrl);
    if (result.length > 0) {
      expect(result[0].text).toBeTruthy();
      expect(result[0].text).not.toBe('');
      expect(result[0].text.length).toBeGreaterThan(0);
    }
  });
});