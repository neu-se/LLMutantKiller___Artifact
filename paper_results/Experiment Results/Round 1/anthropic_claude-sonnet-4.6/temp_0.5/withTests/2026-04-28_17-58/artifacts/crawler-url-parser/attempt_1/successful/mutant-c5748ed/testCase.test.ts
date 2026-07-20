import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.html in middle of pageurl path', () => {
  it('should return sublevel when link is one level deeper than page with index.html in middle of path', () => {
    // pageurl has /index.html in the middle (not at end)
    // Original: regex anchored with $ so /index.html/subpage stays unchanged
    // Mutated: regex without $ so /index.html/subpage becomes //subpage, changing path parts
    const result = gettype(
      'http://example.com/index.html/subpage/child',
      'http://example.com/index.html/subpage'
    );
    expect(result).toBe('sublevel');
  });
});