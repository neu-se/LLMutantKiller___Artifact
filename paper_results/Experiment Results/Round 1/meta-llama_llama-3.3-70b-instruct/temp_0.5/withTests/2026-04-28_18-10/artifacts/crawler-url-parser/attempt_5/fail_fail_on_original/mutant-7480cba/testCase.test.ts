import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct URL when the input is a string without a protocol and starts with a single character followed by a colon', () => {
    const input = 'a:example.com';
    const expectedOutput = 'http://a:example.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});