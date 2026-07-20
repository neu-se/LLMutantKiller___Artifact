import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse HTML data and extract URLs', () => {
    const data = '<html><body><base href="https://www.example.com"><a href="https://www.example.com">Example</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});