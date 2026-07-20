import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse", () => {
  it("should prepend http:// to URL starting with non-word chars before :// when no base URL", () => {
    // '.://example.com' enters the no-baseUrl block
    // Original: \w+ doesn't match '.', so http:// IS prepended → valid http URL returned
    // Mutated: \W+ matches '.', so http:// is NOT prepended → invalid protocol → null
    const result = parse(".://example.com");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("http:");
  });
});