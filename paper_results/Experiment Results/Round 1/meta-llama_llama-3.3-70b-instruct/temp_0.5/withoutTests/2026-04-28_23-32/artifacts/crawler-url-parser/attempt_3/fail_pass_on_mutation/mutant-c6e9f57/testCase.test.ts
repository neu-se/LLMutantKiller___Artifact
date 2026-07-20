import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should remove www from the domain', () => {
    const url = 'http://www.example.com/path';
    const result = parse(url);
    expect(result.domain).toBe('example.com');
  });
});