import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should pass on the original code and fail on the mutated code', () => {
    const url = 'https ://www.npmjs.com/package/electron-window-manager';
    const result = parse(url);
    if (result === null) {
      throw new Error('parse function returned null');
    }
    expect(result.url).toBe('https://www.npmjs.com/package/electron-window-manager');
  });
});