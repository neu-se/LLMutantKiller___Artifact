import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should normalize the protocol to http or https', () => {
    const url = 'http://example.com/path';
    const result = parse(url);
    expect(result.protocol).toBe('http:');
  });
});