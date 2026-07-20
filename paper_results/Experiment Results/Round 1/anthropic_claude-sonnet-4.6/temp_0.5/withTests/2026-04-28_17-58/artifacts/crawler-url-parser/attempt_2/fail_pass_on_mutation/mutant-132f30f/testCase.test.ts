import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('stripWWW option behavior', () => {
  it('should treat www as a subdomain when stripWWW is true', () => {
    const result = parse("http://www.google.com/");
    expect(result).not.toBeNull();
    // With stripWWW: true, www is considered a default subdomain
    // The subdomain field should reflect www
    expect(result.subdomain).toBe("www");
    // domain should be google.com
    expect(result.domain).toBe("google.com");
  });
});