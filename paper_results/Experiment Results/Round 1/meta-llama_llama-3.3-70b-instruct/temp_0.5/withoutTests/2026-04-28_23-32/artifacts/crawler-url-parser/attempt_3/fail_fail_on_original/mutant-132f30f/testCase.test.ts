import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should strip WWW from the domain', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse returned null');
    }
    expect(result.host).not.toBe('www.example.com');
  });
});