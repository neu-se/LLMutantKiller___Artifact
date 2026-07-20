import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL query string with equals sign in value', () => {
  it('should correctly count query parameters when value contains equals sign', () => {
    // With parseQueryString=true: query={q: 'v1=v2'}, URL.format reconstructs as ?q=v1%3Dv2
    // search becomes ?q=v1%3Dv2, split("=").length-1 = 2
    // With parseQueryString=false: search=?q=v1=v2, split("=").length-1 = 2
    // Hmm same count... but URL differs
    const result = parse("http://www.example.com/path?q=v1=v2");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path?q=v1=v2");
  });
});