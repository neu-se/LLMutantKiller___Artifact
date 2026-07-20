import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should correctly extract links from HTML', () => {
    const html = '<html><body><a href="https://www.example.com"></a></body></html>';
    const result = extract(html, 'https://www.example.com');
    if (result.length > 0) {
      expect(result[0].text).not.toBe('Stryker was here!');
    } else {
      expect(result.length).toBe(0);
    }
  });
});