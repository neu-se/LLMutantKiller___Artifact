import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should normalize URL by removing WWW from the domain', () => {
    const url = 'http://www.example.com/path';
    const result = parse(url);
    expect(result.host).toBe('example.com');
  });
});