import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default.html normalization in pageurl path directly', () => {
  it('should return uplevel not internal when pageurl ends with /ccc/default.html and linkurl is /aaa/bbbX/', () => {
    // Pass pre-parsed objects to avoid parse() interfering
    // linkurl.path = '/aaa/bbbX/', pageurl.path = '/aaa/bbbX/ccc/default.html'
    // original: pageurl_path -> '/aaa/bbbX/ccc/', includes('/aaa/bbbX/') = true -> uplevel
    // mutated:  pageurl_path -> '/aaa/bbbX/ccc',  includes('/aaa/bbbX/') = false -> internal
    const linkurl = {
      host: 'www.stackoverflow.com',
      domain: 'stackoverflow.com',
      subdomain: 'www',
      path: '/aaa/bbbX/',
      search: null
    };
    const pageurl = {
      host: 'www.stackoverflow.com',
      domain: 'stackoverflow.com',
      subdomain: 'www',
      path: '/aaa/bbbX/ccc/default.html',
      search: null
    };
    const result = gettype(linkurl as any, pageurl as any);
    expect(result).toBe('uplevel');
  });
});