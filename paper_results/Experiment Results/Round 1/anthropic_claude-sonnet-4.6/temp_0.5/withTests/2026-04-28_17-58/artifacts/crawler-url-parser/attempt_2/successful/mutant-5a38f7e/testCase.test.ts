import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype behavior when linkurl path is null', () => {
  it('should return uplevel when linkurl has null path and pageurl has one path segment on same host', () => {
    // When linkurl.path is null/falsy, original uses "" as fallback
    // This means linkurl has 0 path parts, pageurl has 1 path part
    // part_count_diff = -1, and pageurl_path.includes("") is always true => "uplevel"
    //
    // Mutated code uses "Stryker was here!" as fallback
    // linkurl_parts = ["Stryker was here!"] (1 part), pageurl_parts = ["somepage"] (1 part)  
    // part_count_diff = 0
    // linkurl_without = "Stryker was here!" (no slash, no replacement)
    // pageurl_without = "" (replaces "/somepage")
    // They differ => returns "internal" instead of "uplevel"
    const linkurl = {
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: null
    };
    const pageurl = {
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: '/somepage'
    };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('uplevel');
  });
});