import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should strip WWW from the domain', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    expect(result.host).toBe('example.com');
  });
});