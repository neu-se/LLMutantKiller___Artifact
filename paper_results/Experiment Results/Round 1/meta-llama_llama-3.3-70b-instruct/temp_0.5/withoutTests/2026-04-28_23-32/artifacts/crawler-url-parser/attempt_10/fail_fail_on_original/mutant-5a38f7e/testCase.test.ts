import { gettype } from "../../crawler-url-parser";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = { path: '', host: 'example.com', domain: 'example.com', subdomain: null };
    const pageurl = { path: '', host: 'example.com', domain: 'example.com', subdomain: null };
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('internal');
  });
});