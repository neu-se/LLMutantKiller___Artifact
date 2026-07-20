import { gettype } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('gettype', () => {
  it('should throw when given a localhost:// scheme URL as a string argument', () => {
    expect(() => gettype('localhost://example.com', 'http://www.example.com')).toThrow();
  });
});