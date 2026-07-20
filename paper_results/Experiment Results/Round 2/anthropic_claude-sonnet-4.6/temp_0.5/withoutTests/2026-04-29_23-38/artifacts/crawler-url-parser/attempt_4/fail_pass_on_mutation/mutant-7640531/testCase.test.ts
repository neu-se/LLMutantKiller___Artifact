import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly parse URL with fragment when used as base URL', () => {
    // Test where fragment stripping on baseUrlStr matters
    const result = parse('relative/path', 'http://example.com/base#fragment');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/relative/path');
  });
});