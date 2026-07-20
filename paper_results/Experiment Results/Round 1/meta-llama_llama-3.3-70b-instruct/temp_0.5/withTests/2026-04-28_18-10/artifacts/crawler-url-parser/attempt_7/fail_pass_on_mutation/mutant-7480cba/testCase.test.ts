import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return null when the input is a string without a protocol and starts with a word followed by a colon that is not "http:" or "https:"', () => {
    const input = 'ftp:example.com';
    const result = parse(input);
    expect(result).toBeNull();
  });
});