import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse www subdomain handling', () => {
  it('should preserve www subdomain in parsed URL and return www as subdomain', () => {
    const result = parse("http://www.google.com/path");
    expect(result).not.toBeNull();
    expect(result.subdomain).toBe("www");
    expect(result.url).toBe("http://www.google.com/path");
    expect(result.host).toBe("www.google.com");
  });
});