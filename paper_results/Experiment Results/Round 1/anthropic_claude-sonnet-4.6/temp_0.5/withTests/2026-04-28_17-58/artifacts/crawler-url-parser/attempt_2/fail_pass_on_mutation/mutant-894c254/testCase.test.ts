import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex anchor', () => {
  it('should keep query parameter named xutm_source as it does not start with utm_', () => {
    const result = parse('http://www.example.com/page?xutm_source=google');
    
    // Original: /^utm_\w+/i - only removes params starting with utm_, so xutm_source is kept
    // Mutated: /utm_\w+/i - removes params containing utm_ anywhere, so xutm_source is removed
    expect(result).not.toBeNull();
    expect(result!.url).toContain('xutm_source=google');
  });
});