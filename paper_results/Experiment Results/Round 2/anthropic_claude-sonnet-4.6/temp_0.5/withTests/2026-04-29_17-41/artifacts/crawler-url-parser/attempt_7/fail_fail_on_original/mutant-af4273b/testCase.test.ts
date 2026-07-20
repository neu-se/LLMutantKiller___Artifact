import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse relative url with base url having equals sign in query value', () => {
  it('should encode equals sign in query value when resolving relative url', () => {
    const result = parse("ddd", "http://www.stackoverflow.com/aaa/bbb?q=a=b");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.stackoverflow.com/aaa/ddd?q=a%3Db");
  });
});