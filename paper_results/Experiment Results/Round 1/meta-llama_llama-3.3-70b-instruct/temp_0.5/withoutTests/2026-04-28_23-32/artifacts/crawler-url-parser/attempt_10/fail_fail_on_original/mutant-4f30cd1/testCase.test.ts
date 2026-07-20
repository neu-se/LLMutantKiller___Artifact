import { extract } from './crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle hrefs that are short and start with javascript', () => {
    const data = '<a href="javascript:alert(1)">test</a><a href="http://example.com">example</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://example.com');
    const data2 = '<a href="ftp://example.com">example</a>';
    const result2 = extract(data2, sourceUrl);
    expect(result2.length).toBe(0);
    const data3 = '<a href="javascript">test</a>';
    const result3 = extract(data3, sourceUrl);
    expect(result3.length).toBe(0); 
    const data4 = '<a href="javascript:alert(1)">test</a><a href="http://example.com">example</a>';
    const result4 = extract(data4, sourceUrl);
    expect(result4.length).toBe(1);
    expect(result4[0].url).toBe('http://example.com');
  });
});