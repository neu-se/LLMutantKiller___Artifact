import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should trim text when extracting URLs', () => {
    const html = '<a href="https://example.com">  Example  </a>';
    const baseUrl = 'https://example.com';
    const result = extract(html, baseUrl);
    if (result.length > 0) {
      const text = result[0].text;
      expect(text).toEqual('Example');
      expect(text.trim()).toBe(text);
    }
  });
});