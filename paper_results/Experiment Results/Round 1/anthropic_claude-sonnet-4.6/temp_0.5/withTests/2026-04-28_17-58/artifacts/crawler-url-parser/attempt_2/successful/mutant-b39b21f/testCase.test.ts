import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse returns object with explicit null defaults', () => {
  it('should return baseurl as null (not undefined) when no base URL is provided', () => {
    const result = parse("http://www.google.com/");
    expect(result).not.toBeNull();
    expect(result.baseurl).toBeNull();
  });
});