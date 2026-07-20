import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL behavior difference between original and mutated regex', () => {
  it('should return null for ftp: scheme URL when baseUrl is provided', () => {
    // "ftp:page" - original \w+: matches "ftp:" so treated as protocol, not http/https -> null
    // mutated \w: does NOT match "ftp:" -> prepends http:// -> "http://ftp:page"
    // URL.parse("http://ftp:page") -> host="ftp", invalid port "page" -> host is null -> 
    // parsedUrl.host == null && baseUrlStr -> resolves relative to base -> non-null result
    const result = parse("ftp:page", "http://www.example.com/path/");
    expect(result).toBeNull();
  });
});