import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should trim text when extracting URLs', () => {
    const data = '<html><body><a href="https://www.example.com">   Example   </a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result[0].text).toBe('Example');
  });
});