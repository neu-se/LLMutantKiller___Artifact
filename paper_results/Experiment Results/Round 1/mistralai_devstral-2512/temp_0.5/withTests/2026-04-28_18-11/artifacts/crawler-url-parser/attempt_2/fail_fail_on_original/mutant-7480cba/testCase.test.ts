// test/mutant-7480cba.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with protocol-less URLs', () => {
  it('should correctly handle URLs starting with single character followed by colon', () => {
    // This test targets the mutation where the regex was changed from /^(?!(?:\w+:)?\/\/)/ to /^(?!(?:\w:)?\/\/)/
    // The original regex requires at least one character before the colon (e.g., "h:"), while the mutated version
    // would match invalid single-character protocols like "a:"
    const result = parse("a:test.com");
    expect(result).not.toBeNull();
  });
});