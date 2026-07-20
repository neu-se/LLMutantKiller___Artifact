import { extract } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser';

describe('crawler-url-parser', () => {
  it('should pass when run against the original code and fail when run against the mutated code', () => {
    const htmlString = '<html><body><a href="https://www.npmjs.com/package/electron-window-manager">test-link</a></body></html>';
    const baseUrl = 'https://www.npmjs.com/package/electron-window-manager';
    const result = extract(htmlString, baseUrl);
    expect(result.length).toBe(1);
    expect(result[0].url).toBe('https://www.npmjs.com/package/electron-window-manager');
    expect(result[0].type).toBe('samelevel');
  });
});