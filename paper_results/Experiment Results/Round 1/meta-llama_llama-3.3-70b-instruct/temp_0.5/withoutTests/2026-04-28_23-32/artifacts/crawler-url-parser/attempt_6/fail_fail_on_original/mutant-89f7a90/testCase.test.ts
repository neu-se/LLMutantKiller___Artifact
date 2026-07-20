import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct url object', () => {
    const currentUrlStr = 'https://www.npmjs.com/package/electron-window-manager';
    const baseUrlStr = 'https://www.npmjs.com/package/electron-window-manager';
    const result = parse(currentUrlStr, baseUrlStr);
    if (result && result.baseurl) {
      expect(result.baseurl).not.toContain('Stryker was here!');
    } else {
      throw new Error('Expected result and result.baseurl to be defined');
    }
  });
});