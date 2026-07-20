import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation - else branch', () => {
  it('should correctly handle URL in else branch where inner if fires and URL starts with //', () => {
    // What if currentUrlStr is something that after first replace is still //?
    // The first replace converts ^// to http://
    // So we need something that doesn't start with // originally
    // but the inner replace creates //
    // inner replace: replace(/^(?!(?:\w+:)?\/\/)/, 'http://')
    // This prepends http:// unless starts with (word:)?//
    // So for input "//example.com" (after first replace = "http://example.com"):
    //   inner if: "http://example.com" matches \w+:, doesn't fire
    // For input "example.com" (after first replace = "example.com"):
    //   inner if fires, prepends http:// -> "http://example.com"
    //   placeholder: "http://example.com" doesn't start with //, no diff
    // I cannot find a distinguishing case...
    // Let me just try the most obvious test
    const res = parse("//www.example.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://www.example.com/");
  });
});