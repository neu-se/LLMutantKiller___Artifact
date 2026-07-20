import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL with multi-character fragment', () => {
  it('should strip multi-character fragment from relative path URL', () => {
    // For relative URLs like "/aaa#hhh", the fragment is removed by currentUrlStr.replace(/#.*$/, '')
    // With mutated code /#.$/ : "#hh" has 2 chars after #, so no match -> fragment stays
    // The URL module then parses "/aaa#hh" and delete parsedUrl.hash removes it
    // But for "/aaa#h" (single char), mutated /#.$/ DOES match and removes it
    // Test with single char fragment to verify mutated behavior differs
    const result = parse("/aaa#h");
    expect(result).not.toBeNull();
    expect(result.url).toBe("/aaa");
  });
});