import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should treat a 2-char scheme URL as non-http protocol and return null', () => {
    // "id:name" - "id:" is 2 chars
    // Original \w+: matches "id:" -> no prepend -> URL.parse("id:name") -> protocol="id:" -> not http/https -> null
    // Mutant \w: doesn't match "id:" -> prepend -> "http://id:name" -> URL.parse gives protocol=http:, host=id -> non-null
    const result = parse('id:name', 'http://base.com/');
    expect(result).toBeNull();
  });
});