import { extract } from '../../crawler-url-parser';

describe('extract function test', () => {
  it('should pass when href is 0', () => {
    const htmlString = '<a href="0">Example</a>';
    const baseUrl = 'https://www.example.com';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
  });
});