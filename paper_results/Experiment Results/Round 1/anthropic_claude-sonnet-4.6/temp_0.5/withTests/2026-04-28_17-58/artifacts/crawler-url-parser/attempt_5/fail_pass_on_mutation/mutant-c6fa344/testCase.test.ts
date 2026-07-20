import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should parse bare hostname correctly', () => {
    const res = parse("stackoverflow.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://stackoverflow.com/");
    expect(res.protocol).toBe("http:");
    expect(res.host).toBe("stackoverflow.com");
    expect(res.domain).toBe("stackoverflow.com");
    expect(res.subdomain).toBeNull();
  });
});