import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should return the correct url when the input url is "www:stackoverflow.com"', () => {
    const result = parse("www:stackoverflow.com");
    expect(result).toBeNull();
  });
});