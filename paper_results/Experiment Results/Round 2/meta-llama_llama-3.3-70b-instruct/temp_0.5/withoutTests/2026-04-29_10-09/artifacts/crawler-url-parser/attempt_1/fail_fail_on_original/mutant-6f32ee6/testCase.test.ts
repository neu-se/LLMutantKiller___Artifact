import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    let linkurl = { subdomain: 'sub', domain: 'domain', path: '/' };
    let pageurl = { subdomain: 'sub', domain: 'domain', path: '/' };
    expect(gettype(linkurl, pageurl)).toBe('subdomain');
  });
});