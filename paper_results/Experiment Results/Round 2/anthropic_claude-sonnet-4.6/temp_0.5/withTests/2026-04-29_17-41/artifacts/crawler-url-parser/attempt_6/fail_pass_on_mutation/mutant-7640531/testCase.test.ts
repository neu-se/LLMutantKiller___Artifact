import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse URL with fragment', () => {
  it('should handle URL with fragment where first replace is critical', () => {
    // Testing with a URL that starts with // and has a fragment
    // After replace(/^\/\//, ""), the // is removed
    // Then the fragment replace runs
    const res = parse("//example.com/path#section", "http://base.com/");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/path");
  });
});