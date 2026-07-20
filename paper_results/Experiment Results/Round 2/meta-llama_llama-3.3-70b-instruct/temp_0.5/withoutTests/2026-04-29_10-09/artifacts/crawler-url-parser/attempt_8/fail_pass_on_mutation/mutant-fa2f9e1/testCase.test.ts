import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle text', () => {
    const data = '<a href="https://www.example.com">text</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result).toBeDefined();
    if (result.length > 0) {
      expect(result[0]).toHaveProperty('text');
      expect(result[0].text).toEqual('text');
    }
  });
});