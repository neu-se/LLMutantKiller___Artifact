import { extract } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle null text', () => {
    const data = '<a href="https://www.example.com">null text</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result[0].text).not.toBeNull();
  });
});