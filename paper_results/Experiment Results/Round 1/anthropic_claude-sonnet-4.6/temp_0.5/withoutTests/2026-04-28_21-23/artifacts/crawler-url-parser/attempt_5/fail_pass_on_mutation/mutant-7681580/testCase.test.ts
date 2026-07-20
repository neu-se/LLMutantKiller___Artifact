import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('url field should start with http:// for a plain domain', () => {
    const result = parse('example.com');
    expect(result).not.toBeNull();
    expect(result!.url).toMatch(/^http:\/\//);
  });
});