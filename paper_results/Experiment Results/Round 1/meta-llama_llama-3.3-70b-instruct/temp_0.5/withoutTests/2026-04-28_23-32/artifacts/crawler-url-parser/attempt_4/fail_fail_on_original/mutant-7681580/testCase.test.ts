import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should correctly handle relative URLs', () => {
    const originalUrl = '';
    const parsedUrl = parse(originalUrl);
    expect(parsedUrl).toBeNull();
  });
});