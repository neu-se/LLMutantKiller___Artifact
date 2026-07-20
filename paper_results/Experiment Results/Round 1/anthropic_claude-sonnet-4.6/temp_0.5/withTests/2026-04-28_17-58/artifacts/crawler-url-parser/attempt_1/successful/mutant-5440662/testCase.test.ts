import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with null pageurl path', () => {
  it('should return "sublevel" when linkurl has one path segment and pageurl has no path', () => {
    // pageurl with null path - original uses "" (0 parts), mutated uses "Stryker was here!" (1 part)
    // linkurl has path "/aaa" (1 part)
    // With original: part_count_diff = 1 - 0 = 1, checks sublevel -> returns "sublevel"
    // With mutated: part_count_diff = 1 - 1 = 0, checks samelevel -> returns "samelevel" or "internal"
    const linkurl = {
      url: 'http://example.com/aaa',
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: '/aaa',
      search: null
    };
    const pageurl = {
      url: 'http://example.com',
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: null,
      search: null
    };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });
});