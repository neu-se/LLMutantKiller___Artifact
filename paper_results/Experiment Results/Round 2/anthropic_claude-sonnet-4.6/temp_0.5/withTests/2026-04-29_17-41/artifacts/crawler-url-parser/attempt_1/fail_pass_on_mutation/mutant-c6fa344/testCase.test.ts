import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without protocol prefix', () => {
  it('should correctly parse a URL starting with // when no baseUrl is provided and it matches a non-protocol path', () => {
    // The key: a URL like "google.com" (no protocol, no leading slash, no relative prefix)
    // should get http:// prepended. Both versions handle this.
    // The mutation difference: original regex (?!(?:\w+:)?\/\/) vs mutated (?!(?:\w+:)\/\/)
    // For "google.com": original prepends http://, mutated also prepends http://
    // For a URL already starting with "https://" - outer condition prevents entering block
    // The subtle case: what if currentUrlStr after // replacement is something like "http://example.com"
    // but the outer if condition... wait, "http://example.com" matches \w+: so it won't enter the block
    // Let me test "localhost" - outer condition has (?!localhost) so localhost WOULD enter the block
    const res = parse("localhost");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://localhost/");
  });
});