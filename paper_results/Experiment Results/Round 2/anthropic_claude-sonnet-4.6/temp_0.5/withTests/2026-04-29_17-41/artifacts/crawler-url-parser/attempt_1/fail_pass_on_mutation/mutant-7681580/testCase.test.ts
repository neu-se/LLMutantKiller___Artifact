import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without protocol and without base URL', () => {
  it('should correctly prepend http:// only at the start for a plain hostname URL', () => {
    const result = parse("www.google.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.google.com/");
    expect(result!.host).toBe("www.google.com");
    expect(result!.protocol).toBe("http:");
  });
});