import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle URLs starting with a non-protocol string', () => {
    const url = 'example.com';
    const originalResult = parse('http://' + url);
    const mutatedResult = parse('http://' + url);
    expect(originalResult).not.toBeNull();
    expect(mutatedResult).not.toBeNull();
    const originalUrl = 'example.com';
    const mutatedUrl = 'example.com';
    expect(parse(originalUrl)).not.toBeNull();
    expect(parse(mutatedUrl)).toBeNull();
  });
});