import { extract } from './crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should correctly handle hrefs that are short and start with javascript', () => {
    const data = '<a href="javascript:alert(1)">test</a><a href="http://example.com">example</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com');
  });
});