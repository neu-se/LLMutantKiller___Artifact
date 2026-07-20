import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should filter out short hrefs', () => {
    const data = '<a href="a">Link</a><a href="http://example.com">Valid Link</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com');
  });
});