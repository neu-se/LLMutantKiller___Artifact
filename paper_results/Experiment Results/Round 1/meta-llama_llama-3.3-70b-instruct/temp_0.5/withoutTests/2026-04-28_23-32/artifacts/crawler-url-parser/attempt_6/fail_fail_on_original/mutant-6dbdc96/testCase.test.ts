import { extract } from './crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a><a href="https://www.example.com/short">Short Link</a></body></html>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(html, sourceUrl);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe('https://www.example.com');
    expect(result[1].url).toBe('https://www.example.com/short');
  });
});