import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const data = '<a href="https://www.example.com">Example</a><a href="https://www.example.com">Example</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
  });
});