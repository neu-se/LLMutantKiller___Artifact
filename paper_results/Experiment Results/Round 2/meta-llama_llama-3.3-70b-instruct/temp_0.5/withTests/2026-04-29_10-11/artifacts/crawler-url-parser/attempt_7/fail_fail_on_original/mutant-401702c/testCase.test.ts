import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input is a string without protocol and with a non-alphanumeric character at the start', () => {
    const input = '@example.com';
    const expectedOutput = null;
    const result = parse(input);
    expect(result).toBe(expectedOutput);
  });
});