// test/mutant-6ad6ee6.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should correctly handle URLs with fragments containing exactly two characters followed by more characters', () => {
    const result = parse("http://example.com/path#abcd");
    expect(result.url).toBe("http://example.com/path");
  });
});