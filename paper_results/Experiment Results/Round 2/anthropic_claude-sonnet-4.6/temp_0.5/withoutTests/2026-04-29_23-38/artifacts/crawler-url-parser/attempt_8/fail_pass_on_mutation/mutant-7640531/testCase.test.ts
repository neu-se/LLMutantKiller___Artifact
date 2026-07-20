import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should correctly strip fragment before URL parsing', () => {
    const result = parse('http://example.com/path#section');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/path');
    expect(result!.path).toBe('/path');
    expect(result!.protocol).toBe('http:');
    expect(result!.host).toBe('example.com');
    expect(result!.domain).toBe('example.com');
    expect(result!.search).toBeNull();
    expect(result!.querycount).toBe(0);
  });
});