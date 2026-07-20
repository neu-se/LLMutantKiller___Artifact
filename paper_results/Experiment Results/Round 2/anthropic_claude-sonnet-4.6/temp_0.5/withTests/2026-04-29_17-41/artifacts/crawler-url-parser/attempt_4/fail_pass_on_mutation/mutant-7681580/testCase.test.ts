import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse short http URL', () => {
  it('should parse http://a with correct host', () => {
    const result = parse("http://a");
    expect(result).not.toBeNull();
    expect(result!.host).toBe("a");
  });
});