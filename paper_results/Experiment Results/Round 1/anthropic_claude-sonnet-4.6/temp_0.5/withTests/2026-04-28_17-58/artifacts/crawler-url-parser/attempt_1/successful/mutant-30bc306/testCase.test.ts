import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with index.htm in pageurl path', () => {
  it('should return sublevel when link is under a directory whose page url ends with /index.htm', () => {
    // pageurl has /index.htm (multi-char extension)
    // Original: pageurl_path "/aaa/index.htm" -> "/aaa/" after replace
    // Then linkurl "/aaa/bbb" vs pageurl "/aaa/" -> sublevel
    // Mutated: pageurl_path stays "/aaa/index.htm" (no replacement since .htm is 3 chars)
    // Then comparison differs -> not sublevel
    const result = gettype(
      'http://example.com/aaa/bbb',
      'http://example.com/aaa/index.htm'
    );
    expect(result).toBe('sublevel');
  });
});