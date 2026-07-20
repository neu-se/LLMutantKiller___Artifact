import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection for \w+ vs \w regex', () => {
  it('should return null for two-char non-http protocol with baseUrl, not resolve as host:port', () => {
    // With original \w+: "go:8080" -> "go:" matches as protocol -> not http/https -> null
    // With mutated \w: "go:" doesn't match -> prepend http:// -> "http://go:8080"
    // -> host="go:8080", valid http URL -> psl.parse("go:8080") -> returns non-null result
    const result = parse("go:8080", "http://www.example.com/");
    expect(result).toBeNull();
  });
});