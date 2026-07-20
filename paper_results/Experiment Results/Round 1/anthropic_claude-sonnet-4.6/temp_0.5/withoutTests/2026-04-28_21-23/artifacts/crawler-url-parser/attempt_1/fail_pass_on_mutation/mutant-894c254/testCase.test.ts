import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser removeQueryParameters mutation', () => {
  it('should keep query parameters that contain utm_ but do not start with utm_', () => {
    // The original regex /^utm_\w+/i only matches params starting with utm_
    // The mutated regex /utm_\w+/i matches params containing utm_ anywhere
    // A parameter like "xutm_source" should be kept by original but removed by mutant
    // 
    // However, since result_normalize_options may not be directly applied in parse(),
    // we test with a standard utm_ param to verify basic behavior first,
    // then test with a non-starting utm_ param to detect the mutation.
    
    // Test with a URL that has a parameter containing utm_ but not starting with it
    const result = parse('http://example.com/page?xutm_source=google&id=123');
    
    // In original: /^utm_\w+/i - 'xutm_source' does NOT match (doesn't start with utm_)
    // so xutm_source should be preserved in the URL
    // In mutant: /utm_\w+/i - 'xutm_source' DOES match (contains utm_)
    // so xutm_source would be removed from the URL
    
    expect(result).not.toBeNull();
    expect(result!.url).toContain('xutm_source=google');
  });
});