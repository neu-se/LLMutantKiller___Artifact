import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse', () => {
  it('should correctly handle valueless query parameter in relative URL resolved against base', () => {
    // With parseQueryString=true, ?foo gets parsed to {foo:''} then formatted as ?foo=
    // With parseQueryString=false, ?foo stays as search string ?foo
    const result = parse('?foo', 'http://example.com/page');
    expect(result).not.toBeNull();
    // In original (true): query object {foo:''} -> formatted as ?foo= -> querycount=1
    // In mutated (false): search string ?foo -> formatted as ?foo -> querycount=1  
    // The URL itself should differ
    expect(result!.url).toBe('http://example.com/?foo');
  });
});