import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with fragment using base URL', () => {
  it('should resolve relative URL with multi-char fragment against base URL correctly', () => {
    // "ddd#ab" with base "http://www.stackoverflow.com/aaa/bbb/ccc"
    // Original: "ddd#ab" -> replace(/#.*$/) -> "ddd" -> resolved to "http://www.stackoverflow.com/aaa/bbb/ddd"
    // Mutated: "ddd#ab" -> replace(/#.$/) no match -> "ddd#ab" stays
    //   URL.parse("ddd#ab") has href="ddd#ab", hash="#ab"
    //   delete parsedUrl.hash removes hash property but href still has "#ab"
    //   URL.resolve(base, parsedUrl) uses href -> resolves "ddd#ab" -> "http://www.stackoverflow.com/aaa/bbb/ddd#ab"
    //   final URL.format strips hash via second delete? No - second parse has no delete on final parsedUrl
    const result = parse("ddd#ab", "http://www.stackoverflow.com/aaa/bbb/ccc");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});