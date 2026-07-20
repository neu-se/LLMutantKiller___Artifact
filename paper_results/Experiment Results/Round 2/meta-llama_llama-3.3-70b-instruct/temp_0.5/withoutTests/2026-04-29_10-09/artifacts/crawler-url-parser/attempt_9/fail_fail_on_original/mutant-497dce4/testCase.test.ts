import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle multiple links with the same URL and different text', () => {
    const data = '<a href="https://www.example.com">Link 1</a><a href="https://www.example.com">Link 2</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBeGreaterThan(0);
  });
});