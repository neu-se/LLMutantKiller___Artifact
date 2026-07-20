import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('slashesDenoteHost mutation test', () => {
  it('should correctly identify host when currentUrlStr has slashes after resolution', () => {
    // After URL.resolve and URL.format, if the result is protocol-relative
    // slashesDenoteHost=true vs false matters
    const result = parse('/path?q=1', 'http://www.example.com/base/');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('www.example.com');
    expect(result!.querycount).toBe(1);
  });
});