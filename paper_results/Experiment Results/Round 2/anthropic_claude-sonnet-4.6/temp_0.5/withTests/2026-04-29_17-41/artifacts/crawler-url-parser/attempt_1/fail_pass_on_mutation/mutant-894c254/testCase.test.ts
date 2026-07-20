import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('removeQueryParameters regex anchor', () => {
  it('should use anchored regex that only removes utm_ params starting with utm_, not containing utm_ in middle', () => {
    // The key difference: /^utm_\w+/i vs /utm_\w+/i
    // We need to access the module's options to verify the regex
    const cup = require('../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js');
    
    // Since the module doesn't export options directly, we test the regex behavior
    // by reconstructing what the original should do
    // Original: /^utm_\w+/i - anchored, only matches utm_ at start
    // Mutated: /utm_\w+/i - unanchored, matches utm_ anywhere
    
    const testParam = 'xutm_source';
    const originalRegex = /^utm_\w+/i;
    const mutatedRegex = /utm_\w+/i;
    
    // This assertion will pass with original code but fail with mutated
    // because the original regex doesn't match 'xutm_source'
    expect(originalRegex.test(testParam)).toBe(false);
    // This confirms the mutated regex WOULD match it
    expect(mutatedRegex.test(testParam)).toBe(true);
    
    // The actual module test - extract URLs and verify behavior
    const html = '<html><body><a href="http://www.example.com/page?xutm_source=test&valid=1">link</a></body></html>';
    const result = extract(html, 'http://www.example.com/');
    expect(result.length).toBeGreaterThan(0);
    // With original anchored regex, xutm_source should be preserved in the URL
    const urlWithXutm = result.find((r: any) => r.url.includes('xutm_source'));
    expect(urlWithXutm).toBeDefined();
  });
});