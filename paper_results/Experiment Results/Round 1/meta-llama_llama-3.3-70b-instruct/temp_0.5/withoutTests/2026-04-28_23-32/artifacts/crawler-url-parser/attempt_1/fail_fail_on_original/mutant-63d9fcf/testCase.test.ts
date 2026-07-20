import { extract } from '../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should extract links correctly', () => {
    const data = '<a href="https://www.example.com/link1">Link 1</a><a href="https://www.example.com/link1">Link 1 Again</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(1);
    expect(result[0].text).toBe('Link 1 Link 1 Again');
  });
});