import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with baseUrl fragment stripping', () => {
  it('should correctly strip fragment from baseUrl and resolve relative path', () => {
    // baseUrl with fragment - fragment must be fully stripped for correct resolution
    const result = parse("/newpath", "http://www.example.com/aaa/bbb#section");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/newpath");
  });
});