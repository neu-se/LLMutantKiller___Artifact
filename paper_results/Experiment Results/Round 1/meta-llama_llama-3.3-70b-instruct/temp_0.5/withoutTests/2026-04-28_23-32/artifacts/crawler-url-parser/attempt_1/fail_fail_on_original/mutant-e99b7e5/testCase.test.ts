import { extract } from '../../../crawler-url-parser.js';

describe('extract function', () => {
  it('should not modify the text of the extracted URLs', () => {
    const data = '<a href="https://www.example.com">Example</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result[0].text).toBe('Example');
  });
});