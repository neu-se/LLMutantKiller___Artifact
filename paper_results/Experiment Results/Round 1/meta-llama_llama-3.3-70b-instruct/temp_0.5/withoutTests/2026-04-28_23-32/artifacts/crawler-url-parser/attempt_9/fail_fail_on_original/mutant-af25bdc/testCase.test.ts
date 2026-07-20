import { parse } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should throw an error when executed with an invalid URL', () => {
    expect(() => parse('invalid url')).toThrowError();
  });
});