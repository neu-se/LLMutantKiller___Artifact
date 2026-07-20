import { extract } from './crawler-url-parser.js';

describe('extract function', () => {
  it('should append text to the same URL when the condition is met', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com">Example2</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).not.toBe('Example');
  });
});