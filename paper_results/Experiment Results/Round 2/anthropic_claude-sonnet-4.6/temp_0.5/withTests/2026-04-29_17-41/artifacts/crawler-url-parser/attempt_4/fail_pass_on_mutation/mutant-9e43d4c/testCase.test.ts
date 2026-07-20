import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse slashesDenoteHost mutation', () => {
  it('should correctly identify host when resolving relative URL against protocol-less base with double-slash pathname', () => {
    // baseUrlStr = "//host.com/x/" has // replaced with http://
    // but what about a base with no protocol that has // in pathname?
    const result = parse('//www.example.com/path', 'http://base.com/');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('www.example.com');
  });
});