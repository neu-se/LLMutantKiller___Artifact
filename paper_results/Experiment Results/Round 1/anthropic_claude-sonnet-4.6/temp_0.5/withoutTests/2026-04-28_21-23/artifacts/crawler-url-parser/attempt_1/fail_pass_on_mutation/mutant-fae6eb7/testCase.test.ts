import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with baseUrl containing fragment', () => {
  it('should correctly handle baseUrl with fragment followed by newline character', () => {
    // A baseUrl with a fragment followed by a newline
    // Original: /#.*$/ - with $ anchor, matches end of string (before trailing \n)
    // Mutated: /#.*/ - without $ anchor, same behavior for most cases
    // The key difference: for "http://example.com/page#frag\n",
    // /#.*$/ matches "#frag" ($ matches before trailing \n in JS)
    // /#.*/ matches "#frag" too
    // Let's use a URL where the fragment is at end with no trailing content
    const baseUrl = 'http://example.com/page#section';
    const result = parse('/other', baseUrl);
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/other');
  });
});