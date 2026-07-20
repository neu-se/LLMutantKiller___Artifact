import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL with fragment containing newline', () => {
  it('should strip fragment from URL that has a newline after the hash', () => {
    // With original /#.*$/, the $ anchors to end of string
    // With mutated /#.*/, without $ it still matches to end of non-newline chars
    // The difference: for "/aaa#frag\nrest", /#.*$/ without multiline matches "#frag\nrest"? No...
    // Let's use a URL with fragment followed by newline at end: "/aaa#frag\n"
    // /#.*$/ matches "#frag" ($ before trailing \n), result: "/aaa\n"  
    // /#.*/ matches "#frag", result: "/aaa\n"
    // Same result...
    const res = parse("/aaa#section\npath");
    expect(res!.url).toBe("/aaa");
  });
});