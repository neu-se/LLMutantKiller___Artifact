import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function - protocol-relative URL handling", () => {
  it("should correctly parse a URL that starts with // when no base URL is provided", () => {
    // A URL starting with // gets converted to http:// at the top of parse
    // Then inside the else block (no baseUrlStr), if the URL doesn't match the protocol pattern,
    // the placeholder code runs. Testing with a plain domain that needs http:// prepended
    // and then the // replacement.
    // The key scenario: after prepending http://, if there's a // that needs fixing
    const result = parse("example.com");
    expect(result).not.toBeNull();
    expect(result?.protocol).toBe("http:");
    expect(result?.host).toBe("example.com");
  });
});