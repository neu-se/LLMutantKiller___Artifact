import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle localhost URL without protocol', () => {
    const res = parse("localhost");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://localhost/");
    expect(res.protocol).toBe("http:");
    expect(res.host).toBe("localhost");
  });
});