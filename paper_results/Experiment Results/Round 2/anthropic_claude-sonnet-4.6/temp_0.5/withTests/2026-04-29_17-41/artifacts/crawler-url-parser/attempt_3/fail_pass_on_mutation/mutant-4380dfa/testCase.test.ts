import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL mutation detection', () => {
  it('should correctly parse a URL that would be affected by the double-slash replacement in the else branch', () => {
    // Testing with a URL that goes through the else branch (no baseUrl)
    // and where the inner replace creates a URL starting with //
    // This specifically tests the placeholder mutation
    const res = parse("google.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://google.com/");
    expect(res.protocol).toBe("http:");
  });
});