import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL mutation detection - regex difference', () => {
  it('should correctly handle a URL that exercises the http prepend without double-slash issue', () => {
    // The mutation removes ? making \w+: required in the negative lookahead
    // This means for a string starting with // (no word: before it),
    // the mutated regex would incorrectly prepend http://, creating http:////...
    // We need a URL where currentUrlStr starts with // when the regex runs
    // Testing with a URL passed as baseUrlStr that is // prefixed,
    // then a relative URL that gets resolved against it
    const res = parse("path", "//example.com/base/");
    expect(res).not.toBeNull();
    expect(res!.url).toBe("http://example.com/base/path");
  });
});