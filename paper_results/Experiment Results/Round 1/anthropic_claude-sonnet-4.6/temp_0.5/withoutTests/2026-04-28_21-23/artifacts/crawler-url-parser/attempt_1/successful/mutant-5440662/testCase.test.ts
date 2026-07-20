import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype with null pageurl path', () => {
  it('should return correct type when pageurl has no path', () => {
    const linkurl = {
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: '/'
    };
    const pageurl = {
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: null
    };
    
    const result = gettype(linkurl, pageurl);
    // With original: pageurl_path = "", pageurl_parts = []
    // linkurl_path = "/", linkurl_parts = []
    // part_count_diff = 0, paths match at same level -> "samelevel"
    // With mutated: pageurl_path = "Stryker was here!", pageurl_parts = ["Stryker was here!"]
    // linkurl_parts = [], part_count_diff = -1
    // pageurl_path.includes(linkurl_path) -> "Stryker was here!".includes("/") -> false
    // returns "internal"
    expect(result).toBe('samelevel');
  });
});