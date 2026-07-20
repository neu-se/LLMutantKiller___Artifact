import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse mutation detection - slashesDenoteHost', () => {
  it('should correctly parse when baseUrl has query string and currentUrl is relative with query', () => {
    const result = parse("./page?new=query", "http://example.com/dir/file?old=query");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/dir/page?new=query");
    expect(result!.search).toBe("?new=query");
  });
});