import { extract } from '../../../crawler-url-parser';

describe('extract function test', () => {
  it('should pass when href is a string', () => {
    const htmlString = '<a href="https://www.example.com">Example</a>';
    const baseUrl = 'https://www.example.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
  });
});