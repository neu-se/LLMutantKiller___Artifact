import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL protocol handling', () => {
  it('should parse https URL and return correct host without mangling the URL', () => {
    const res = parse("https://www.example.com/path");
    expect(res).not.toBeNull();
    expect((res as any).host).toBe("www.example.com");
  });
});