import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('extract function', () => {
  it('should not extract links with href starting with "javascript"', () => {
    const data = '<a href="javascript:void(0)">Link 1</a><a href="https://www.example.com">Link 2</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result[0].url).not.toBe('javascript:void(0)');
  });
});