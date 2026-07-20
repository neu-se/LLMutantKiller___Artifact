// test/mutant-6ad6ee6.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should correctly remove fragments with multiple characters', () => {
    const result = parse("http://example.com/path#fragment123");
    expect(result.url).toBe("http://example.com/path");
  });
});