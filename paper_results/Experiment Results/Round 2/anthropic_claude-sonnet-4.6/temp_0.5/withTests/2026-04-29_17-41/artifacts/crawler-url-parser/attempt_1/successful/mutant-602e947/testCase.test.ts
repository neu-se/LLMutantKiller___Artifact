import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with colon not at start', () => {
  it('should prepend http:// to a URL like "aaa/bbb:ccc" when no baseUrl is provided', () => {
    const result = parse("aaa/bbb:ccc");
    // In original code, "aaa/bbb:ccc" does not start with a protocol (word: at start),
    // so http:// is prepended, giving "http://aaa/bbb:ccc"
    // In mutated code, the regex matches "bbb:" anywhere, so http:// is NOT prepended,
    // leaving the URL unparseable or returning a different result
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://aaa/bbb:ccc");
  });
});