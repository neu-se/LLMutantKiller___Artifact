import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle triple-slash base URL', () => {
    const result = parse('page', '///example.com/dir/');
    expect(result).not.toBeNull();
    expect(result?.host).toBe('example.com');
  });
});