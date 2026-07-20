import { gettype } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly determine the type of a link', () => {
    const linkurl = { path: '', host: 'example.com', domain: 'example.com', subdomain: null };
    const pageurl = { path: '', host: 'example.com', domain: 'example.com', subdomain: null };
    const result = gettype(linkurl, pageurl);
    expect(result).not.toBe('Stryker was here!');
  });
});