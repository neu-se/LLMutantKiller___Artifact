import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should return the correct url object', () => {
    const currentUrlStr = 'https://www.npmjs.com/package/electron-window-manager';
    const baseUrlStr = 'https://www.npmjs.com/package/electron-window-manager#anchor';
    const result = parse(currentUrlStr, baseUrlStr);
    if (result) {
      expect(result.baseurl).not.toBeNull();
      expect(result.baseurl).not.toContain('Stryker was here!');
      expect(result.baseurl).not.toContain('#');
    } else {
      throw new Error('Expected result to be defined');
    }
  });
});