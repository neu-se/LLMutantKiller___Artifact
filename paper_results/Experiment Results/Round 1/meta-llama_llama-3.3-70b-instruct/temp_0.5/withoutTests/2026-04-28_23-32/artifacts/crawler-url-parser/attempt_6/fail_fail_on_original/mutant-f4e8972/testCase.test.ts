import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should correctly parse HTML data', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const result1 = extract(html, 'https://www.example.com');
    const result2 = extract({}, 'https://www.example.com');
    expect(result1).not.toHaveLength(0);
    expect(result2).toHaveLength(0);
  });
});