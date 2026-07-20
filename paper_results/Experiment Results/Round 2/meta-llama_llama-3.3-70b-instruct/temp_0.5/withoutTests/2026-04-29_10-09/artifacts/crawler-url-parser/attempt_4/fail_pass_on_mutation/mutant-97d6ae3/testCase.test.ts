import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should correctly handle currentUrl and currentUrl.url', () => {
    const data = '<a href="">Example</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});