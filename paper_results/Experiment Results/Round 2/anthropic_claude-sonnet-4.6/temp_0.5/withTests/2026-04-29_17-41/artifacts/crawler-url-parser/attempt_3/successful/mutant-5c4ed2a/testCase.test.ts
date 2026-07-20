import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse strips fragment from baseUrl', () => {
  it('should strip multi-character fragment from baseUrl so ret.baseurl does not contain fragment', () => {
    // baseUrl has fragment "#longfrag" (multi-char)
    // Original: /#.*$/ strips it -> baseUrlStr has no fragment -> ret.baseurl has no fragment
    // Mutated: /#.$/ does NOT strip "#longfrag" -> baseUrlStr retains fragment -> ret.baseurl contains fragment
    const result = parse("ddd", "http://www.example.com/aaa/bbb/ccc/#longfrag");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("http://www.example.com/aaa/bbb/ccc/");
  });
});