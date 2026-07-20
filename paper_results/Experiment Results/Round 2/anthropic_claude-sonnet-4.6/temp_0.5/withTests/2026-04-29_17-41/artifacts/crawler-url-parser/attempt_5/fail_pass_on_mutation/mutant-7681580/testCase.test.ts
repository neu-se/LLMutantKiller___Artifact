import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse // URL', () => {
  it('should parse // correctly', () => {
    const result = parse("//");
    expect(result).not.toBeNull();
  });
});