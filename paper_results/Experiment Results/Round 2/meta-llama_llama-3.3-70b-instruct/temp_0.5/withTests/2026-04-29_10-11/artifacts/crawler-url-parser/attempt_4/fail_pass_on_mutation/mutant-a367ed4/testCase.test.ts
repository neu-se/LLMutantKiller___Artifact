import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle href with length less than 3 correctly', () => {
    const html = '<a href="javascript:void(0)">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const result = extract(html, baseUrl);
    expect(result).toHaveLength(0);
  });
});