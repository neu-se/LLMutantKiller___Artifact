import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse slashesDenoteHost', () => {
  it('should correctly identify host when currentUrlStr has double-slash prefix after resolution', () => {
    // When a relative path is resolved against a base that has no protocol,
    // the resolved URL may be formatted as //host/path
    // slashesDenoteHost=true correctly identifies host; false does not
    const result = parse('path', '//www.example.com/base/');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('www.example.com');
    expect(result!.domain).toBe('example.com');
  });
});