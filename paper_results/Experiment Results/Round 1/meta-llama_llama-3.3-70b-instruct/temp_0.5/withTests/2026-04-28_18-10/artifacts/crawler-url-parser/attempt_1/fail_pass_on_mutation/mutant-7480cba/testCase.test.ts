import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct URL when the input is a string without a protocol', () => {
    const input = 'www.example.com';
    const expectedOutput = 'http://www.example.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });

  it('should return the correct URL when the input is a string with a protocol', () => {
    const input = 'http://www.example.com';
    const expectedOutput = 'http://www.example.com/';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });

  it('should return the correct URL when the input is a string with a protocol and a path', () => {
    const input = 'http://www.example.com/path';
    const expectedOutput = 'http://www.example.com/path';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });

  it('should return the correct URL when the input is a string with a protocol, a path, and a query', () => {
    const input = 'http://www.example.com/path?a=1&b=2';
    const expectedOutput = 'http://www.example.com/path?a=1&b=2';
    const result = parse(input);
    expect(result.url).toBe(expectedOutput);
  });
});