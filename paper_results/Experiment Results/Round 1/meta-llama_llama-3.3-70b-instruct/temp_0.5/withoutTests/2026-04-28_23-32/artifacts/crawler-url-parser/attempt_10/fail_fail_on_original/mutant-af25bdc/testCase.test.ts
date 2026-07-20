import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should return null when input URL is undefined', () => {
    expect(parse(undefined)).toBeNull();
  });
});