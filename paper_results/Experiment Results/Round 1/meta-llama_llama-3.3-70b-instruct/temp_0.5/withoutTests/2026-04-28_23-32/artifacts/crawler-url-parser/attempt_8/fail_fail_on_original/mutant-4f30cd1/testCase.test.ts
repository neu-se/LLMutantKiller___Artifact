import { extract } from './crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should correctly handle hrefs that are short and start with javascript', () => {
    const data = '<a href="javascript">test</a>';
    const sourceUrl = 'http://example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});