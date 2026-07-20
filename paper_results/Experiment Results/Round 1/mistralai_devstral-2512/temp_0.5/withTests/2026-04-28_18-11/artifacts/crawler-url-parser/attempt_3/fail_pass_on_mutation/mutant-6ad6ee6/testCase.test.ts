// test/mutant-6ad6ee6.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with fragment handling', () => {
  it('should correctly handle URLs with fragments containing multiple characters', () => {
    const result = parse("http://example.com/path#abc");
    expect(result.url).toBe("http://example.com/path");
  });
});