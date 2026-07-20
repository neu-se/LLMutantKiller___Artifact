import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse relative URL without query string', () => {
  it('should not add trailing question mark when resolving relative URL with no query', () => {
    const result = parse("ddd", "http://www.example.com/aaa/bbb/");
    expect(result).not.toBeNull();
    // Original (true): query={} in resolve -> search='' -> format might add '?'
    // Mutant (false): query=null in resolve -> search=null -> no '?'
    expect(result!.url).toBe("http://www.example.com/aaa/bbb/ddd");
  });
});