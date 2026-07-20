import { extract } from '../../../crawler-url-parser.js';

describe('extract function', () => {
  it('should filter out links with href starting with "javascript" or "mailto"', () => {
    const data = '<a href="javascript:void(0)">Link 1</a><a href="mailto:user@example.com">Link 2</a><a href="https://www.example.com">Link 3</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result).toHaveLength(1);
    expect(result[0].url).toBe('https://www.example.com');
  });
});