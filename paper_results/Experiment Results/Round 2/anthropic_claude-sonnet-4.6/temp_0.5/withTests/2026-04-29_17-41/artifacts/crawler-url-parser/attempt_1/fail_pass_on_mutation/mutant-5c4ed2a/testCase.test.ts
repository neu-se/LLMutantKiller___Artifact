import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing multi-character fragment', () => {
  it('should strip multi-character fragment from baseUrl before resolving relative URL', () => {
    // The baseUrl has a fragment "#section" (multi-character)
    // Original code: /#.*$/ strips "#section" completely -> baseUrl becomes "http://www.example.com/aaa/bbb/ccc"
    // Mutated code: /#.$/ only strips "#" + one char -> "#section" is NOT fully stripped (only "#s" would be removed if it matched, but "#section" has more chars so it won't match at all)
    // With the mutated code, the fragment remains and the resolution will be based on a broken base URL
    const result = parse("ddd", "http://www.example.com/aaa/bbb/ccc#section");
    // With original code: baseUrl fragment stripped -> resolves "ddd" relative to "http://www.example.com/aaa/bbb/ccc"
    // -> result should be "http://www.example.com/aaa/bbb/ddd"
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/bbb/ddd");
  });
});