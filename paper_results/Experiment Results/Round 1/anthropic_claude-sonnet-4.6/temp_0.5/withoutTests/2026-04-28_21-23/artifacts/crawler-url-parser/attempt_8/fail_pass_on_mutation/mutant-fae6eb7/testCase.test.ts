import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('baseurl field should not contain fragment', () => {
    const result = parse('relative', 'http://example.com/page#frag');
    expect(result).not.toBeNull();
    expect(result!.baseurl).not.toContain('#');
  });
});