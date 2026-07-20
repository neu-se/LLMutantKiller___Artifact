import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection: http prepend with non-word protocol', () => {
  it('should correctly handle URL like "---://example.com" without base URL', () => {
    // "---://example.com" has illegal chars? Let's check: '-' is in allowed set (\-)
    // So passes illegal chars check
    // Doesn't match /^\.*\/|^(?!localhost)\w+:/ since "---:" doesn't match \w+:
    // Original (\w+): lookahead checks \w+://, "---://" doesn't match, so prepends http:// → "http://---://example.com"
    //   → URL.parse("http://---://example.com") → protocol "http:", host "---"... 
    // Mutated (\W+): lookahead checks \W+://, "---://" DOES match \W+://, so does NOT prepend → "---://example.com"
    //   → URL.parse("---://example.com") → protocol "---:", which is not http/https → returns null
    const res = parse("---://example.com");
    // Original returns non-null (http: protocol), mutated returns null
    expect(res).not.toBeNull();
  });
});