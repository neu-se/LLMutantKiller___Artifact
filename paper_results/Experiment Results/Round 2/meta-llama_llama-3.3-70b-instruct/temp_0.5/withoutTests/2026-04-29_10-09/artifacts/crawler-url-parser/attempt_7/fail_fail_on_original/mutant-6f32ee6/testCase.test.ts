import { parse, gettype } from "../crawler-url-parser";

describe('gettype function', () => {
  it('should return "subdomain" when linkurl_subdomain_len is equal to pageurl_subdomain_len', () => {
    let linkurl = parse('http://sub.domain.com');
    let pageurl = parse('http://sub.domain.com');
    expect(gettype(linkurl, pageurl)).not.toBe('updomain');
  });
});