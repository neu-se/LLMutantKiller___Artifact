import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should correctly handle multiple links with the same URL and text', () => {
    const data = '<a href="https://www.example.com">Link 1</a><a href="https://www.example.com">Link 1</a>';
    const sourceUrl = 'https://www.example.com';
    const result = extract(data, sourceUrl);
    expect(result.length).toBe(0);
    // If the mutation is present, the above expectation will pass, 
    // but the following expectation should fail
    expect(result).toEqual([{ url: 'https://www.example.com', text: 'Link 1', type: 'internal' }]);
  });
});