import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL where parseQueryString affects query object reconstruction', () => {
  it('should correctly reconstruct URL with plus-encoded spaces in query string', () => {
    // With parseQueryString=true, query={q:'hello world'}, URL.format re-encodes space as %20
    // With parseQueryString=false, search='?q=hello+world' used directly preserving +
    const result = parse("http://www.example.com/path?q=hello+world");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path?q=hello+world");
  });
});