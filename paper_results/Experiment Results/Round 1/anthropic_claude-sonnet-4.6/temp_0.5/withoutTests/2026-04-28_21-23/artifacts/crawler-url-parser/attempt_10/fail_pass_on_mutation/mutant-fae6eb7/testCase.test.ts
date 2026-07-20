import { parse } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('parse', () => {
  it('detects mutation via baseUrl with fragment and newline', () => {
    const baseUrl = 'http://example.com/path#frag\nmore';
    const result = parse('/page', baseUrl);
    // Both should return null due to \n being illegal
    expect(result).toBeNull();
  });
});