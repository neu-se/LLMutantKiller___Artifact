import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input is a string without protocol and with a word character at the start', () => {
    const input = 'a.example.com';
    const expectedOutput = 'http://a.example.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});