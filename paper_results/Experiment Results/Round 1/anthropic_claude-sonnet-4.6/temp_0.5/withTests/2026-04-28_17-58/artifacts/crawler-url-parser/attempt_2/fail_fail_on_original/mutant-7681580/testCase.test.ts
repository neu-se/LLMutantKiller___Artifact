import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse localhost URL with protocol', () => {
  it('should correctly parse localhost:// URL', () => {
    const res = parse("localhost://something");
    // Original: no http:// prepended, parsed as-is
    // Mutated: http:// inserted mid-string, corrupting the URL
    expect(res).not.toBeNull();
    expect(res.url).toBe("localhost://something");
  });
});