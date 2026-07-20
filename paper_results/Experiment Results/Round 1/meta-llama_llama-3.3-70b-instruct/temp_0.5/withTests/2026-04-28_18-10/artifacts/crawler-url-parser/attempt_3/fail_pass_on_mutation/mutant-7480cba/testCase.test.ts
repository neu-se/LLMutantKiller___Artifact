import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct URL when the input is a string without a protocol and starts with "w:"', () => {
    const input = 'w:example.com';
    const expectedOutput = null;
    const result = parse(input);
    expect(result).toBeNull();
  });
});