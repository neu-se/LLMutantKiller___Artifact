import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should not produce corrupted URL for http input', () => {
    const result = parse('http://example.com');
    expect(result).not.toBeNull();
    expect(result!.url).not.toMatch(/httphttp/);
  });
});