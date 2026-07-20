import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should trim text when extracting URLs', () => {
    const data = '<a href="https://www.example.com">   Example   </a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    if (result.length > 0) {
      expect(result[0].text.length).toBe(7);
    }
  });
});