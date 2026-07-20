import { extract } from './crawler-url-parser.js';

describe('extract function', () => {
  it('should not append the same text to the same URL', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com">Example</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Example');
  });
});