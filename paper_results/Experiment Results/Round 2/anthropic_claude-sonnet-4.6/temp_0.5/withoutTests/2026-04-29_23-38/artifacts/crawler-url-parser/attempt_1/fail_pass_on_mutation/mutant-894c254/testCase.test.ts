import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters option regex anchoring', () => {
  it('should preserve query parameters that contain utm_ but do not start with utm_', () => {
    // The original regex /^utm_\w+/i only matches params starting with utm_
    // The mutated regex /utm_\w+/i matches params containing utm_ anywhere
    // We test this by checking that a param like 'xutm_source' is preserved in original
    // but would be removed in mutated version
    
    // Since the options aren't directly applied in parse(), we test the regex behavior
    // by importing the module and checking the options object indirectly
    // through the actual URL parsing behavior
    
    // Create a URL with a parameter that has 'utm_' in the middle (not at start)
    const result = parse('http://example.com/page?xutm_source=test&normal=value');
    
    // In original code with /^utm_\w+/i: 'xutm_source' does NOT match (no ^ anchor issue)
    // In mutated code with /utm_\w+/i: 'xutm_source' DOES match and gets removed
    expect(result).not.toBeNull();
    expect(result.search).toContain('xutm_source');
  });
});