import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js"

describe('parse function with baseUrl containing fragment', () => {
  it('should strip fragment from baseUrl when resolving relative URLs', () => {
    const result = parse('relative-page.html', 'http://example.com/path/#section');
    expect(result).not.toBeNull();
    expect(result!.url).not.toContain('Stryker was here!');
    expect(result!.url).not.toContain('#section');
    expect(result!.url).toContain('example.com');
  });
});