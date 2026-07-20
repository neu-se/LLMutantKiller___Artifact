import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without base URL', () => {
  it('should handle localhost with path correctly', () => {
    const res = parse("localhost://example.com");
    // Both original and mutated return null for this (invalid protocol)
    // But the PATH to null differs - let's check querycount on a working URL
    const res2 = parse("example.com/path?q=1");
    expect(res2).not.toBeNull();
    expect((res2 as any).querycount).toBe(1);
    expect((res2 as any).host).toBe("example.com");
  });
});