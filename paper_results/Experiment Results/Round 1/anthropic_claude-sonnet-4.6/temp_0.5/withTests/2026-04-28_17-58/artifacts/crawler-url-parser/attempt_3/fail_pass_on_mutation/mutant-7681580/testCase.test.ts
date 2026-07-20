import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse http URL without base URL', () => {
  it('should return a valid parsed result for a full http URL', () => {
    const res = parse("http://www.google.com");
    expect(res).not.toBeNull();
    expect((res as any).url).toBe("http://www.google.com/");
  });
});