import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('gettype with directory index normalization', () => {
  it('should treat a link ending in /index.htm as sublevel relative to the parent directory', () => {
    // When removeDirectoryIndex is true, "http://example.com/aaa/index.htm" normalizes to
    // "http://example.com/aaa/" which is sublevel relative to "http://example.com/"
    // When removeDirectoryIndex is false, the normalization does not occur and the
    // classification may differ
    const linkUrl = 'http://journals.tubitak.gov.tr/agriculture/index.htm';
    const pageUrl = 'http://journals.tubitak.gov.tr/';
    const result = gettype(linkUrl, pageUrl);
    expect(result).toBe('sublevel');
  });
});