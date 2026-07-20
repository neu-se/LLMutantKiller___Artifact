import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle href with length less than 3 and undefined', () => {
    const data = '<a href="a"></a><a href="javascript:void(0)"></a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});