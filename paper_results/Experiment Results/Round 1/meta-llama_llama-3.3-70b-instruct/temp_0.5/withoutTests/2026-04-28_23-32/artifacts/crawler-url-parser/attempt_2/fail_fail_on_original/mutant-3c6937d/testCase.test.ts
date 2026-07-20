import { extract } from '../crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const html = '<a href="ab">Link</a>';
    const result = extract(html, 'https://example.com');
    expect(result).toEqual([
      {
        url: 'https://example.com/ab',
        text: 'Link',
        type: 'internal',
      },
    ]);
  });
});