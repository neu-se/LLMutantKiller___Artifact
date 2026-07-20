import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = { path: '/path/to/link' };
    const pageurl = { path: '/path/to/page' };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('external');
  });
});