import { extract } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle URLs correctly', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example2.com"></a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.example.com');
    expect(result[0].text).toBe('Example');
  });
});