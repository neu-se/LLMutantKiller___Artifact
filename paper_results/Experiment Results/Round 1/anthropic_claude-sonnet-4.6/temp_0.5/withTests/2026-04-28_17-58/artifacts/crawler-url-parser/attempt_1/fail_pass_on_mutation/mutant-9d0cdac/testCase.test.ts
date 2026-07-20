import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse with base url and protocol url', () => {
  it('should correctly parse an absolute http URL when a base URL is provided, without prepending extra http://', () => {
    const result = parse("http://www.google.com", "http://www.facebook.com");
    expect(result).not.toBeNull();
    expect(result.url).toBe("http://www.google.com/");
  });
});