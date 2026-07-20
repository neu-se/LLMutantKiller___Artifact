import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse slashesDenoteHost', () => {
  it('should correctly parse host when resolving relative URL against protocol-relative base', () => {
    const result = parse('path', '//host.com/base/');
    expect(result).not.toBeNull();
    expect(result!.host).toBe('host.com');
    expect(result!.url).toBe('http://host.com/base/path');
  });
});