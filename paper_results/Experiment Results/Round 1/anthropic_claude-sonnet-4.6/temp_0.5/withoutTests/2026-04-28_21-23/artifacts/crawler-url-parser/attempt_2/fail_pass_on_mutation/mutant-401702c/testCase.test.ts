import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe("parse function with bare domain URL", () => {
  it("should parse a bare domain URL without baseUrl by prepending http://", () => {
    // A bare domain like 'www.example.com' has no protocol and no leading slash
    // The outer if condition: !/^\.*\/|^(?!localhost)\w+:/.test('www.example.com') is true
    // So we enter the block where the mutation occurs
    // Original regex \w+ matches 'www' before potential ':', mutated \W+ does not
    // This means for '//www.example.com' after the outer replace... 
    // Let's test with a URL that starts with non-word chars before ://
    const result = parse("www.example.com");
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe("http:");
    expect(result!.host).toBe("www.example.com");
    expect(result!.url).toBe("http://www.example.com/");
  });
});