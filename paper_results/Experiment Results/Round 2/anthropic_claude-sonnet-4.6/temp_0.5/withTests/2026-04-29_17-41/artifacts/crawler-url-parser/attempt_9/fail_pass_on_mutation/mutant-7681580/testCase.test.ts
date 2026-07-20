import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse http URL search field', () => {
  it('should have null search for http://example.com', () => {
    const result = parse("http://example.com");
    expect(result).not.toBeNull();
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});