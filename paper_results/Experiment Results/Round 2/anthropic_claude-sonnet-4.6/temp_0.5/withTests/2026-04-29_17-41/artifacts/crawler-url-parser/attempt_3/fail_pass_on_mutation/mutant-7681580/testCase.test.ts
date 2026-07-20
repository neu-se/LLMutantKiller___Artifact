import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse http URL without base URL', () => {
  it('should correctly parse http://www.google.com without corrupting the URL', () => {
    const result = parse("http://www.google.com");
    expect(result).not.toBeNull();
    expect(result!.url).toBe("http://www.google.com/");
    expect(result!.protocol).toBe("http:");
    expect(result!.host).toBe("www.google.com");
  });
});