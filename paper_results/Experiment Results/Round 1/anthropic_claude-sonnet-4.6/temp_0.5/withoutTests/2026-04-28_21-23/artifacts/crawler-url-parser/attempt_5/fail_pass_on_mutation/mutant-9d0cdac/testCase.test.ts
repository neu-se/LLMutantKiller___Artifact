import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should handle relative URL like "go:something" differently based on protocol detection', () => {
    // With original \w+: "go:" matches, no http:// prepend, protocol is "go:" → null
    // With mutant \w: "go:" doesn't match, http:// prepended → "http://go:something"
    // URL.parse("http://go:something") → host="go:something" treated as host:port
    // protocol is http: → not null, returns a result object
    const result = parse('go:something', 'http://base.com/');
    expect(result).toBeNull();
  });
});