import { extract } from "../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('crawler-url-parser', () => {
  it('should handle URLs correctly', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com">Example 2</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example.com');
    if (result[0].text !== 'Example Example 2') {
      throw new Error('Text does not match');
    }
  });
});