import { gettype } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should return "samelevel" when linkurl and pageurl have the same path without the last part', () => {
    const linkurl = 'http://example.com/path/to/resource';
    const pageurl = 'http://example.com/path/to/resource/';
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('samelevel');
  });
});