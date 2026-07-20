import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com/test">Test</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe('https://www.example.com');
    expect(result[0].text).toBe('Example');
    expect(result[1].url).toBe('https://www.example.com/test');
    expect(result[1].text).toBe('Test');
  });
});