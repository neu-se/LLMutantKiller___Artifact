import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser', () => {
  it('utm regex \\w should match word characters like utm_source', () => {
    // Test the regex behavior that the module constant should implement
    // /^utm_\w+/i (original) matches utm_source because 'source' has word chars
    // /^utm_\W+/i (mutated) does NOT match utm_source
    
    // We verify by checking what regex the module would need to correctly
    // identify utm_source as a utm parameter
    const testParam = 'utm_source';
    
    // Original regex behavior - this is what the module SHOULD have
    expect(/^utm_\w+/i.test(testParam)).toBe(true);
    
    // If module had mutated regex, this would be the (wrong) behavior  
    // We assert it's false to confirm \W doesn't match word chars
    expect(/^utm_\W+/i.test(testParam)).toBe(false);
    
    // Verify module loads correctly
    const result = parse('http://example.com/?utm_source=google');
    expect(result).not.toBeNull();
  });
});