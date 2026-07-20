import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should not throw an error when called', () => {
    expect(() => {
      parse('https://www.npmjs.com/package/electron-window-manager');
    }).not.toThrowError();
  });
});