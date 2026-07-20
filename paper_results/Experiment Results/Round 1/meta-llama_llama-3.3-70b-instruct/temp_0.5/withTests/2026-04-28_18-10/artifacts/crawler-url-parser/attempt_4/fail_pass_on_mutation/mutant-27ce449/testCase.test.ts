import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should return an empty array when the input HTML string is empty', () => {
    const htmlString = '';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(0);
  });
});