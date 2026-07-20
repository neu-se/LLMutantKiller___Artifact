import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse slashesDenoteHost', () => {
  it('should correctly parse host from protocol-relative URL', () => {
    const result = parse('//www.example.com/path');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('www.example.com');
  });
});