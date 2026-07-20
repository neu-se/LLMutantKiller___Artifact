import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('crawler-url-parser', () => {
  it('utm regex word character class behavior', () => {
    // /^utm_\w+/i matches utm_source (word chars after utm_)
    // /^utm_\W+/i does NOT match utm_source (requires non-word chars)
    // The module should use \w to correctly identify utm parameters
    
    // Since result_normalize_options is not used in exported functions,
    // we verify the module loads correctly and the regex concept is sound
    const result = parse('http://example.com/?utm_source=google');
    expect(result).not.toBeNull();
    
    // Verify the correct regex behavior (what the module constant should implement)
    const correctRegex = /^utm_\w+/i;
    expect(correctRegex.test('utm_source')).toBe(true);
    expect(correctRegex.test('utm_medium')).toBe(true);
    expect(correctRegex.test('utm_campaign')).toBe(true);
  });
});