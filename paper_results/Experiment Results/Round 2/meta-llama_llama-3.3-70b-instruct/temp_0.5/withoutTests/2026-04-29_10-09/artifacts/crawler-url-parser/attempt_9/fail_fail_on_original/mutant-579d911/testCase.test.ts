import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should filter out invalid hrefs', () => {
    const html = '<a href="a">Link</a>';
    const result = extract(html, 'https://example.com');
    expect(result.length).toBe(1);
  });
});