import { extract } from '../../crawler-url-parser.js';

describe('extract function', () => {
  it('should append text to existing URL in urlMap', () => {
    const data = '<a href="https://www.example.com">Link 1</a><a href="https://www.example.com">Link 2</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toContain('Link 1');
    expect(result[0].text).toContain('Link 2');
    expect(result[0].text).not.toBe('Link 1');
  });
});