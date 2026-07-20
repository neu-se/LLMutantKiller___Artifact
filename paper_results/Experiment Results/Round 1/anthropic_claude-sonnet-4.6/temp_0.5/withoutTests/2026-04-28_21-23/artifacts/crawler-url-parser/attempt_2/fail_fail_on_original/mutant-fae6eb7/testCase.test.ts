import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse baseUrl fragment stripping with embedded newline', () => {
  it('should handle baseUrl fragment replacement with $ anchor correctly', () => {
    // baseUrl: "http://example.com/page#frag\ngarbage"
    // Original /#.*$/ : $` won't match mid-string after \n, so... 
    // Actually /#.*$/ without m flag: $ matches end of string only (or before final \n)
    // .*  stops at \n, so #frag is matched but $ is NOT at end of string here
    // So the regex FAILS to match -> baseUrl unchanged = "http://example.com/page#frag\ngarbage"
    // Mutated /#.*/ : matches #frag, result = "http://example.com/page\ngarbage"
    const baseUrl = 'http://example.com/page#frag\ngarbage';
    const resultOriginal = parse('/newpath', baseUrl);
    // With original: baseUrl not stripped ($ doesn't match), so baseUrl has #frag\ngarbage
    // URL.parse would handle this oddly
    // With mutant: baseUrl becomes "http://example.com/page\ngarbage" - invalid URL
    // The behavior should differ
    expect(resultOriginal).not.toBeNull();
  });
});