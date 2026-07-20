import { extract } from '../../../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle short hrefs correctly', () => {
    const data = '<a href="ab">text</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result).toEqual([
      {
        url: 'http://example.com/ab',
        text: 'text',
        type: 'internal',
      },
    ]);
  });
});