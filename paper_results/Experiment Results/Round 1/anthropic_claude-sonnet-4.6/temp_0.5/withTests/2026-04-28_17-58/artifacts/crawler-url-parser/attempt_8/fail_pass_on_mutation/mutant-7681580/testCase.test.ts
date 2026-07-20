import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse bare http:// URL', () => {
  it('should not return null for http://', () => {
    const result = parse("http://");
    expect(result).not.toBeNull();
  });
});