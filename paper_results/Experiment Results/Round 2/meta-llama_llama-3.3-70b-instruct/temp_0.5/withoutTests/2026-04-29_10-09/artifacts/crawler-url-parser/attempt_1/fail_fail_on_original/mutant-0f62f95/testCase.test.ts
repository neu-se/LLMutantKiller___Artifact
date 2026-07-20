import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return null when the input URL is undefined', () => {
    expect(parse(undefined, 'http://www.example.com')).toBeNull();
  });
});