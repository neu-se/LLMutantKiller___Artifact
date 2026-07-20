import { extract } from '../../crawler-url-parser.js';

describe('extract function', () => {
  it('should correctly extract links from HTML', () => {
    const html = '<html><body><a href="https://www.example.com">Example</a></body></html>';
    const expected = [
      {
        url: 'https://www.example.com',
        text: 'Example',
        type: 'external'
      }
    ];
    const result = extract(html, 'https://www.example.com');
    expect(result).toEqual(expected);
  });
});