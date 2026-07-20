import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract should skip anchors with undefined href', () => {
  it('should not include links with undefined href in the extracted results', () => {
    // An anchor without an href attribute will have href as undefined
    // Original code: if (typeof href == "undefined" || ...) return;  -> skips undefined href
    // Mutated code: if (false || ...) return;  -> does NOT skip undefined href, causing href.length to throw
    const html = '<html><body><a>no href here</a><a href="http://www.example.com/page">valid link</a></body></html>';
    const sourceUrl = 'http://www.example.com/';
    
    // In the original code, the anchor with no href is skipped gracefully
    // In the mutated code, accessing href.length when href is undefined throws a TypeError
    const result = extract(html, sourceUrl);
    
    // Only the valid link should be extracted (the anchor without href is skipped)
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('http://www.example.com/page');
  });
});