import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse localhost:// mutation detection', () => {
  it('should return null for localhost:// as it has invalid protocol', () => {
    const res = parse("localhost://example.com");
    expect(res).toBeNull();
  });
});