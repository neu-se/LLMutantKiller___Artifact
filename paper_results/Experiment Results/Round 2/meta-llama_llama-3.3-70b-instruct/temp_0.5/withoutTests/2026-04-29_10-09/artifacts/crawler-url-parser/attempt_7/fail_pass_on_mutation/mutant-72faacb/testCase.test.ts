import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle href with type string and length 3 correctly', () => {
    const data = '<a href="abc">Test</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
  });
});