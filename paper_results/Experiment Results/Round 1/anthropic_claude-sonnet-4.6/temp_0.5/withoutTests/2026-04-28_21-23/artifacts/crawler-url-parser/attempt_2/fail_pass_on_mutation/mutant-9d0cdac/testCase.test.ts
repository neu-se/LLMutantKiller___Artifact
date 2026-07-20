import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function', () => {
  it('should correctly parse https URL when baseUrl is provided without corrupting the protocol', () => {
    const result = parse('https://example.com/page', 'http://base.com/');
    expect(result).not.toBeNull();
    expect(result!.protocol).toBe('https:');
    expect(result!.host).toBe('example.com');
    expect(result!.url).toContain('https://example.com');
  });
});