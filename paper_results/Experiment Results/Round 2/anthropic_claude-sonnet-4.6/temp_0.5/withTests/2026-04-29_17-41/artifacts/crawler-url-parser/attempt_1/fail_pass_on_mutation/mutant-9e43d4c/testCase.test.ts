import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse with slashesDenoteHost behavior', () => {
  it('should correctly parse query parameters from a resolved relative URL', () => {
    const result = parse('../ddd?q1=query1&q2=query2', 'http://www.stackoverflow.com/aaa/bbb/ccc/');
    expect(result).not.toBeNull();
    expect(result!.querycount).toBe(2);
    expect(result!.search).toBe('?q1=query1&q2=query2');
    expect(result!.host).toBe('www.stackoverflow.com');
  });
});