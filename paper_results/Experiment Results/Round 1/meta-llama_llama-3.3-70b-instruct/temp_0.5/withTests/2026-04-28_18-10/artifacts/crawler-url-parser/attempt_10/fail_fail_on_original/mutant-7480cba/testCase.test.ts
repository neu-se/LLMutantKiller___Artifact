import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct URL when the input is a string without a protocol and starts with a single character followed by a colon and then another character', () => {
    const input = 'a:xexample.com';
    const expectedOutput = 'http://a:xexample.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});