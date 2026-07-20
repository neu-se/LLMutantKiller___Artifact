import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle null text', () => {
    const data = '<a href="https://www.example.com">text</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result).toBeDefined();
    expect(result.length).toBe(1);
    expect(result[0]).toHaveProperty('text');
    expect(result[0].text).toBe('text');
  });
});