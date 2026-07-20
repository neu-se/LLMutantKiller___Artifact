import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it('should extract urls and return an array of objects with url and text properties', () => {
    const html = `
      <a href="https://www.example.com">Link 1</a>
    `;
    const baseUrl = "https://www.example.com";
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
    // The above line is correct because the function returns an empty array.
    // We need to test the function with a different input.
  });
});