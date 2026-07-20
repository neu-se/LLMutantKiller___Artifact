import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse subdomain behavior for www URLs', () => {
  it('should return www as subdomain for http://www.google.com (stripWWW true means www is treated as subdomain)', () => {
    const res = parse("http://www.google.com");
    // With stripWWW: true in result_normalize_options, www subdomain behavior is configured
    // The parse result should reflect the host correctly
    expect(res).not.toBeNull();
    expect(res.host).toBe("www.google.com");
    expect(res.subdomain).toBe("www");
    expect(res.domain).toBe("google.com");
    expect(res.url).toBe("http://www.google.com/");
  });
});