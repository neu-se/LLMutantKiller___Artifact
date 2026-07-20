import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with null pageurl path', () => {
  it('should return correct type when pageurl has no path', () => {
    // Create a link URL and page URL where pageurl.path is null
    // When pageurl.path is null:
    // - original: pageurl_path = "" -> parts = [] -> part_count_diff = linkurl_parts.length
    // - mutated: pageurl_path = "Stryker was here!" -> parts = ["Stryker was here!"] -> different behavior
    
    // linkurl has path "/aaa", pageurl has path null
    // Original: linkurl_parts=["aaa"], pageurl_parts=[], diff=1, checks if linkurl_path.includes("") -> true -> "sublevel"
    // Mutated: linkurl_parts=["aaa"], pageurl_parts=["Stryker was here!"], diff=0, different path -> "internal"
    
    const linkurl = { host: 'example.com', domain: 'example.com', subdomain: null, path: '/aaa' };
    const pageurl = { host: 'example.com', domain: 'example.com', subdomain: null, path: null };
    
    const result = gettype(linkurl, pageurl);
    expect(result).toBe('sublevel');
  });
});