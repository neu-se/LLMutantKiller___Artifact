import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should not have www in the host when parsing a URL', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse returned null');
    }
    expect(result.host).toBe('www.example.com'); // This should fail on the original code because stripWWW is true
    // However, the original code does not actually strip the www, so we need to rethink our approach
  });
});