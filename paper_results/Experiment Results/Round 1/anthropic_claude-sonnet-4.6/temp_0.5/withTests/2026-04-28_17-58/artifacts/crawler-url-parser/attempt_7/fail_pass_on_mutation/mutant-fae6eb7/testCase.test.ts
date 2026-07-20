import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse hash mutation final attempt', () => {
  it('should correctly strip hash from baseUrl', () => {
    // Use a baseUrl where the hash fragment contains a slash
    // to ensure URL.resolve doesn't get confused
    const result = parse("page", "http://www.example.com/aaa/bbb#/other/path");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/aaa/page");
  });
});