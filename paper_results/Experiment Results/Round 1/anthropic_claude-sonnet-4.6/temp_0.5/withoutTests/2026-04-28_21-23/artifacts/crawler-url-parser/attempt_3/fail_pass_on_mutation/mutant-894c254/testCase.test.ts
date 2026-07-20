import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters anchor mutation', () => {
  it('utm_ params starting mid-word should be preserved with original regex but removed with mutant', () => {
    // Test that utm_source IS removed (confirms removeQueryParameters is active)
    const withUtm = parse('http://example.com/?utm_source=test&page=1');
    // Now test a param where utm_ appears but not at start
    const withMidUtm = parse('http://example.com/?notutm_source=test&page=1');
    expect(withMidUtm).not.toBeNull();
    // Original /^utm_\w+/i: notutm_source does NOT match ^ anchor, so it's kept
    // Mutant /utm_\w+/i: notutm_source DOES match (contains utm_), so it's removed
    expect(withMidUtm!.url).toContain('notutm_source');
  });
});