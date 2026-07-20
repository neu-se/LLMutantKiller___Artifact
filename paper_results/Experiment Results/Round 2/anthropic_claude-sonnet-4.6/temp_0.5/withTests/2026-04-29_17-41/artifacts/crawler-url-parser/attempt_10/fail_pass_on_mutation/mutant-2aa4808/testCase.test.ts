import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base url slashes behavior', () => {
  it('should correctly parse relative url with base url that has no trailing slash', () => {
    const result = parse("../sibling", "http://www.example.com/parent/child");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.example.com/sibling");
    expect(result!.baseurl).toBe("http://www.example.com/parent/child");
    expect(result!.path).toBe("/sibling");
    expect(result!.host).toBe("www.example.com");
  });
});