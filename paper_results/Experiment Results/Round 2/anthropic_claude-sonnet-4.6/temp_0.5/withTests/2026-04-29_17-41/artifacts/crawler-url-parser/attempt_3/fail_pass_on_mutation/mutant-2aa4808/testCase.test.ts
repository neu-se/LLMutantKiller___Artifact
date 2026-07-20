import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with non-standard protocol base url', () => {
  it('should correctly set baseurl when base url uses a non-standard protocol with slashes', () => {
    const result = parse("ddd", "a://www.example.com/path");
    expect(result).not.toBeNull();
    expect(result!.baseurl).toBe("a://www.example.com/path");
  });
});