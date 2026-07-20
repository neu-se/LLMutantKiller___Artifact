import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly extract text from links', () => {
    const html = '<a href="https://example.com"></a>';
    const sourceUrl = 'https://example.com';
    const result = extract(html, sourceUrl);
    if (result && result.length > 0) {
      expect(result[0].text).not.toBe(false);
      expect(result[0].text).not.toBeNull();
      expect(result[0].text).not.toBe('');
    } else {
      expect(result).not.toBeNull();
    }
  });
});