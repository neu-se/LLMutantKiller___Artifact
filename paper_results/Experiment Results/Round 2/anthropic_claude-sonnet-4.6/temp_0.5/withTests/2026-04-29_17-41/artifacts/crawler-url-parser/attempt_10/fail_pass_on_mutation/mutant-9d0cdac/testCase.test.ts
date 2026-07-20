import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('mutation detection via host field', () => {
  it('should parse http URL with baseUrl and return correct host not mangled host', () => {
    const result = parse("http://www.google.com", "http://www.facebook.com");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("www.google.com");
    expect(result!.domain).toBe("google.com");
  });
});