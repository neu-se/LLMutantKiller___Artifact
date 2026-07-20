import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('utm stripping', () => {
  it('utm_source should be stripped', () => {
    const result = parse('http://example.com/?utm_source=google');
    expect(result!.search).toBeNull();
  });
});