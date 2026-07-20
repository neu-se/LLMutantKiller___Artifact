import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should strip fragment with exactly two characters leaving clean URL', () => {
    const result = parse("http://www.example.com/path#ab");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/path");
  });
});