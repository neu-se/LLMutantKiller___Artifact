import { extract } from '../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should handle null urls correctly', () => {
    const htmlString = '<a href="http://www.stackoverflow.com/internal-1">test-link-1</a>';
    const baseUrl = 'http://www.stackoverflow.com/aaa/bbb/ccc';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com/internal-1');
  });
});