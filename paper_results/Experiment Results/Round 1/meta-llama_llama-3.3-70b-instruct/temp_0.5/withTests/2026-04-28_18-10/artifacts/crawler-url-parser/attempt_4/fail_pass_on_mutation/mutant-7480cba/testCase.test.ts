import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct URL when the input is a string without a protocol and starts with "w:" but not "http:" or "https:"', () => {
    const input = 'w@example.com';
    const expectedOutput = 'http://w@example.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});