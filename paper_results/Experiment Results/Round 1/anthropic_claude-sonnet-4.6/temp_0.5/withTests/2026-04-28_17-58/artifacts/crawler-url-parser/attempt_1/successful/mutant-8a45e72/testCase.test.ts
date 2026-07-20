import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with default page url path normalization', () => {
  it('should return sublevel when link is under root and page url ends with /default.html', () => {
    // Page URL ends with /default.html - should be normalized to /
    // Link URL is /about.html - one level below root
    // Original: pageurl_path normalized to "/" (0 parts), linkurl_path = "/about.html" (1 part)
    //   -> part_count_diff = 1, linkurl_path.includes(pageurl_path) = true -> "sublevel"
    // Mutated: pageurl_path stays "/default.html" (1 part), linkurl_path = "/about.html" (1 part)
    //   -> part_count_diff = 0, both without_last_part = "" -> "samelevel"
    const result = gettype(
      'http://www.example.com/about.html',
      'http://www.example.com/default.html'
    );
    expect(result).toBe('sublevel');
  });
});