import { parse, gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    let linkurl = parse('http://sub.domain.com');
    let pageurl = parse('http://sub.domain.com');
    expect(gettype(linkurl, pageurl)).toBe('subdomain');
  });
});