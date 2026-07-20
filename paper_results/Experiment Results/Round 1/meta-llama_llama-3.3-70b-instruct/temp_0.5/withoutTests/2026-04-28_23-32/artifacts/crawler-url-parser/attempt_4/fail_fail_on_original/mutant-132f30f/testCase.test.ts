import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should not have www in the host', () => {
    const url = 'http://www.example.com';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse returned null');
    }
    expect(result.host).not.toContain('www');
  });
});