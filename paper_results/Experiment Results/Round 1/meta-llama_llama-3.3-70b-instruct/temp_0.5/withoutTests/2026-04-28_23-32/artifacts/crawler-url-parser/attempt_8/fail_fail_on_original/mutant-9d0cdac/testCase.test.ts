import { parse } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse function', () => {
  it('should correctly handle URLs without protocols', () => {
    const url = "example.com";
    const resultOriginal = parse(url);
    expect(resultOriginal).toBeNull();
    const url2 = "http://example.com";
    const resultMutated = parse(url2);
    expect(resultMutated).not.toBeNull();
    expect(resultMutated.url).toBe('http://example.com');
  });
});