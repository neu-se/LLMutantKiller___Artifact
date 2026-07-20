import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl containing fragment', () => {
  it('should handle baseUrl where fragment stripping affects URL resolution with multiline content', () => {
    // A baseUrl with \n after fragment - with $ the behavior anchors differently
    // "http://example.com/path#frag\n" 
    // /#.*$/ matches "frag" before \n ($ matches before trailing \n)  
    // /#.*/ matches "frag" stopping at \n
    // Both same... 
    // Let's try: the baseUrl itself after replace still has \n which makes URL.parse behave differently
    const baseUrl = "http://www.stackoverflow.com/aaa/bbb/ccc#section\n";
    const result = parse("ddd", baseUrl);
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/bbb/ddd");
  });
});