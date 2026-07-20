import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input is a string with a non-word character at the start', () => {
    const input = '_example.com';
    const expectedOutput = null;
    const result = parse(input);
    expect(result).toBe(expectedOutput);
  });
});