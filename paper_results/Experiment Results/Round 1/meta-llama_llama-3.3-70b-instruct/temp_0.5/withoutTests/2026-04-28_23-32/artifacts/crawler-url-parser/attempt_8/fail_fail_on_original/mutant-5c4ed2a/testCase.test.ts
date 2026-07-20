import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs with fragment identifiers', () => {
    const url = 'http://example.com/path';
    const baseUrl = 'http://example.com#abcdef';
    const resultOriginal = parse(url, baseUrl);
    expect(resultOriginal).not.toBeNull();
    expect(resultOriginal.baseurl).toBeNull();
    const resultMutated = parse(url, 'http://example.com#abcdef');
    expect(resultMutated).not.toBeNull();
    expect(resultMutated.baseurl).toBe('http://example.com#bcdef');
  });
});