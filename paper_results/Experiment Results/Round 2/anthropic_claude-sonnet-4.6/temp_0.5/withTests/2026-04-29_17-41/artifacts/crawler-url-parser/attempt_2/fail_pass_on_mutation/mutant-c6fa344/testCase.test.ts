import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL protocol handling', () => {
  it('should parse a URL with https:// protocol correctly without adding extra http://', () => {
    // With original regex /^(?!(?:\w+:)?\/\/)/, the lookahead prevents prepending http://
    // to strings starting with // (optional word: then //)
    // With mutated regex /^(?!(?:\w+:)\/\/)/, only word:// is blocked
    // If somehow // reaches the regex, mutated would prepend http:// giving http:////...
    // Testing with a URL that exercises the no-baseUrl path with a protocol-like string
    const res = parse("https://www.google.com");
    expect(res).not.toBeNull();
    expect(res!.protocol).toBe("https:");
    expect(res!.url).toBe("https://www.google.com/");
  });
});