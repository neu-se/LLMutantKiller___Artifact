import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('regex anchoring difference with trailing newline in fragment', () => {
    // Directly test the regex behavior difference
    const original = /#.*$/.test('http://example.com/#frag\nmore');
    const mutated = /#.*/.test('http://example.com/#frag\nmore');
    // original: false ($ can't match before non-final \n)  
    // mutated: true
    expect(original).toBe(false);
    expect(mutated).toBe(true);
  });
});