// test/mutant-7681580.test.ts
import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function with protocol-less URL', () => {
  it('should add http:// prefix to URLs without protocol when no base URL is provided', () => {
    const result = parse("http://example.com");
    expect(result?.url).toBe("http://example.com/");
  });
});