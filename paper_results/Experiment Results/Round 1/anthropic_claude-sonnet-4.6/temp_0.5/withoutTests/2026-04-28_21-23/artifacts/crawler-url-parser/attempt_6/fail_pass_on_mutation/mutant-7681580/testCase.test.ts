import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should not insert extra http:// into an already valid http URL', () => {
    const result = parse('http://example.com');
    // With original code: url should be 'http://example.com/'
    // With mutated code: url would be corrupted or null
    if (result === null) {
      // This means mutated code returned null - test should fail
      expect(result).not.toBeNull();
    } else {
      expect(result.url).not.toContain('httphttp');
      expect(result.url).toMatch(/^http:\/\/example\.com/);
    }
  });
});