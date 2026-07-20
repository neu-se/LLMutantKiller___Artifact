import { parse } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should handle URLs with protocols correctly', () => {
    const url = 'ftp://example.com';
    const result = parse(url);
    expect(result).toBeNull();
  });
});