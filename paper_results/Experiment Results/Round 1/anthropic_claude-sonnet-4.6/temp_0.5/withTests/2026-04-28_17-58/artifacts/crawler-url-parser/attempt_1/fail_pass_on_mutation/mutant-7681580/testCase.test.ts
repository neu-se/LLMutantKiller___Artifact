import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse URL without protocol and no base URL', () => {
  it('should correctly prepend http:// only at the start for a plain domain URL', () => {
    const res = parse("www.google.com");
    expect(res).not.toBeNull();
    expect(res.url).toBe("http://www.google.com/");
  });
});