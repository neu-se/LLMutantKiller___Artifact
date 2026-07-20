import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('should handle URL resolution with fragment in base URL', () => {
    const result = parse('page.html', 'http://example.com/dir/#anchor');
    expect(result).not.toBeNull();
    expect(result!.url).toBe('http://example.com/dir/page.html');
  });
});