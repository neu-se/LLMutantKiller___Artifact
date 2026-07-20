import { extract } from './crawler-url-parser';

describe('extract function', () => {
  it('should append text to the same URL when text is different', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com">Different Text</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Example Different Text');
  });
});