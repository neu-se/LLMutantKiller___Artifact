import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input is a string without protocol and with a plus sign at the start', () => {
    const input = '+example.com';
    const expectedOutput = 'http://+example.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});