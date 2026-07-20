import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex anchoring', () => {
  it('should only remove query parameters that start with utm_, not those containing utm_ elsewhere', () => {
    const html = '<a href="http://example.com/page?xutm_source=test">link</a>';
    const results = extract(html, 'http://example.com/');
    
    expect(results).toHaveLength(1);
    // xutm_source should be preserved (original: /^utm_\w+/i doesn't match xutm_source)
    // but removed in mutated version (/utm_\w+/i matches xutm_source)
    expect(results[0].url).toContain('xutm_source');
  });
});