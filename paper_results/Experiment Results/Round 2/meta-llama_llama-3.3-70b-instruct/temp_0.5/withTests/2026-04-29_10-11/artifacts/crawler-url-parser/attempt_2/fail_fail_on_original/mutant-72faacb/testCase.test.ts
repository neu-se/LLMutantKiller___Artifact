import { extract } from '../../../crawler-url-parser.js';

describe('extract function test', () => {
  it('should pass when href is an empty string', () => {
    const htmlString = '<a href="">Example</a>';
    const baseUrl = 'https://www.example.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(0);
  });
});