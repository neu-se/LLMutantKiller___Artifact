import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function test', () => {
  it('should pass when href is not undefined', () => {
    const htmlString = '<a href="https://www.example.com">Example</a>';
    const baseUrl = 'https://www.example.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
  });
});