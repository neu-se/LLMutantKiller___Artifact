import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should resolve relative URL using base URL that requires slashesDenoteHost', () => {
    // baseUrlStr without // prefix won't get http:// prepended
    // With slashesDenoteHost=true, 'example.com/base/' gets host='example.com'
    // With slashesDenoteHost=false, it gets no host
    const result = parse('/page', 'example.com/base/');
    expect(result).not.toBeNull();
    expect(result?.host).toBe('example.com');
  });
});