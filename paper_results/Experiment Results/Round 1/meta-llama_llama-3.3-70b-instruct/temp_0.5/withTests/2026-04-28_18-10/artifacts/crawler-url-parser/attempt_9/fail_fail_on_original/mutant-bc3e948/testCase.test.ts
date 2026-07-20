import { extract } from '../../crawler-url-parser';

describe('extract function test', () => {
  it('should pass when text is not null', () => {
    const htmlString = '<a href="http://www.stackoverflow.com">test-link</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    expect(result[0].text).toBe('test-link');
  });

  it('should fail when text is always empty string', () => {
    const htmlString = '<a href="http://www.stackoverflow.com"></a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(htmlString, baseUrl);
    expect(result[0].text).not.toBe('');
  });
});