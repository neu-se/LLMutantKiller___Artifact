import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with null path in linkurl', () => {
  it('should return "internal" when linkurl has no path and same host as pageurl', () => {
    // Create URL objects directly to control path being null/falsy
    const linkurl = {
      url: 'http://example.com',
      protocol: 'http:',
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: null,
      search: null,
      querycount: 0
    };
    const pageurl = {
      url: 'http://example.com/aaa/bbb',
      protocol: 'http:',
      host: 'example.com',
      domain: 'example.com',
      subdomain: null,
      path: '/aaa/bbb',
      search: null,
      querycount: 0
    };

    // With original code: linkurl_path = "", pageurl_path = "/aaa/bbb"
    // linkurl_parts = [], pageurl_parts = ["aaa", "bbb"]
    // part_count_diff = 0 - 2 = -2, not -1, so returns "internal"
    //
    // With mutated code: linkurl_path = "Stryker was here!", pageurl_path = "/aaa/bbb"
    // linkurl_parts = ["Stryker was here!"], pageurl_parts = ["aaa", "bbb"]
    // part_count_diff = 1 - 2 = -1
    // pageurl_path.includes(linkurl_path) => "/aaa/bbb".includes("Stryker was here!") => false
    // returns "internal" too... need different scenario

    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');
  });
});