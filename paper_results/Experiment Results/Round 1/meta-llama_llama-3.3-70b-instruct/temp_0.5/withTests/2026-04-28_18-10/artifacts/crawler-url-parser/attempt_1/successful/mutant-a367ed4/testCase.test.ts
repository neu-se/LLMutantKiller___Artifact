import { extract } from "../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js";

describe('extract function', () => {
  it.skip('should extract urls correctly', () => {
    const html = '<a href="http://www.stackoverflow.com">test-link-1</a><br /><a href="http://www.stackoverflow.com/aaa">test-link-2</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(2);
    expect(result[0].url).toBe('http://www.stackoverflow.com');
    expect(result[1].url).toBe('http://www.stackoverflow.com/aaa');
  });

  it('should not extract urls with undefined or empty href', () => {
    const html = '<a>test-link-1</a><br /><a href="">test-link-2</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(0);
  });

  it.skip('should not extract urls with length less than 3', () => {
    const html = '<a href="ab">test-link-1</a><br /><a href="http://www.stackoverflow.com">test-link-2</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com');
  });

  it.skip('should not extract urls with javascript or mailto protocol', () => {
    const html = '<a href="javascript:void(0)">test-link-1</a><br /><a href="mailto:test@example.com">test-link-2</a><br /><a href="http://www.stackoverflow.com">test-link-3</a>';
    const baseUrl = 'http://www.stackoverflow.com';
    const result = extract(html, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('http://www.stackoverflow.com');
  });
});