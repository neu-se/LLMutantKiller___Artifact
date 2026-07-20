// test/mutant-6ad6ee6.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should correctly handle URLs with single-character fragments', () => {
    const result = parse("http://example.com/path#a");
    expect(result.url).toBe("http://example.com/path");
  });
});