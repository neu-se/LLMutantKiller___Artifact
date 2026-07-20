import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle relative URLs', () => {
    const originalUrl = 'http://example.com';
    const mutatedUrl = 'example.comhttp://example.com';
    const parsedUrl = parse(mutatedUrl);
    expect(parsedUrl).toBeNull();
  });
});