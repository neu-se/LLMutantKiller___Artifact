import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input is a string without protocol and with a word character at the start, but the mutated code should return a different result', () => {
    const input = 'a';
    const expectedOutput = 'http://a/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});