import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL starting with //', () => {
  it('should parse //example.com/path correctly', () => {
    const result = parse("//example.com/path");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://example.com/path");
    expect(result!.path).toBe("/path");
  });
});