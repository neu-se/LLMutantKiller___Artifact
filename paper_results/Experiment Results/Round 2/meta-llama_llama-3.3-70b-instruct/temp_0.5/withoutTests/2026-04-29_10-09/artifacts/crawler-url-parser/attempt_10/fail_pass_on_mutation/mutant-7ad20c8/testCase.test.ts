import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('parse function', () => {
  it('should parse a URL correctly and not throw an error', () => {
    const originalProcessExit = process.exit;
    process.exit = jest.fn();
    expect(() => {
      parse('https://www.npmjs.com/package/electron-window-manager');
    }).not.toThrowError();
    expect(process.exit).not.toHaveBeenCalled();
    process.exit = originalProcessExit;
  });
});