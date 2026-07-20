import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse slashesDenoteHost', () => {
  it('should correctly parse host from protocol-relative URL used as base', () => {
    const result = parse('path', '//www.example.com/base/page');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('www.example.com');
    expect(result!.url).toBe('http://www.example.com/base/path');
  });
});