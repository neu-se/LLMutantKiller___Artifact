import { parse } from '../../../../../../../../../../../subject_repositories/crawler-url-parser/crawler-url-parser.js';

describe('crawler-url-parser', () => {
  it('should handle parsing of URLs correctly and return results without exiting', () => {
    const originalProcessExit = process.exit;
    process.exit = jest.fn(() => {
      throw new Error('Process exit called');
    });
    const url = "https://www.npmjs.com/package/electron-window-manager";
    expect(() => {
      parse(url);
    }).not.toThrowError();
    process.exit = originalProcessExit;
  });
});