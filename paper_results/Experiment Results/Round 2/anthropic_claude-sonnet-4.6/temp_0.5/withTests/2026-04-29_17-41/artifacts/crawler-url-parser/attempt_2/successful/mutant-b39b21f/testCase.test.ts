import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse result baseurl property default value', () => {
  it('should return null for baseurl when parsing an absolute URL without a base URL', () => {
    const result = parse("http://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result.baseurl).toBeNull();
  });
});